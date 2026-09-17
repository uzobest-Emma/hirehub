import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatuses = [
  "Pending",
  "Reviewing",
  "Shortlisted",
  "Rejected",
  "Hired",
];

export async function PATCH(
  request: Request,
  { params }: Context
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 }
      );
    }

    if (session.user.role !== "EMPLOYER") {
      return NextResponse.json(
        {
          success: false,
          message: "Only employers can update applications.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await request.json();
    const status = String(body.status || "").trim();

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application status.",
        },
        { status: 400 }
      );
    }

    const application = await db.application.findUnique({
      where: { id },
      select: {
        id: true,
        job: {
          select: {
            employerId: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found.",
        },
        { status: 404 }
      );
    }

    if (application.job.employerId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not allowed to update this application.",
        },
        { status: 403 }
      );
    }

    const updatedApplication =
      await db.application.update({
        where: { id },
        data: { status },
        select: {
          id: true,
          status: true,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Application status updated.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(
      "UPDATE APPLICATION STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update application status.",
      },
      { status: 500 }
    );
  }
}
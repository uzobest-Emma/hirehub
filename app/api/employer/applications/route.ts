import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "You must be logged in." },
        { status: 401 }
      );
    }

    if (session.user.role !== "EMPLOYER") {
      return NextResponse.json(
        {
          success: false,
          message: "Only employers can view applicants.",
        },
        { status: 403 }
      );
    }

    const applications = await db.application.findMany({
      where: {
        job: {
          employerId: session.user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        location: true,
        resumeUrl: true,
        coverLetter: true,
        status: true,
        createdAt: true,
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            location: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error("GET EMPLOYER APPLICATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load applicants.",
      },
      { status: 500 }
    );
  }
}
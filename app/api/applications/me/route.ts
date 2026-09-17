import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

export async function GET() {
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

    const applications = await db.application.findMany({
      where: {
        applicantId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        coverLetter: true,
        status: true,
        createdAt: true,
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            location: true,
            type: true,
            salary: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("GET MY APPLICATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load your applications.",
      },
      { status: 500 }
    );
  }
}
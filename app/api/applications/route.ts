import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to apply for a job.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      jobId,
      fullName,
      email,
      phone,
      location,
      resumeUrl,
      coverLetter,
    } = body;

    if (
      !jobId ||
      !fullName ||
      !email ||
      !phone ||
      !location ||
      !resumeUrl ||
      !coverLetter
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const job = await db.job.findUnique({
      where: {
        id: String(jobId),
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    const existingApplication =
      await db.application.findFirst({
        where: {
          applicantId: session.user.id,
          jobId: String(jobId),
        },
      });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this job.",
        },
        { status: 409 }
      );
    }

    const application = await db.application.create({
      data: {
        id: crypto.randomUUID(),
        applicantId: session.user.id,
        jobId: String(jobId),
        fullName: String(fullName).trim(),
        email: String(email).toLowerCase().trim(),
        phone: String(phone).trim(),
        location: String(location).trim(),
        resumeUrl: String(resumeUrl).trim(),
        coverLetter: String(coverLetter).trim(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
        application: {
          id: application.id,
          jobId: application.jobId,
          status: application.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit application.",
      },
      { status: 500 }
    );
  }
}
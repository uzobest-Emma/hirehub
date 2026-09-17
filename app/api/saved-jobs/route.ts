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
          message: "You must be logged in.",
        },
        { status: 401 }
      );
    }

    const { jobId } = await request.json();

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          message: "Job ID is required.",
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

    const existing = await db.saved_job.findFirst({
      where: {
        userId: session.user.id,
        jobId: String(jobId),
      },
    });

    if (existing) {
      await db.saved_job.delete({
        where: {
          id: existing.id,
        },
      });

      return NextResponse.json({
        success: true,
        saved: false,
        message: "Job removed from saved jobs.",
      });
    }

    const savedJob = await db.saved_job.create({
      data: {
        id: crypto.randomUUID(),
        userId: session.user.id,
        jobId: String(jobId),
      },
    });

    return NextResponse.json({
      success: true,
      saved: true,
      message: "Job saved successfully.",
      savedJob: {
        id: savedJob.id,
        jobId: savedJob.jobId,
      },
    });
  } catch (error) {
    console.error("SAVE JOB ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save job.",
      },
      { status: 500 }
    );
  }
}
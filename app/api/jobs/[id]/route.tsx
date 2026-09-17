import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Context
) {
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
          message: "Only employers can manage jobs.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const job = await db.job.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        company: true,
        location: true,
        category: true,
        type: true,
        experience: true,
        salary: true,
        salaryNumber: true,
        description: true,
        requirements: true,
        responsibilities: true,
        employerId: true,
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

    if (job.employerId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not allowed to manage this job.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("GET JOB ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load job.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: Context
) {
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
          message: "Only employers can edit jobs.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const existingJob = await db.job.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        employerId: true,
      },
    });

    if (!existingJob) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    if (existingJob.employerId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not allowed to edit this job.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      title,
      company,
      location,
      category,
      type,
      experience,
      salary,
      salaryNumber,
      description,
      requirements,
      responsibilities,
    } = body;

    if (
      !title ||
      !company ||
      !location ||
      !category ||
      !type ||
      !experience ||
      !salary ||
      !description ||
      !requirements ||
      !responsibilities
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const updatedJob = await db.job.update({
      where: {
        id,
      },
      data: {
        title: String(title).trim(),
        company: String(company).trim(),
        location: String(location).trim(),
        category: String(category).trim(),
        type: String(type).trim(),
        experience: String(experience).trim(),
        salary: String(salary).trim(),
        salaryNumber: Number(salaryNumber) || 0,
        description: String(description).trim(),
        requirements: String(requirements).trim(),
        responsibilities: String(responsibilities).trim(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job updated successfully.",
      job: updatedJob,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update job.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Context
) {
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
          message: "Only employers can delete jobs.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const existingJob = await db.job.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        employerId: true,
      },
    });

    if (!existingJob) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    if (existingJob.employerId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not allowed to delete this job.",
        },
        { status: 403 }
      );
    }

    await db.job.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete job.",
      },
      { status: 500 }
    );
  }
}
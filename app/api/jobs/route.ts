import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

/*
  GET /api/jobs

  Returns jobs from the Neon database.

  Optional search:
  /api/jobs?search=developer

  Optional category:
  /api/jobs?category=Technology
*/

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category")?.trim();

    const jobs = await db.job.findMany({
      where: {
        ...(category
          ? {
              category: {
                equals: category,
                mode: "insensitive",
              },
            }
          : {}),

        ...(search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  company: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  location: {
                    contains: search,
                    mode: "insensitive",
                  },
              },
              ],
            }
          : {}),
      },

      orderBy: {
        createdAt: "desc",
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
        createdAt: true,
        employerId: true,
      },
    });

    return NextResponse.json({
      success: true,
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load jobs.",
      },
      {
        status: 500,
      }
    );
  }
}


/*
  POST /api/jobs

  Employers can use this endpoint to create a job.
*/

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to post a job.",
        },
        {
          status: 401,
        }
      );
    }

    /*
      Only employers should be allowed to create jobs.
    */

    if (session.user.role !== "EMPLOYER") {
      return NextResponse.json(
        {
          success: false,
          message: "Only employers can post jobs.",
        },
        {
          status: 403,
        }
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

    /*
      Validate required fields.
    */

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
          message: "Please fill in all required job fields.",
        },
        {
          status: 400,
        }
      );
    }

    const job = await db.job.create({
      data: {
        id: crypto.randomUUID(),

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

        employerId: session.user.id,
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
        createdAt: true,
        employerId: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Job posted successfully.",
        job,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create job.",
      },
      {
        status: 500,
      }
    );
  }
}
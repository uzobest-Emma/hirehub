import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        location: true,
        bio: true,
        skills: true,
        resumeUrl: true,
        website: true,
        companyName: true,
        companyLogo: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error("PROFILE GET ERROR:", error);

    return NextResponse.json(
      { message: "Unable to load profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      fullName,
      phone,
      location,
      bio,
      skills,
      resumeUrl,
      website,
      companyName,
      companyLogo,
    } = body;

    if (!fullName?.trim()) {
      return NextResponse.json(
        { message: "Full name is required." },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        fullName: fullName.trim(),
        phone: phone?.trim() || null,
        location: location?.trim() || null,
        bio: bio?.trim() || null,
        skills: skills?.trim() || null,
        resumeUrl: resumeUrl?.trim() || null,
        website: website?.trim() || null,
        companyName: companyName?.trim() || null,
        companyLogo: companyLogo?.trim() || null,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        location: true,
        bio: true,
        skills: true,
        resumeUrl: true,
        website: true,
        companyName: true,
        companyLogo: true,
        role: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      { message: "Unable to update profile" },
      { status: 500 }
    );
  }
}
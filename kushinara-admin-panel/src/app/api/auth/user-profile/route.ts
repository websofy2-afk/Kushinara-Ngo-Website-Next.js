
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// export async function GET() {
//   await dbConnect();
//   const releases = await User.find().sort({ createdAt: -1 });
//   return NextResponse.json({ success: true, data: releases });
// }

export const PUT = async (req: Request) => {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse request body
    const { email, ...updateFields } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    // Update user by email
    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true } // Return updated document
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
};

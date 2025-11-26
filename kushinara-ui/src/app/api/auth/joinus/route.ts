
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { sendGreetEmail } from "../../../../lib/sendGreetEmail";
import User from "../../../../../model/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { fullName, email, mobile, dob, gender } = await req.json();

    if (!fullName || !email || !mobile || !dob || !gender) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({
      fullName,
      email,
      mobile,
      dob,
      gender,
    });

    await sendGreetEmail(fullName, email);

    return NextResponse.json(
      {
        message: "Welcome email sent successfully!",
        userId: user._id.toString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong while processing your request.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

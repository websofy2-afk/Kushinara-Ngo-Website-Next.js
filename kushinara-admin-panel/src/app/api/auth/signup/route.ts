import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmail";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { firstName, lastName, email, password } = await req.json();

    if (!firstName || !lastName || !email || !password)
      return NextResponse.json({ message: "All fields required" }, { status: 400 });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({ message: "User already exists" }, { status: 400 });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // save hashed password
      otp,
      isVerified: false,
    });

    await newUser.save();

    // Send OTP email
    await sendEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { jwtVerify } from "jose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email as string;
    const { oldPassword, newPassword, confirmPassword, captcha } = await req.json();
     const captchaVerify = await fetch(
      `${process.env.RECAPTCHA_BASE_URL! + process.env.RECAPTCHA_SECRET_KEY!}&response=${captcha}`,
      { method: "POST" }
    );
    const captchaData = await captchaVerify.json();
    if (!captchaData.success) {
      return NextResponse.json({ message: "Captcha verification failed" }, { status: 400 });
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 } 
      );
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New password and confirm password do not match." },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 401 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ message: "Internal Server Error." }, { status: 500 });
  }
}
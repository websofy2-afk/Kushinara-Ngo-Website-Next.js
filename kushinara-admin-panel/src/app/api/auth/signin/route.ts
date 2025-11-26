import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { generateToken } from "@/lib/generateToken";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password, captcha } = await req.json();
    const captchaVerify = await fetch(
      `${process.env.RECAPTCHA_BASE_URL! + process.env.RECAPTCHA_SECRET_KEY!}&response=${captcha}`,
      { method: "POST" }
    );
    const captchaData = await captchaVerify.json();
    if (!captchaData.success) {
      return NextResponse.json({ message: "Captcha verification failed" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (!user.isVerified)
      return NextResponse.json({ message: "User not verified" }, { status: 400 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const token = generateToken({ id: user._id, email: user.email });

    const res = NextResponse.json({ message: "Login successfully.", user: { email: user.email, firstName: user.firstName, lastName: user.lastName }, });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
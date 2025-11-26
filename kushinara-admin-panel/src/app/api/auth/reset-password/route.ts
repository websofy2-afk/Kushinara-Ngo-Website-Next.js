import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email, otp, newPassword, confirmPassword, captcha } = await req.json();
        const captchaVerify = await fetch(
            `${process.env.RECAPTCHA_BASE_URL! + process.env.RECAPTCHA_SECRET_KEY!}&response=${captcha}`,
            { method: "POST" }
        );
        const captchaData = await captchaVerify.json();
        if (!captchaData.success) {
            return NextResponse.json({ message: "Captcha verification failed" }, { status: 400 });
        }


        if (!email || !otp || !newPassword || !confirmPassword)
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });

        if (newPassword !== confirmPassword)
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        if (user.otp !== otp)
            return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        await user.save();
        return NextResponse.json({ message: "Password reset successful.!" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
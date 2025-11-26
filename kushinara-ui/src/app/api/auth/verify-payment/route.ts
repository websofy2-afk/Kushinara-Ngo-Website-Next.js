import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "../../../../lib/mongodb";
import Donation from "../../../../../model/Donation";
import { sendDonationEmail } from "@/lib/sendDonationEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, phoneNumber, email, address, refrenceNumber, amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const secret = process.env.RAZORPAY_KEY_SECRET as string;
    if (!name || !phoneNumber || !address || !amount || !refrenceNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    if (expectedSignature === razorpay_signature) {
      const donation = await Donation.create({
        name, phoneNumber, email, address, refrenceNumber, amount,
        transactionId: razorpay_payment_id
      })
      await sendDonationEmail(name, email, phoneNumber, address, amount, razorpay_payment_id)
      return NextResponse.json({ ok: true, msg: "Signature verified" });
    } else {
      return NextResponse.json({ ok: false, msg: "Signature mismatch" }, { status: 400 });
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
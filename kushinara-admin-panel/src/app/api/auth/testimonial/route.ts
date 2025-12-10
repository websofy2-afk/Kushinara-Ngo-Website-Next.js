import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  await dbConnect();
  const events = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: events });
}

export async function POST(req: Request) {
  try {
    const { title, subtitle, summary,  image, public_Id} = await req.json();
    if (!title || !subtitle || !summary || !image ||!public_Id) {
      return NextResponse.json({ success: false, message: "All fields are required!" }, { status: 400 });
    }
    await dbConnect();
    const newEvent = await Testimonial.create({ title,subtitle, summary, image, public_Id});
    return NextResponse.json({message:"Testimonial created successfully.", success: true, data: newEvent });
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err:any) {
    console.error("Error creating testimonial:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

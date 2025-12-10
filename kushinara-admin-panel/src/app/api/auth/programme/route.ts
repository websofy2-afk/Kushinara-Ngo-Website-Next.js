import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Programme from "@/models/Programme";

export async function GET() {
  await dbConnect();
  const events = await Programme.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: events });
}

export async function POST(req: Request) {
  try {
    const { title, text, detail, image, duration, category, date , location, type, public_Id} = await req.json();

    if (!title || !text || !detail || !category || !image || !duration || !location || !date || !type || !public_Id) {
      return NextResponse.json({ success: false, message: "All fields are required!" }, { status: 400 });
    }
    await dbConnect();
    const newEvent = await Programme.create({ title, text, detail, image, duration, category, date, location, type, public_Id});
    return NextResponse.json({message: "Programme created successfully.", success: true, data: newEvent });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (err:any) {
    console.error("Error creating event:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

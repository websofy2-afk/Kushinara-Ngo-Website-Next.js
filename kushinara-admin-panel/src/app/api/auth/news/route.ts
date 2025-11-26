import { NextResponse } from "next/server";
import News from "@/models/news";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  const releases = await News.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: releases });
}

export async function POST(req: Request) {
  try {
    const { title, subtitle, summary, author, image, thumbnail, category, image_public_Id, thumbnail_public_Id } = await req.json();

    if (!title || !subtitle || !summary || !author || !image || !thumbnail || !category || !image_public_Id || !thumbnail_public_Id) {
      return NextResponse.json({ success: false, message: "All fields are required!" }, { status: 400 });
    }

    await dbConnect();
    const news = await News.create({ title, subtitle, summary, author, image, thumbnail, category, image_public_Id, thumbnail_public_Id });
    return NextResponse.json({message:"News created successfully.", success: true, data: news });
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err:any) {
    console.error("Error creating news:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

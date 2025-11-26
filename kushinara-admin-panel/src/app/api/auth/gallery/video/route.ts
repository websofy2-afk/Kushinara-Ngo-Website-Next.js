import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Gallery/Video";
export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const { title, subtitle, video } = await req.json();
    if (!title || !subtitle || !video) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    const newVideo = await Video.create({
      title,
      subtitle,
      video,
    });
    return NextResponse.json({ message: "Video uploaded successfully.", success: true, data: newVideo });
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error("Error uploading video : ", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};


export const GET = async () => {
  try {
    await dbConnect();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

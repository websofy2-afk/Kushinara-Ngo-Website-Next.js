import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Gallery/Video";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export const GET = async (_: Request, context: RouteContext) => {
  try {
    await dbConnect();
    const { id } = await context.params;
    const video = await Video.findById(id);
    if (!video) return NextResponse.json({ success: false, message: "Video not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: video });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const PUT = async (req: Request, context: RouteContext) => {
  try {
    await dbConnect();
    const { id } = await context.params;
    const { title, subtitle, video } = await req.json();

    const existingVideo = await Video.findById(id);
    if (!existingVideo) {
      return NextResponse.json(
        { success: false, message: "Video not found" },
        { status: 404 }
      );
    }
    const updatedData = { title, subtitle, video };
    const updatedVideo = await Video.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      message: "Video updated successfully.",
      success: true,
      data: updatedVideo,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (error: any) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (_: Request, context: RouteContext) => {
  try {
    await dbConnect();
    const { id } = await context.params;
    const video = await Video.findById(id);
    if (!video) return NextResponse.json({ success: false, message: "Video not found" }, { status: 404 });
    await Video.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Video deleted successfully." });
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

import { NextResponse } from "next/server";
import News from "@/models/news";
import dbConnect from "@/lib/dbConnect";
import { cloudinaryImageDestroy } from "@/lib/cloudinaryImageDestroy";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
  await dbConnect();

  const { id } = await context.params;

  try {
    const news = await News.findById(id);
    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: RouteContext) {
  await dbConnect();

  const { id } = await context.params;
  const body = await req.json();

  try {
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    if (body.image && body.image !== existingNews.image) {
      if (existingNews.image_public_Id) {
        cloudinaryImageDestroy(existingNews.image_public_Id);
      }
    }
    if (body.thumbnail && body.thumbnail !== existingNews.thumbnail) {
      if (existingNews.thumbnail_public_Id) {
        cloudinaryImageDestroy(existingNews.thumbnail_public_Id);
      }
    }
    const updated = await News.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      message: "News updated successfully.",
      success: true,
      data: updated,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: RouteContext) {
  await dbConnect();
  const { id } = await context.params;
  try {
    const existingNews = await News.findById(id);

    if (!existingNews) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }
    if (existingNews.image_public_Id && existingNews.thumbnail_public_Id) {
      cloudinaryImageDestroy(existingNews.image_public_Id);
      cloudinaryImageDestroy(existingNews.thumbnail_public_Id);
    }
    await News.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "News deleted successfully." });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

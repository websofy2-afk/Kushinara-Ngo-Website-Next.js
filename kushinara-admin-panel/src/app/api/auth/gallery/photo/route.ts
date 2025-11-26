import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Photo from "@/models/Gallery/Photo";

export async function GET() {
  await dbConnect();
  const events = await Photo.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: events });
}
export async function POST(req: Request) {
  try {
    const { title, subtitle, image, public_Id} = await req.json();

    if (!title || !subtitle ||  !image || !public_Id ) {
      return NextResponse.json({ success: false, message: "All fields are required!" }, { status: 400 });
    }
    await dbConnect();
    const newImage = await Photo.create({ title, subtitle, image, public_Id});
    return NextResponse.json({message:"Photo uploaded successfully.", success: true, data: newImage });
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err:any) {
    console.error("Error uploading photo :", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

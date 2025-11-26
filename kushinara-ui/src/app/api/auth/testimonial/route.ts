import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/testimonial`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching donation data:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}

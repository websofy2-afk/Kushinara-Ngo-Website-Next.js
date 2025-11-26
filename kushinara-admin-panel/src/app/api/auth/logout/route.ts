import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Log out successfully." });
  res.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    expires: new Date(0),
  });
  return res;
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const secret = process.env.JWT_SECRET;
    if (!token || !secret) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
    try {
        await jwtVerify(token, new TextEncoder().encode(secret));
        return NextResponse.next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return NextResponse.redirect(new URL("/signin", req.url));
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/aboutUs/:path*",
        "/testimonial/:path*",
        "/certificate/:path*",
        "/donation-records/:path*",
        "/events/:path*",
        "/gallery/:path*",
        "/programmes/:path*",
        "/news/:path*",
        "/profile/:path*",
    ],
};


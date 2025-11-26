import { NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(
    req: Request, context: RouteContext
) {
    const { id } = await context.params;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/upload-certificate/${id}`
        );

        if (!res.ok) {
            return NextResponse.json({ success: false, message: "File not found" }, { status: res.status });
        }
        const blob = await res.blob();
        const contentType = res.headers.get("Content-Type") || "application/octet-stream";
        return new NextResponse(blob, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": res.headers.get("Content-Disposition") || "inline",
            },
        });

    } catch (error) {
        console.error("Error fetching certificate:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch certificate" },
            { status: 500 }
        );
    }
}

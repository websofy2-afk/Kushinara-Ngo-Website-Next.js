import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cloudinaryImageDestroy } from "@/lib/cloudinaryImageDestroy";
import Testimonial from "@/models/Testimonial";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
    await dbConnect();
    const { id } = await context.params;

    try {
        const event = await Testimonial.findById(id);
        if (!event) {
            return NextResponse.json(
                { success: false, message: "Testimonial not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: event });
    } catch (error: any) {
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
        const existingEvent = await Testimonial.findById(id);
        if (existingEvent.public_Id) {
            cloudinaryImageDestroy(existingEvent.public_Id)
        }
        const updated = await Testimonial.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updated || !existingEvent) {
            return NextResponse.json(
                { success: false, message: "Testimonial not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Testimonial updated successfully.", success: true, data: updated });
    } catch (error: any) {
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
        const existingEvent = await Testimonial.findById(id);
        if (existingEvent.public_Id) {
            cloudinaryImageDestroy(existingEvent.public_Id)
        }
        const deleted = await Testimonial.findByIdAndDelete(id);
        if (!deleted || !existingEvent) {
            return NextResponse.json(
                { success: false, message: "Testimonial not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, message: "Testimonial deleted successfully." });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

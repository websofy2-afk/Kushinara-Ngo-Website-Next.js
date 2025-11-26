import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { cloudinaryImageDestroy } from "@/lib/cloudinaryImageDestroy";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
    await dbConnect();
    const { id } = await context.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return NextResponse.json(
                { success: false, message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: event });
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
        const existingEvent = await Event.findById(id);
        if (existingEvent.public_Id) {
            cloudinaryImageDestroy(existingEvent.public_Id)
        }
        const updated = await Event.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updated || !existingEvent) {
            return NextResponse.json(
                { success: false, message: "Event not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Event updated successfully.", success: true, data: updated });
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
        const existingEvent = await Event.findById(id);
        if (existingEvent.public_Id) {
            cloudinaryImageDestroy(existingEvent.public_Id)
        }
        const deleted = await Event.findByIdAndDelete(id);
        if (!deleted || !existingEvent) {
            return NextResponse.json(
                { success: false, message: "Event not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, message: "Event deleted successfully" });
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

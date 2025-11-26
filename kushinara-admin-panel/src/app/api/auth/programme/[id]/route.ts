import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Programme from "@/models/Programme";
import { cloudinaryImageDestroy } from "@/lib/cloudinaryImageDestroy";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
    await dbConnect();

    const { id } = await context.params;
    try {
        const programme = await Programme.findById(id);
        if (!programme) {
            return NextResponse.json(
                { success: false, message: "Programme not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: programme });
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

        const existingProgramme = await Programme.findById(id);
         if (!existingProgramme) {
            return NextResponse.json(
                { success: false, message: "Programme not found" },
                { status: 404 }
            );
        }
        if (existingProgramme.public_Id) {
            cloudinaryImageDestroy(existingProgramme.public_Id)
        }
        const updated = await Programme.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

       
        return NextResponse.json({ success: true, data: updated, message: "Programme updated successfully." });
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
        const existingProgramme = await Programme.findById(id);
         if (!existingProgramme) {
            return NextResponse.json(
                { success: false, message: "Programme not found" },
                { status: 404 }
            );
        }
        if (existingProgramme.public_Id) {
            cloudinaryImageDestroy(existingProgramme.public_Id)
        }
        await Programme.findByIdAndDelete(id);
       
        return NextResponse.json({ success: true, message: "Programme deleted successfully." });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Photo from "@/models/Gallery/Photo";
import { cloudinaryImageDestroy } from "@/lib/cloudinaryImageDestroy";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
    await dbConnect();
    const { id } = await context.params;
    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            return NextResponse.json(
                { success: false, message: "Image not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: photo });
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    context: RouteContext
) {
    await dbConnect();
    const { id } = await context.params;
    const body = await req.json();
    try {
        const existingPhoto = await Photo.findById(id);
        if (existingPhoto.public_Id) {
            cloudinaryImageDestroy(existingPhoto.public_Id)
        }
        const updated = await Photo.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updated || !existingPhoto) {
            return NextResponse.json(
                { success: false, message: "Image not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Photo updated successfully.",
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
        const existingPhoto = await Photo.findById(id);
        if (existingPhoto.public_Id) {
            cloudinaryImageDestroy(existingPhoto.public_Id)
        }
        const deleted = await Photo.findByIdAndDelete(id);
        if (!deleted || !existingPhoto) {
            return NextResponse.json(
                { success: false, message: "Photo not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, message: "Photo deleted successfully" });
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}



import cloudinary from "./cloudinary";

export const cloudinaryImageDestroy = async (id: string) => {
    await cloudinary.uploader.destroy(id, {
        resource_type: "image",
    });
}
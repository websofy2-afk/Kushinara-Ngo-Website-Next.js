"use client";

import { useState } from "react";
import ImageUploader from "../common/ImageUploader";
import { X } from "lucide-react";

export default function TestimonialModal({ mode, onClose, onSave, initialData }: any) {
    const [form, setForm] = useState(
        initialData || {
            title: "",
            subtitle: "",
            summary: "",
            image: "",
            public_Id: "",
        }
    );

    const handleChange = (e: any) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        if (
            !form.title ||
            !form.subtitle ||
            !form.summary ||
            !form.image ||
            !form.public_Id
        ) {
            alert("Please fill all fields!");
            return;
        }
        onSave(form);
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center bg-black/60 justify-center z-[9999]" onClick={onClose}>
            <div
                className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[90vh] p-6 overflow-y-auto shadow-lg
                   hide-scrollbar" onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">

                    <h2 className="text-xl font-semibold">{mode === "edit" ? "Update" : mode === "delete" ? "Delete" : "Create"} Testimonail</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                    >
                        <X />
                    </button>
                </div>

                {mode === "delete" ? (
                    <p>Are you sure you want to delete this testimonial?</p>
                ) : (
                    <>
                        <div className="space-y-3">
                            <input
                                name="title"
                                placeholder="Title"
                                className="border w-full p-2 rounded"
                                value={form.title}
                                onChange={handleChange}
                            />
                            <input
                                name="subtitle"
                                placeholder="Subtitle"
                                className="border w-full p-2 rounded"
                                value={form.subtitle}
                                onChange={handleChange}
                            />
                            <textarea
                                name="summary"
                                rows={5}
                                placeholder="Write about your testimonial..."
                                className="border w-full resize-none p-2 rounded"
                                value={form.summary}
                                onChange={handleChange}
                            />
                            <ImageUploader
                                label="Image"
                                folder="testimonial"
                                onUpload={(url, public_Id) => setForm({ ...form, image: url || "", public_Id: public_Id || null })}
                                defaultPreview={form.image}
                            />
                        </div>
                    </>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        className="bg-gray-300 px-3 py-1 cursor-pointer rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`${mode === "delete" ? "bg-red-600" : "bg-blue-600"
                            } text-white px-3 py-1 cursor-pointer rounded hover:opacity-90`}
                        onClick={handleSubmit}
                    >
                        {mode === "delete" ? "Delete" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

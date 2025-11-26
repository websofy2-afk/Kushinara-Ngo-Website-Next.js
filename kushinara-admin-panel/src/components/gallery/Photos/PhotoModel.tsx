"use client";

import ImageUploader from "@/components/common/ImageUploader";
import { X } from "lucide-react";
import { useState } from "react";


export default function PhotoModal({ mode, onClose, onSave, initialData }: any) {

    const [form, setForm] = useState(initialData || { title: "", subtitle: "", image: "", public_Id: "" });

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = () => {

        if (!form.title || !form.subtitle || !form.image || !form.public_Id) {
            alert("Please fill all fields!");
            return;
        }
        onSave(form);
    };

    return (
        <div onClick={onClose} className="fixed inset-0 bg-opacity-50  flex bg-black/60 items-center justify-center z-50">
            <div  onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg w-[600px] space-y-4">
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">{mode === "edit" ? "Update" : mode === "delete" ? "Delete" : "Upload"} Photo</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                    >
                        <X />
                    </button>
                </div>

                {mode === "delete" ? (
                    <p>Are you sure you want to delete this photo?</p>
                ) :
                    (
                        <>
                            <input name="title" placeholder="Title" className="border w-full p-2" value={form.title} onChange={handleChange} />
                            <input name="subtitle" placeholder="Subtitle" className="border w-full p-2" value={form.subtitle} onChange={handleChange} />

                            <ImageUploader label="Photo" folder="Gallery-Photo"

                                onUpload={(url, public_Id) => setForm({ ...form, image: url || "", public_Id: public_Id || null })}
                                defaultPreview={form.image}
                            />
                        </>
                    )
                }
                <div className="flex justify-end gap-3">
                    <button className="bg-gray-300 px-3 cursor-pointer py-1 rounded" onClick={onClose}>Cancel</button>
                    <button
                        className={`${mode === "delete" ? "bg-red-600" : "bg-blue-600"} text-white cursor-pointer px-3 py-1 rounded`}
                        onClick={handleSubmit}
                    >
                        {mode === "delete" ? "Delete" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

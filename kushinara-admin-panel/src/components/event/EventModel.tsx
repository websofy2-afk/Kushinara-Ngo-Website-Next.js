
"use client";

import { useState } from "react";
import ImageUploader from "../common/ImageUploader";
import { X } from "lucide-react";

export default function EventModal({ mode, onClose, onSave, initialData }: any) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      text: "",
      detail: "",
      entrants: "",
      category: "",
      image: "",
      duration: "",
      location: "",
      type: "",
      date: "",
      public_Id: ""
    }
  );

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.text ||
      !form.detail ||
      !form.entrants ||
      !form.category ||
      !form.image ||
      !form.duration ||
      !form.location ||
      !form.type ||
      !form.date ||
      !form.public_Id
    ) {
      alert("Please fill all fields!");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-[9999] bg-black/60" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-lg w-[95%] max-w-[1000px] max-h-[90vh] shadow-lg 
                   overflow-y-auto scroll-smooth hide-scrollbar" onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-semibold">{mode === "edit" ? "Update" : mode === "delete" ? "Delete" : "Create"} Event</h2>
          <button
            onClick={onClose}
            className="cursor-pointer right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <X />
          </button>
        </div>

        {mode === "delete" ? (
          <p>Are you sure you want to delete this event?</p>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <input
                  name="title"
                  placeholder="Title"
                  className="border w-full p-2 rounded"
                  value={form.title}
                  onChange={handleChange}
                />
                <input
                  name="text"
                  placeholder="Subtitle"
                  className="border w-full p-2 rounded"
                  value={form.text}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <input
                  name="entrants"
                  placeholder="Entrants"
                  className="border w-full p-2 rounded"
                  value={form.entrants}
                  onChange={handleChange}
                />
                <input
                  name="category"
                  placeholder="Category"
                  className="border w-full p-2 rounded"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <input
                  name="type"
                  placeholder="Type"
                  className="border w-full p-2 rounded"
                  value={form.type}
                  onChange={handleChange}
                />
                <input
                  name="duration"
                  placeholder="Duration"
                  className="border w-full p-2 rounded"
                  value={form.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <input
                  name="location"
                  placeholder="Location"
                  className="border w-full p-2 rounded"
                  value={form.location}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="date"
                  className="border w-full p-2 rounded"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <textarea
                  placeholder="Event Details...."
                  name="detail"
                  className="border w-full p-2 rounded min-h-[100px]"
                  value={form.detail}
                  onChange={handleChange}
                />
              </div>
              <ImageUploader
                label="Image"
                folder="events"
                onUpload={(url, public_Id) => setForm({ ...form, image: url || "", public_Id: public_Id || null })}
                defaultPreview={form.image}
              />
            </div>
          </>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-gray-300 cursor-pointer px-3 py-1 rounded hover:bg-gray-400"
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


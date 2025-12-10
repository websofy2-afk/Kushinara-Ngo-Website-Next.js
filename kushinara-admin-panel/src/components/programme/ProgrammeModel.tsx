"use client";

import { useState } from "react";
import ImageUploader from "../common/ImageUploader";
import { X } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProgrammeModal({ mode, onClose, onSave, initialData }: any) {
  const [form, setForm] = useState(initialData ||
  {
    title: "",
    text: "",
    detail: "",
    category: "",
    image: "",
    duration: "",
    location: "",
    type: "",
    date: "",
    public_Id: ""
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.text ||
      !form.detail ||
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
        className="bg-white rounded-lg w-[95%] max-w-[1000px] max-h-[90vh] p-6 shadow-lg overflow-y-auto scroll-smooth hide-scrollbar" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{mode === "edit" ? "Update" : mode === "delete" ? "Delete" : "Create"} Programme</h2>
          <button
            onClick={onClose}
            className="cursor-pointer right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <X />
          </button>
        </div>
        {mode === "delete" ? (
          <p>Are you sure you want to delete this programme?</p>
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
                  name="category"
                  placeholder="Category"
                  className="border w-full p-2 rounded"
                  value={form.category}
                  onChange={handleChange}
                />
                <select
                  name="type"
                  className="border w-full p-2 rounded cursor-pointer"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Community Development">
                    Community Development
                  </option>
                </select>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <input
                  name="duration"
                  placeholder="Duration"
                  className="border w-full p-2 rounded"
                  value={form.duration}
                  onChange={handleChange}
                />
                <input
                  name="location"
                  placeholder="Location"
                  className="border w-full p-2 rounded"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-center gap-3">
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
                  placeholder="Programme Details...."
                  name="detail"
                  className="border w-full p-2 rounded min-h-[100px]"
                  value={form.detail}
                  onChange={handleChange}
                />
              </div>
              <ImageUploader
                label="Programme"
                folder="programmes"
                onUpload={(url, public_Id) => setForm({ ...form, image: url || "", public_Id: public_Id || null })}
                defaultPreview={form.image}
              />
            </div>
          </>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-gray-300 px-3 py-1 rounded cursor-pointer hover:bg-gray-400"
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


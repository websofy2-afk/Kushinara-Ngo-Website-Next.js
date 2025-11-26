"use client";
import { getEmbedUrl } from "@/lib/getEmbedUrl";
import { Loader, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function VideoModal({
  mode,
  onClose,
  onSave,
  initialData,
  loading,
}: any) {
  const [form, setForm] = useState(
    initialData || { title: "", subtitle: "", video: "" }
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"youtube" | "video" | null>(
    null
  );

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "video") {
      const ytEmbed = getEmbedUrl(value);
      if (ytEmbed) {
        setPreviewUrl(ytEmbed);
        setPreviewType("youtube");
      } else if (value.endsWith(".mp4") || value.includes("http")) {
        setPreviewUrl(value);
        setPreviewType("video");
      } else {
        setPreviewUrl(null);
        setPreviewType(null);
      }
    }
  };

  useEffect(() => {
    if (mode === "edit" && initialData?.video) {
      const val = initialData.video;
      const ytEmbed = typeof val === "string" ? getEmbedUrl(val) : null;

      if (ytEmbed) {
        setPreviewUrl(ytEmbed);
        setPreviewType("youtube");
      } else {
        setPreviewUrl(val);
        setPreviewType("video");
      }
    }
  }, [mode, initialData]);

  const handleSubmit = () => {
    if (!form.title || !form.subtitle || !form.video) {
      alert("Please fill all fields!");
      return;
    }
    onSave(form);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-[600px] space-y-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{mode === "edit" ? "Update" : mode === "delete" ? "Delete" : "Upload"} Video</h2>
          <button
            onClick={onClose}
            className="cursor-pointer right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <X />
          </button>
        </div>

        {mode === "delete" ? (
          <p>Are you sure you want to delete this video?</p>
        ) : (
          <>
            <input
              name="title"
              placeholder="Title"
              className="border w-full p-2 rounded"
              value={form.title}
              onChange={handleInputChange}
            />

            <input
              name="subtitle"
              placeholder="Subtitle"
              className="border w-full p-2 rounded"
              value={form.subtitle}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Youtube or video URL"
              name="video"
              value={typeof form.video === "string" ? form.video : ""}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
            {previewUrl && (
              <div className="mt-3">
                <p className="font-medium mb-2">Video Preview:</p>

                {previewType === "youtube" && (
                  <iframe
                    src={previewUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-60 rounded-md border"
                  ></iframe>
                )}

                {previewType === "video" && (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-60 rounded-md border"
                  />
                )}
              </div>
            )}
          </>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`${mode === "delete" ? "bg-red-600" : "bg-blue-600"
              } text-white px-4 py-2 rounded cursor-pointer`}
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex gap-2 items-center">
                <span>{mode === "delete" ? "Delete" : "Save Video"}</span>
                <Loader className="animate-spin w-5 h-5" />
              </div>
            ) : (
              <>{mode === "delete" ? "Delete" : "Save Video"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

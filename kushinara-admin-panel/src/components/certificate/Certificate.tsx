"use client";
import { useState, useEffect } from "react";
import Tooltip from "../common/Tooltip";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Link from "next/link";

export default function Certificate() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [viewPdf, setViewPdf] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(null);

  const fetchPdfs = async () => {
    const res = await fetch("/api/auth/upload-certificate");
    const data = await res.json();
    setPdfs(data);
    return data;
  };

  const showTooltip = (message: string, type: "success" | "error" | "info" = "info") => {
    setTooltip({ message, type });
    setTimeout(() => setTooltip(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    } else {
      setPreviewUrl(null);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle("");
    setPreviewUrl(null);
    setEditId(null);
    const fileInput = document.getElementById("pdfInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title)
      return showTooltip("Please enter title and select file", "error");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const res = await fetch("/api/auth/upload-certificate", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      showTooltip(data.message, "success");
      resetForm();
      fetchPdfs();
    } else showTooltip(data.error, "error");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId || !title)
      return showTooltip("Please select a file and title to update", "error");

    const formData = new FormData();
    formData.append("id", editId);
    formData.append("title", title);

    if (file) {
      formData.append("file", file);
    } else {
      try {
        const existingPdf = pdfs.find((p) => p._id === editId);
        if (existingPdf) {
          const existingFileResponse = await fetch(`/api/auth/upload-certificate/${editId}`);
          const blob = await existingFileResponse.blob();
          const existingFile = new File([blob], existingPdf.filename, { type: blob.type });
          formData.append("file", existingFile);
        }
      } catch (error) {
        return showTooltip("Failed to fetch existing file for update", "error");
      }
    }

    const res = await fetch("/api/auth/upload-certificate", {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      showTooltip(data.message, "success");
      resetForm();
      fetchPdfs();
      const ts = Date.now();
      setPdfs((prev) =>
        prev.map((pdf) =>
          pdf._id === editId
            ? { ...pdf, title, previewUrl: `/api/auth/upload-certificate/${editId}?t=${ts}` }
            : pdf
        )
      );
    } else {
      showTooltip(data.error, "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file?")) return;
    const res = await fetch("/api/auth/upload-upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (res.ok) {
      showTooltip(data.message, "success");
      fetchPdfs();
    } else showTooltip(data.error, "error");
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}
      <PageBreadcrumb pageTitle="Certificate" />

      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Upload & Manage Certificate
      </h2>

      <form
        onSubmit={editId ? handleUpdate : handleUpload}
        className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 flex-wrap"
      >
        <input
          type="text"
          placeholder="Enter PDF Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded-md w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="border p-2 rounded-md cursor-pointer shadow-sm"
          id="pdfInput"
        />

        <button
          type="submit"
          className={`px-5 py-2 text-white rounded-md font-medium cursor-pointer shadow-md transition ${
            editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editId ? "Update PDF" : "Upload PDF"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition shadow-md"
          >
            Cancel
          </button>
        )}
      </form>
      {previewUrl && (
        <div className="w-full flex flex-col items-center mb-10 relative">
          <button
            onClick={() => {
              setPreviewUrl(null);
              setFile(null);
              const fileInput = document.getElementById("pdfInput") as HTMLInputElement;
              if (fileInput) fileInput.value = "";
            }}
            className="absolute top-2 right-[10%] bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer shadow-md transition"
          >
            ✕
          </button>
          <iframe
            src={previewUrl}
            className="w-[80%] h-[500px] rounded-lg border shadow-lg"
            title="PDF Preview"
          ></iframe>
        </div>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Uploaded PDFs</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pdfs.map((pdf) => (
          <div
            key={pdf._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border hover:shadow-lg transition"
          >
            <iframe
              src={pdf.previewUrl ?? `/api/auth/upload-certificate/${pdf._id}#toolbar=0`}
              className="w-full h-64 rounded-md border mb-3"
              title={pdf.title}
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-2 text-center">{pdf.title}</h4>

            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => setViewPdf(`/api/auth/upload-certificate/${pdf._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer transition"
              >
                View
              </button>
              <button
                onClick={() => {
                  setEditId(pdf._id);
                  setTitle(pdf.title);
                  setPreviewUrl(`/api/auth/upload-certificate/${pdf._id}`);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md cursor-pointer transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(pdf._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer transition"
              >
                Delete
              </button>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  const fileUrl = `/api/auth/upload-certificate/${pdf._id}`;
                  const link = document.createElement("a");
                  link.href = fileUrl;
                  link.download = pdf.filename;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setTimeout(() => {
                    showTooltip(`${pdf.filename} file downloaded`, "success");
                  }, 1000);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md cursor-pointer transition"
              >
                Download
              </Link>
            </div>
          </div>
        ))}
      </div>
      {viewPdf && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] h-[95%] p-4 rounded-lg shadow-lg relative">
            <button
              onClick={() => setViewPdf(null)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full cursor-pointer"
            >
              ✕
            </button>
            <iframe src={viewPdf} className="w-full h-full rounded-md" title="PDF Viewer" />
          </div>
        </div>
      )}
    </div>
  );
}

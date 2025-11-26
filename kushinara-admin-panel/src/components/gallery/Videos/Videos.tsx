"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import VideoModal from "./VideoModel";
import Tooltip from "@/components/common/Tooltip";
import { getEmbedUrl } from "@/lib/getEmbedUrl";
import Pagination from "@/components/common/Pagination";

export default function Video() {
  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState<{ mode: string; item?: any } | null>(null);
  const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(
    null
  );
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [search, setSearch] = useState({ title: "" });

  const showTooltip = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setTooltip({ message, type });
    setTimeout(() => setTooltip(null), 3000);
  };

  const fetchData = async () => {
    const res = await fetch("/api/auth/gallery/video");
    const json = await res.json();
    setData(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.title.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleSave = async (form: any) => {
    if (!modal) return;
    setloading(true);
    let res: any = null;

    try {
      if (modal.mode === "create") {
        res = await fetch("/api/auth/gallery/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else if (modal.mode === "edit") {
        res = await fetch(`/api/auth/gallery/video/${modal.item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else if (modal.mode === "delete") {
        res = await fetch(`/api/auth/gallery/video/${modal.item._id}`, {
          method: "DELETE",
        });
      }

      const data = await res.json();
      if (res.ok) showTooltip(data?.message, "success");
      else showTooltip(data.message || "Something went wrong", "error");
    } catch (error) {
      showTooltip("Internal Server Error", "error");
    } finally {
      setloading(false);
      setModal(null);
      fetchData();
    }
  };

  return (
    <div>
      {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}

      <PageBreadcrumb pageTitle="Video" />

      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setModal({ mode: "create" })}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
        >
          + Upload Video
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          className="border px-2 py-1 rounded"
          value={search.title}
          onChange={(e) => setSearch({ title: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {currentData.map((item) => {
          const ytEmbed = getEmbedUrl(item.video);
          return (
            <div
              key={item._id}
              className="bg-gray-100 h-full border border-gray-200 rounded-xl"
            >
              <div className="overflow-hidden rounded-lg aspect-16/9">

                {ytEmbed ? (
                  <iframe
                    src={ytEmbed}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <video
                    src={item.video}
                    controls
                    className="w-full h-full rounded-md"
                  />
                )}
              </div>
              <div className="m-3">
                <h1>{item.title}</h1>
                <p>{item.subtitle}</p>
              </div>
              <div className="flex gap-2 justify-end m-3">
                <button
                  onClick={() => setModal({ mode: "edit", item })}
                  className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => setModal({ mode: "delete", item })}
                  className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {modal && (
        <VideoModal
          mode={modal?.mode}
          initialData={modal.item}
          onClose={() => setModal(null)}
          onSave={handleSave}
          loading={loading}
        />
      )}
    </div>
  );
}



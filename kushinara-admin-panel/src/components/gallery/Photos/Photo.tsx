"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import PhotoModel from "./PhotoModel";
import Image from "next/image";
import Tooltip from "@/components/common/Tooltip";
import Pagination from "@/components/common/Pagination";

export default function Photo() {
  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState<{ mode: string; item?: any } | null>(null);

  const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(
    null
  );

  const showTooltip = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setTooltip({ message, type });
    setTimeout(() => setTooltip(null), 3000);
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [search, setSearch] = useState({ title: "", category: "" });

  const fetchData = async () => {
    const res = await fetch("/api/auth/gallery/photo");
    const json = await res.json();
    setData(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered data
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.title.toLowerCase())
  );

  // Paginated data
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleSave = async (form: any) => {
    if (!modal) return;
    let res: any = null;
    let data: any = null;
    try {
      if (modal.mode === "create") {
        res = await fetch("/api/auth/gallery/photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      } else if (modal.mode === "edit") {
        res = await fetch(`/api/auth/gallery/photo/${modal.item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else if (modal.mode === "delete") {
        res = await fetch(`/api/auth/gallery/photo/${modal.item._id}`, {
          method: "DELETE",
        });
      }
      data = await res.json();
      console.log("Data is --> ", data)
      if (res.ok) {
        showTooltip(data?.message, "success");
      } else {
        showTooltip(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      showTooltip("Internal Server Error", "error");
    } finally {
      setModal(null);
      fetchData();
    }
  };



  return (
    <div >
      {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}
      <PageBreadcrumb pageTitle="Photo" />
      <div className="flex justify-end items-center mb-4">
        <button onClick={() => setModal({ mode: "create" })} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
          + Upload Photo
        </button>
      </div>
      {/* Search/Filter */}
      <div className="flex gap-3 mb-4">
        {["title"].map((key) => (
          <input
            key={key}
            type="text"
            placeholder={`Search by ${key}`}
            className="border px-2 py-1 rounded"
            value={(search as any)[key]}
            onChange={(e) => setSearch({ ...search, [key]: e.target.value })}
          />
        ))}
      </div>

      {/* Table */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        {

          currentData.map((item) => (

            <div key={item._id} className="bg-gray-100 h-full  border border-gray-200 rounded-xl">
              <Image
                src={item.image}
                alt=" grid"
                className="w-full h-72 border border-gray-200 rounded-t-xl"
                width={500}
                height={500}

              />
              <div className="m-3">
                <h1>{item.title}</h1>
                <p>{item.subtitle}</p>
              </div>
              <div className=" flex gap-2 justify-end m-3">
                <button onClick={() => setModal({ mode: "edit", item })} className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => setModal({ mode: "delete", item })} className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>

            </div>
          ))
        }
      </div>
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {modal && (
        <PhotoModel
          mode={modal?.mode}
          initialData={modal.item}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}


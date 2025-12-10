"use client";

import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Tooltip from "../common/Tooltip";
import NewsModal from "./NewsModal";
import Pagination from "../common/Pagination";

export default function News() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modal, setModal] = useState<{ mode: string; item?: any } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [search, setSearch] = useState({ title: "", category: "", author: "" });

  const fetchData = async () => {
    const res = await fetch("/api/auth/news");
    const json = await res.json();
    setData(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.title.toLowerCase()) &&
      item.category.toLowerCase().includes(search.category.toLowerCase()) &&
      item.author.toLowerCase().includes(search.author.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (form: any) => {
    if (!modal) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let res: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = null;
    try {
      if (modal.mode === "create") {
        res = await fetch("/api/auth/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

      } else if (modal.mode === "edit") {
        res = await fetch(`/api/auth/news/${modal.item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else if (modal.mode === "delete") {
        res = await fetch(`/api/auth/news/${modal.item._id}`, {
          method: "DELETE",
        });
      }
      data = await res.json();
      if (res.ok) {
        showTooltip(data?.message, "success");
      } else {
        showTooltip(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.log("Internal Server Error ", error)
      showTooltip("Internal Server Error", "error");
    } finally {
      setModal(null);
      fetchData();
    }
  };
  return (
    <div >
      {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}
      <PageBreadcrumb pageTitle="News" />
      <div className="flex justify-end items-center mb-4">

        <button onClick={() => setModal({ mode: "create" })} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
          + Create News
        </button>
      </div>
      <div className="flex gap-3 mb-4">
        {["title", "category", "author"].map((key) => (
          <input
            key={key}
            type="text"
            placeholder={`Search by ${key}`}
            className="border px-2 py-1 rounded"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value={(search as any)[key]}
            onChange={(e) => setSearch({ ...search, [key]: e.target.value })}
          />
        ))}
      </div>
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 border">Title</th>
            <th className="py-2 px-3 border">Author</th>
            <th className="py-2 px-3 border">Category</th>
            <th className="py-2 px-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.author}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button onClick={() => setModal({ mode: "edit", item })} className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => setModal({ mode: "delete", item })} className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {modal && (
        <NewsModal
          mode={modal.mode}
          initialData={modal.item}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}


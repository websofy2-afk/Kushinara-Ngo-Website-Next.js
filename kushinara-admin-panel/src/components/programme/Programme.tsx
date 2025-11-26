"use client";

import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import ProgrammeModal from "./ProgrammeModel";
import Tooltip from "../common/Tooltip";
import Pagination from "../common/Pagination";

export default function Programme() {
  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState<{ mode: string; item?: any } | null>(null);
  const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(
    null
  );
  const [search, setSearch] = useState({ title: "", category: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const showTooltip = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setTooltip({ message, type });
    setTimeout(() => setTooltip(null), 3000);
  };

  const fetchData = async () => {
    const res = await fetch("/api/auth/programme");
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
      item.type.toLowerCase().includes(search.type.toLowerCase())
  );
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
        res = await fetch("/api/auth/programme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

      } else if (modal.mode === "edit") {
        res = await fetch(`/api/auth/programme/${modal.item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else if (modal.mode === "delete") {
        res = await fetch(`/api/auth/programme/${modal.item._id}`, {
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
      showTooltip("Internal Server Error", "error");
    } finally {
      setModal(null);
      fetchData();
    }
  };

  return (
    <div >
      {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}
      <PageBreadcrumb pageTitle="Programme" />
      <div className="flex justify-end items-center mb-4">
        <button onClick={() => setModal({ mode: "create" })} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
          + Create Programme
        </button>
      </div>
      {/* Search/Filter */}
      <div className="flex gap-3 mb-4">
        {["title", "category", "type"].map((key) => (
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
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 border">Title</th>
            <th className="py-2 px-3 border">Category</th>
            <th className="py-2 px-3 border">Location</th>
            <th className="py-2 px-3 border">Date</th>
            <th className="py-2 px-3 border">Type</th>
            <th className="py-2 px-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.location}</td>
              <td className="border p-2">{item.date.split("-").reverse().join("/")}</td>
              <td className="border p-2">{item.type}</td>
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
        <ProgrammeModal
          mode={modal.mode}
          initialData={modal.item}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}


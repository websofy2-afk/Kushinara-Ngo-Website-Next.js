"use client";
import React, { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import { useModal } from "@/hooks/useModal";
import ImageUploader from "@/components/common/ImageUploader";
import PressReleaseModal from "@/components/news/NewsModal";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function FormInModal({ mode, onClose, onSave, initialData }: any) {



  const [form, setForm] = useState(initialData || { title: "", subtitle: "", summary: "", author: "", category: "", image: "", thumbnail: "" });

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Title ---> ", form.title)
    if (!form.title) {
      alert("Please fill all fields!");
      return;
    }

    onSave(form);
  };




  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <>
      <Button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={openModal}>
        + Create Event
      </Button>   
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <div className="bg-white p-6 rounded-lg w-[600px] space-y-4">
          <h2 className="text-xl font-semibold">{mode === "edit" ? "Update" : mode === "delete" ? "Delete" : "Create"} Press Release</h2>

          {mode === "delete" ? (
            <p>Are you sure you want to delete this press release?</p>
          ) :

            (
              <>
                <input name="title" placeholder="Title" className="border w-full p-2" value={form.title} onChange={handleChange} />
                <input name="subtitle" placeholder="Subtitle" className="border w-full p-2" value={form.subtitle} onChange={handleChange} />
                <input name="summary" placeholder="Summary" className="border w-full p-2" value={form.summary} onChange={handleChange} />
                <input name="author" placeholder="Author" className="border w-full p-2" value={form.author} onChange={handleChange} />
                <input name="category" placeholder="Category" className="border w-full p-2" value={form.category} onChange={handleChange} />
                <ImageUploader label="Image" onUpload={(url) => setForm({ ...form, image: url })} />
                <ImageUploader label="Thumbnail" onUpload={(url) => setForm({ ...form, thumbnail: url })} />
              </>
            )
          }
          <div className="flex justify-end gap-3">
            <button className="bg-gray-300 px-3 py-1 rounded" onClick={closeModal}>Cancel</button>
            <button
              className={`${mode === "delete" ? "bg-red-600" : "bg-blue-600"} text-white px-3 py-1 rounded`}
              onClick={handleSubmit}
            >
              {mode === "delete" ? "Delete" : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}






export  function Eventmanag() {
  const [data, setData] = useState<any[]>([]);
  const [modal, setModal] = useState<{ mode: string; item?: any } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Search/filter
  const [search, setSearch] = useState({ title: "", category: "", author: "" });

  const fetchData = async () => {
    const res = await fetch("/api/auth/press-release");
    const json = await res.json();
    setData(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered data
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.title.toLowerCase()) &&
      item.category.toLowerCase().includes(search.category.toLowerCase()) &&
      item.author.toLowerCase().includes(search.author.toLowerCase())
  );

  // Paginated data
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );


  const handleSave = async (form: any) => {
    if (!modal) return;

    if (modal.mode === "create") {
      await fetch("/api/auth/press-release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else if (modal.mode === "edit") {
      await fetch(`/api/auth/press-release/${modal.item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else if (modal.mode === "delete") {
      await fetch(`/api/auth/press-release/${modal.item._id}`, {
        method: "DELETE",
      });
    }
    setModal(null);
    fetchData(); // refresh table
  };

  return (
    <div >
      {/* <PageBreadcrumb pageTitle="Press Release Management" /> */}
      {/* <div className="flex justify-end items-center mb-4">
        

        <button onClick={() => setModal({ mode: "create" })} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Create Press Release
        </button>
      </div> */}

      {/* Search/Filter */}
      <div className="flex gap-3 mb-4">
        {["title", "category", "author"].map((key) => (
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
            <th className="py-2 px-3 border">Author</th>
            <th className="py-2 px-3 border">Category</th>
            <th className="py-2 px-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.author}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button onClick={() => setModal({ mode: "edit", item })} className="bg-green-600 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => setModal({ mode: "delete", item })} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-600 text-white" : ""}`}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <PressReleaseModal
          mode={modal.mode}
          initialData={modal.item}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

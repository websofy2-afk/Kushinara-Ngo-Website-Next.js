"use client";
import { useEffect, useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { ColorRing } from "react-loader-spinner";
import PageBreadcrumb from "../common/PageBreadCrumb";

export default function DonationRecords() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<
    "name" | "phone" | "email" | "amount" | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/auth/donations");
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setDonations(result?.data || []);
      } catch (error) {
        console.error("Error fetching donation records:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFieldValue = (item: any, field: "name" | "phone" | "email" | "amount") => {
    switch (field) {
      case "name":
        return String(item.name ?? "").toLowerCase();
      case "email":
        return String(item.email ?? "").toLowerCase();
      case "phone": {
        const raw = String(item.phoneNumber ?? "");
        const digits = raw.replace(/\D/g, "");
        return digits === "" ? 0 : Number(digits);
      }
      case "amount": {
        const amt = item.amount ?? 0;
        const n = Number(amt);
        return Number.isNaN(n) ? 0 : n;
      }
    }
  };

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = donations.filter((d) => {
      const email = String(d.email ?? "").toLowerCase();
      const phone = String(d.phoneNumber ?? "");
      const txn = String(d.transactionId ?? "");
      if (!term) return true;
      return (
        email.includes(term) ||
        phone.includes(term) ||
        txn.toLowerCase().includes(term)
      );
    });

    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = getFieldValue(a, sortField);
        const bVal = getFieldValue(b, sortField);
        if (sortField === "phone" || sortField === "amount") {
          const na = Number(aVal);
          const nb = Number(bVal);
          if (na < nb) return sortOrder === "asc" ? -1 : 1;
          if (na > nb) return sortOrder === "asc" ? 1 : -1;
          return 0;
        }
        const sa = String(aVal ?? "");
        const sb = String(bVal ?? "");
        if (sa < sb) return sortOrder === "asc" ? -1 : 1;
        if (sa > sb) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [donations, searchTerm, sortField, sortOrder]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / recordsPerPage));

  const exportToCSV = () => {
    const csvRows = [
      ["Si. No.", "Name", "Phone No.", "Email", "Address", "Amount", "transactionId", "Refrence No."],
      ...filteredData.map((d, i) =>
         [i + 1, d.name, d.phoneNumber, d.email, d.address, d.amount, d.transactionId, d.refrenceNumber]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "donation_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (field: "name" | "phone" | "email" | "amount") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div className="p-8">
      <PageBreadcrumb pageTitle="Donation Records" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Email, Phone Or Transaction Id"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded-lg w-full sm:w-[21em] focus:ring focus:ring-blue-300 outline-none"
          />
        </div>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center text-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#2563eb', '#2563eb', '#2563eb', '#2563eb', '#2563eb']}
          />
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center text-gray-500">No matching records found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Si. No.
                </th>

                <th
                  onClick={() => handleSort("name")}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    Name
                    <ArrowUpDown
                      className={`w-4 h-4 transition-transform ${sortField === "name"
                        ? sortOrder === "asc"
                          ? "rotate-180 text-blue-600"
                          : "text-blue-600"
                        : "text-gray-400"
                        }`}
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("phone")}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    Ph. No.
                    <ArrowUpDown
                      className={`w-4 h-4 transition-transform ${sortField === "phone"
                        ? sortOrder === "asc"
                          ? "rotate-180 text-blue-600"
                          : "text-blue-600"
                        : "text-gray-400"
                        }`}
                    />
                  </div>
                </th>

                <th
                  onClick={() => handleSort("email")}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    Email
                    <ArrowUpDown
                      className={`w-4 h-4 transition-transform ${sortField === "email"
                        ? sortOrder === "asc"
                          ? "rotate-180 text-blue-600"
                          : "text-blue-600"
                        : "text-gray-400"
                        }`}
                    />
                  </div>
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 select-none">
                  <div className="flex items-center gap-1">Transaction Id</div>
                </th>

                <th
                  onClick={() => handleSort("amount")}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    Amount
                    <ArrowUpDown
                      className={`w-4 h-4 transition-transform ${sortField === "amount"
                        ? sortOrder === "asc"
                          ? "rotate-180 text-blue-600"
                          : "text-blue-600"
                        : "text-gray-400"
                        }`}
                    />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentRecords.map((record, index) => (
                <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {(currentPage - 1) * recordsPerPage + index + 1}.
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.transactionId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{record.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white cursor-pointer hover:bg-gray-100"
                  }`}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 cursor-pointer"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

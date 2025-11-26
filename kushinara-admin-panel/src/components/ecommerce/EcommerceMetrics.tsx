"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import { IndianRupee, Users } from "lucide-react";

export const EcommerceMetrics = () => {



  const [donations, setDonations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<"email" | "amount" | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const recordsPerPage = 10;
  
    // Fetch data from API
    useEffect(() => {
      const fetchDonations = async () => {
        try {
          const res = await fetch("/api/auth/donations");
          if (!res.ok) throw new Error("Failed to fetch");
          const result = await res.json();
          setDonations(result?.data || []);
          
  
          if (!res.ok) {
            throw new Error("Failed to fetch donation records");
          }
        } catch (error) {
          console.error("Error fetching donation records:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDonations();
    }, []);


    const donationAmount = donations.reduce((acc, itme)=>{
            return acc + itme.amount
    }, 0)


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5  md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl ">
           <Users />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Members
            </span>
            <h4 className="mt-2 font-bold text-title-sm dark:text-white/90">
              {donations.length}
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5  md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl ">
           <IndianRupee />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 ">
              Donations
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm ">
              {donationAmount}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};

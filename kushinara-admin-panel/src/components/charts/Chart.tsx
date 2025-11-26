// "use client"

// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
// import React, { useEffect, useState } from "react";
// import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";

// export default function Chart() {
//   return (
//     <div className="grid grid-cols-12 gap-4 md:gap-6">
//       <div className="col-span-12 space-y-6 xl:col-span-7">
//         <EcommerceMetrics />
//         {/* <MonthlySalesChart /> */}
//       </div>

//       <div className="col-span-12 xl:col-span-5">
//         <MonthlyTarget />
//       </div>

//       <div className="col-span-12">
//         {/* <StatisticsChart /> */}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import PageBreadcrumb from "../common/PageBreadCrumb";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {

 const [loading, setLoading] = useState(true);
     const [currentPage, setCurrentPage] = useState(1);
     const [searchTerm, setSearchTerm] = useState("");
     const [sortField, setSortField] = useState<"email" | "amount" | null>(null);
     const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
     const [donations, setDonations] = useState<any[]>([]);
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
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <h3 className="mb-5 text-lg font-semibold text-gray-800">
          <PageBreadcrumb pageTitle="Dashboard" />
        </h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Donations" value={donationAmount} />
        {/* <SummaryCard title="Active Projects" value="31" />
        <SummaryCard title="Beneficiaries" value="4,300+" />
        <SummaryCard title="Volunteers" value="57" /> */}
      </div>

      {/* Donation Chart */}
      {/* <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Donation Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={donationData}>
            <Line type="monotone" dataKey="amount" stroke="#0088FE" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div> */}

      {/* Category & Beneficiaries */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Project Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Beneficiary Impact</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={beneficiaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="people" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* Volunteer Hours */}
      {/* <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Top Volunteers (Hours Contributed)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={volunteerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <h3 className="text-gray-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}



export const donationData = [
  { month: "Jan", amount: 25000 },
  { month: "Feb", amount: 40000 },
  { month: "Mar", amount: 60000 },
  { month: "Apr", amount: 45000 },
  { month: "May", amount: 70000 },
  { month: "June", amount: 80000 },
  { month: "July", amount: 90000 },
];

export const categoryData = [
  { name: "Education", value: 12 },
  { name: "Health", value: 8 },
  { name: "Community Development", value: 5 },
  { name: "Awareness", value: 6 },
];

export const beneficiaryData = [
  { program: "Education", people: 2300 },
  { program: "Health Camps", people: 1200 },
  { program: "Awareness Drives", people: 800 },
];

export const volunteerData = [
  { name: "Asha", hours: 35 },
  { name: "Rohit", hours: 28 },
  { name: "Meena", hours: 20 },
];

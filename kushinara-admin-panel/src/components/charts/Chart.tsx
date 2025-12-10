"use client";
import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";

export default function Dashboard() {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const [donations, setDonations] = useState<any[]>([]);
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
         } 
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         catch (error) {
           console.error("Error fetching donation records:", error);
         }
       };
       fetchDonations();
     }, []);
 
     const donationAmount = donations.reduce((acc, itme)=>{
             return acc + itme.amount
     }, 0)

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      <h3 className="mb-5 text-lg font-semibold text-gray-800">
          <PageBreadcrumb pageTitle="Dashboard" />
        </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Donations" value={donationAmount} />
      </div>
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

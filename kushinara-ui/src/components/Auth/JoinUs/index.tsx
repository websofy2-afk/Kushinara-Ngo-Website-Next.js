"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Layout/Header/Logo"
import Loader from "@/components/Common/Loader";
import toast, { Toaster } from 'react-hot-toast';
import { useJoinUs } from "@/app/context/JoinUsContext";

const JoinUs = ({ joinInOpen }: { joinInOpen?: any }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {closeJoinUs } = useJoinUs()

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
    });

    const gender = ["Male", "Female", "Prefer Not to Say"];

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleJoinUs = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/auth/joinus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
            toast.success("Successfull Join us! Thank You");
            setLoading(false);
            router.push("/");
        } else {
            toast.error(data.message);
            setLoading(false);
        }
        setTimeout(() => {
            closeJoinUs();
        }, 1200);
    };
    return (
        <>
            <div className="mb-6 mx-auto text-center flex items-center justify-center">
                <Logo />
            </div>
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                Join Us Free
            </h2>

            <span className="z-1 relative my-4 block text-center">
                <Toaster />
            </span>
            <form
                onSubmit={handleJoinUs}
                className="w-full max-w-3xl mx-auto bg-white dark:bg-dark p-6 sm:p-8 rounded-xl shadow-md space-y-6"
            >

                <div className="flex flex-col md:flex-row gap-6">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-1/2">
                        <label className="text-gray-600 text-sm min-w-[100px]">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="flex-1 rounded-md border placeholder:text-gray-400 border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-base text-dark dark:text-white outline-none focus:border-primary transition"
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-1/2">
                        <label className="text-gray-600 text-sm min-w-[100px]">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"

                            value={form.email}
                            onChange={handleChange}
                            className="flex-1 rounded-md border placeholder:text-gray-400 border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-base text-dark dark:text-white outline-none focus:border-primary transition"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-1/2">
                        <label className="text-gray-600 text-sm min-w-[100px]">Phone</label>
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Phone Number"
                            value={form.mobile}
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                if (numericValue.length <= 10) {
                                    handleChange({ target: { name: "mobile", value: numericValue } });
                                }
                            }}
                            onKeyDown={(e) => {
                                if (
                                    !/[0-9]/.test(e.key) && !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            maxLength={10}
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            className="flex-1 rounded-md border placeholder:text-gray-400 border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-base text-dark dark:text-white outline-none focus:border-primary transition"
                            required
                        />
                    </div>


                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-1/2">
                        <label className="text-gray-600 text-sm min-w-[100px]">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            placeholder="Date of Birth"
                            className="flex-1 rounded-md border placeholder:text-gray-400 border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-base text-dark dark:text-white outline-none focus:border-primary transition"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label className="text-gray-600 text-sm min-w-[100px]">Gender</label>
                    <div className="flex flex-wrap gap-6">
                        {gender.map((option) => (
                            <label
                                key={option}
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value={option}
                                    checked={form.gender === option}
                                    onChange={handleChange}
                                    required
                                    className="accent-primary cursor-pointer"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer sm:w-auto mx-auto items-center justify-center rounded-md border border-primary bg-primary hover:bg-darkprimary px-8 py-3 text-base text-white transition duration-300 ease-in-out"
                    >
                        Join Now {loading && <Loader />}
                    </button>
                </div>
            </form>
        </>

    );
};

export default JoinUs;
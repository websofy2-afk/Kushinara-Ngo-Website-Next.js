"use client";
import DonationFormContext from "@/app/context/donationContext";
import { Loader } from "lucide-react";
import { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";

export default function RazorpayButton() {
    const donationInfo = useContext(DonationFormContext);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        refrenceNumber: "",
        amount: 0,
    });

    const loadRazorpayScript = () => {
        return new Promise<void>((resolve, reject) => {
            if ((window as any).Razorpay) return resolve();
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
            document.body.appendChild(script);
        });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePay = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await loadRazorpayScript();
            const amount = Math.round(form.amount * 100);
            const res = await fetch("/api/auth/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Order creation failed");

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,
                name: "Buddh Bhumi Kusinara Charitable Trust",
                description: "The Buddh Bhumi Kusinara Cultural & Health Support NGO offers a curated collection of products designed to reflect our values: culture, education, health, and awareness. All proceeds directly support our charitable initiatives and development programs",
                handler: async function (response: any) {
                    const verify = await fetch("/api/auth/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...form, ...response }),
                    });

                    if (verify.ok) {
                        toast.success("✅ Payment Successful!");
                        donationInfo?.setIsDonationOpen(false);
                    }
                },
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phoneNumber,
                },
                theme: { color: "#920c77" },
            };
            const rzp = new (window as any).Razorpay(options)
            rzp.open();
        } catch (err: any) {
            toast.error(err.message || "❌ Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handlePay}>
                <div className="max-h-[55vh] overflow-y-auto pr-2">
                    <div className="mb-[22px]">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={form.name}
                            required
                            onChange={handleChange}
                            className="w-full rounded-md border placeholder:text-gray-400 bg-transparent px-5 py-3 text-base text-dark focus:border-primary"
                        />
                    </div>

                    <div className="mb-[22px]">
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={form.phoneNumber}
                            required
                            onChange={handleChange}
                            className="w-full rounded-md border placeholder:text-gray-400 bg-transparent px-5 py-3 text-base text-dark focus:border-primary"
                        />
                    </div>

                    <div className="mb-[22px]">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-md border placeholder:text-gray-400 bg-transparent px-5 py-3 text-base text-dark focus:border-primary"
                        />
                    </div>

                    <div className="mb-[22px]">
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full rounded-md border placeholder:text-gray-400 bg-transparent px-5 py-3 text-base text-dark focus:border-primary"
                        />
                    </div>

                    <div className="mb-[22px]">
                        <input
                            type="text"
                            placeholder="Reference Number"
                            name="refrenceNumber"
                            value={form.refrenceNumber}
                            onChange={handleChange}
                            className="w-full rounded-md border placeholder:text-gray-400 bg-transparent px-5 py-3 text-base text-dark focus:border-primary"
                        />
                    </div>

                    <div className="mb-[22px]">
                        <input
                            type="number"
                            placeholder="Donation Amount"
                            name="amount"
                            required
                            min={1}
                            value={form.amount}
                            onChange={handleChange}
                            className="w-full rounded-md border placeholder:text-gray-400 bg-transparent px-5 py-3 text-base text-dark focus:border-primary"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary hover:bg-darkprimary px-8 py-3 text-base text-white transition"
                >
                    {loading ? (
                        <>Processing... <Loader className="animate-spin ml-2" /></>
                    ) : (
                        <>Pay ₹ {form.amount}</>
                    )}
                </button>
            </form>
        </>
    );
}

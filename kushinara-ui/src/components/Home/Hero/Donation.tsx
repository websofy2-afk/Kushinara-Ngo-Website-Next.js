"use client";
import Logo from "@/components/Layout/Header/Logo";
import RazorpayButton from "@/components/Home/Hero/RazorPay";

export function Donation() {
  return (
    <>
      <div className="mb-7 mx-auto text-center sm:max-w-[220px] md:max-w-[300px] lg:max-w-[400px]">
        <Logo />
      </div>

      <h2 className="text-xl font-semibold mb-4 text-title">Donate Now</h2>
      <RazorpayButton />
    </>

  );
}

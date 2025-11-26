import GridShape from "@/components/common/GridShape";
import {  MoveLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";


export const metadata: Metadata = {
  title: "Not Found - 404 | Buddh Bhumi Kushinara Charitable Trust",
   description: "Buddha Bhumi Kushinara Charitable Trust is a non-profit organization committed to fostering holistic growth through initiatives in Culture, Education, Health, and Awareness.",
};

export default function NotFound() {
  return (
    <div className="relative flex flex-col bg-brand-950 items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto flex justify-center items-center flex-col w-full max-w-[242px] text-center sm:max-w-[70em]">
        <h1 className="mb-8 font-bold text-gray-200 text-title-md xl:text-title-2xl">
          Page Not Found - 404
        </h1>

        <Image
          src="/images/error/404-dark.svg"
          alt="404"
          className="block"
          width={472}
          height={152}
        />
        <p className="mt-10 mb-6 text-base text-gray-200 sm:text-lg">
          We can’t seem to find the page you are looking for!
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
        >
          <MoveLeft className="mr-3" />
          Back to Home Page
        </Link>
      </div>
      <p className="absolute text-sm text-center text-gray-200 -translate-x-1/2 bottom-6 left-1/2">
        Buddh Bhumi Kushinara Charitable Trust <br />
        (Focused on Culture, Education, Health, and Awareness)
      </p>
    </div>
  );
}

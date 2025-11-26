"use client";

import { useJoinUs } from "@/app/context/JoinUsContext";
import React from "react";

interface JoinUsButtonProps {
  isMobile?: boolean;
  className?: string;
}

const JoinNow: React.FC<JoinUsButtonProps> = ({ isMobile = false, className = "" }) => {
  const { openJoinUs } = useJoinUs();
  return (
    <button
      onClick={openJoinUs}
      className={`${className} ${
        isMobile
          ? "w-full border border-primary text-primary rounded-lg py-2 hover:bg-primary hover:text-white transition"
          : "bg-error text-sm hover:bg-error/90 text-white px-4 py-3.5 leading-none rounded-lg font-medium text-nowrap"
      } cursor-pointer`}
    >
      Join Us
    </button>
  );
};

export default JoinNow;

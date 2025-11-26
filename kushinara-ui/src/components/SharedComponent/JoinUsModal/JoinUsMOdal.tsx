"use client";

import React, { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import JoinUs from "@/components/Auth/JoinUs"; // your existing form component
import { useJoinUs } from "@/app/context/JoinUsContext";

const JoinUsModal = () => {
  const { isJoinUsOpen, closeJoinUs } = useJoinUs();

  console.log("isJoinUsOpen from modal component --> ", isJoinUsOpen)

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeJoinUs();
      }
    };
    if (isJoinUsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isJoinUsOpen]);

  if (!isJoinUsOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white dark:bg-dark rounded-2xl shadow-lg px-6 py-8"
      >
        <button
          onClick={closeJoinUs}
          className="absolute top-4 right-4 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
        >
          <Icon icon="ic:round-close" className="text-2xl" />
        </button>
        <JoinUs />
      </div>
    </div>
  );
};

export default JoinUsModal;

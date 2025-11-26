"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { ChevronDown, LogOut, UserRoundPen } from "lucide-react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        const res = await fetch(`/api/auth/user-profile/get-user?email=${email}`);
        const data = await res.json();
        setUser({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
        })
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer text-gray-700 dropdown-toggle"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <Image
            width={44}
            height={44}
            src="/images/user/user.jpg"
            alt="User"
          />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{user.firstName} {user.lastName}  </span>
        <ChevronDown className={`stroke-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm">
            {user.firstName} {user.lastName}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500">
            {user.email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700"
            >
              <UserRoundPen />
              Edit profile
            </DropdownItem>
          </li>
        </ul>
        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700">
          <LogOut />
          Sign Out
        </Link>
      </Dropdown>
    </div>
  );
}

"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { Icon } from "@iconify/react/dist/iconify.js";
import JoinUs from "@/components/Auth/JoinUs";
import LogoBar from "./Logobar";
import JoinNow from "@/components/SharedComponent/JoinNow";
import { useJoinUs } from "@/app/context/JoinUsContext";
import { X } from "lucide-react";
import DonationFormContext from "@/app/context/donationContext";
import { Donation } from "@/components/Home/Hero/Donation";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const { isJoinUsOpen, openJoinUs, closeJoinUs } = useJoinUs();
  const info = useContext(DonationFormContext)
  const donationInfo = useContext(DonationFormContext)
  const joinUsRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (joinUsRef.current && !joinUsRef.current.contains(event.target as Node)) {
      closeJoinUs()
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && navbarOpen) {
      setNavbarOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isJoinUsOpen]);

  useEffect(() => {
    document.body.style.overflow = isJoinUsOpen || navbarOpen ? "hidden" : "";
  }, [isJoinUsOpen, navbarOpen]);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  return (
    <header className={`fixed bg-white top-0 z-50 w-full transition-all ${sticky ? "shadow-lg" : "shadow-none"}`}>
      <div className="sm:bg-linear-to-r bg-linear-to-l md:from-primary md:to-secondary lg:py-0 py-2">
        <div className="container  mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) flex items-center justify-between px-4">
          <div className="lg:hidden block">
            <Logo />
          </div>
          <nav className="hidden lg:flex grow items-center justify-start">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center space-x-4 relative top-[1px]">
            <div className="hidden lg:block"><JoinNow /></div>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden cursor-pointer p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            </button>
          </div>
        </div>
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-midnight_text">Menu</h2>
            <button onClick={() => setNavbarOpen(false)} aria-label="Close mobile menu" className="cursor-pointer">
              <X />
            </button>
          </div>
          <nav className="flex flex-col items-start p-4">
            {headerData.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="mt-4 flex flex-col space-y-4 w-full">
              <JoinNow isMobile />
            </div>

            <div className="mt-4 flex flex-col space-y-4 w-full">
              <button onClick={() => info?.setIsDonationOpen(true)} className="w-full border border-primary cursor-pointer text-primary rounded-lg py-2 hover:bg-primary hover:text-white transition">
                Donate Now
              </button>
            </div>
          </nav>
        </div>
      </div>
      <LogoBar />
      {isJoinUsOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8">
          <div
            ref={joinUsRef}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[50em] rounded-2xl bg-white px-5 sm:px-8 py-8 sm:py-12 text-center shadow-lg"
          >
            <button
              onClick={() => {closeJoinUs(); setNavbarOpen(false)}}
              className="absolute top-1 sm:top-6 right-3 p-2 rounded-full bg-transparent hover:bg-gray-200 transition"
              aria-label="Close Join Us Modal"
            >
              <Icon icon="ic:round-close" className="text-2xl cursor-pointer text-gray-700" />
            </button>
            <JoinUs />
          </div>
        </div>
      )}

       {donationInfo?.isDonationOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 m-0!">
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center">
                  <button
                    onClick={() => {donationInfo?.setIsDonationOpen(false)
                      setNavbarOpen(false)
                    }}
                    className=" hover:bg-gray-200 p-1 rounded-full absolute -right-3 mr-8 top-10"
                    aria-label="Close Sign In Modal"
                  >
                    <Icon icon="ic:round-close" className="cursor-pointer text-2xl" />
                  </button>
                  <Donation />
                </div>
              </div>
            )}
    </header>
  );
};

export default Header;


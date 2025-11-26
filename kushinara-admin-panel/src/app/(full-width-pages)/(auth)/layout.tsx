import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 sm:p-0">
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col sm:p-0">
          {children}

          <div className="lg:w-1/2 w-full h-full bg-brand-950 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">

              <GridShape />
              <div className="flex flex-col items-center">
                <Link href="/" className="block">
                  <Image
                    width={231}
                    height={48}
                    src="/images/logo/auth-logo.png"
                    alt="Logo"
                  />
                </Link>
                <p className="text-center text-gray-200">
                  Buddh Bhumi Kushinara Charitable Trust
                  <br />
                  (Focused on Culture, Education, Health, and Awareness)
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

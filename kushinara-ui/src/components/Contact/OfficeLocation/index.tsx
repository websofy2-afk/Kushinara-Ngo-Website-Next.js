import React from "react";
import Link from "next/link";

const Location = () => {
  return (
    <>
      <section className=" bg-cardbg py-16">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="">
            <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-primary pb-11">
              <div className="col-span-3">
                <h2 className="text-title text-[40px] leading-tight font-bold">Kushinagar<br /> head office</h2>
              </div>
              <div className="col-span-3">
                <p className="sm:text-2xl text-xl text-IceBlue font-normal max-w-64 leading-10 text-description">4292 Kushinagar-274304(UP)</p>
              </div>
              <div className="col-span-3">
                <Link href="mailto:info@gmail.com" className="sm:text-2xl text-xl text-description ">  Email <span className="underline font-medium">info@gmail.com</span></Link>
                <Link href="tel:7030513954" className="sm:text-2xl text-xl text-description flex items-center gap-2 hover:text-primary w-fit">Call <span className="text-description font-medium">+91-7030513954</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;

"use client";
import { helpdata } from "@/app/api/data";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Help = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center" data-aos="fade-right" data-aos-delay="100">
          <h2
            className="text-2xl md:text-4xl font-extrabold mb-3
            text-title"
          >
            How Can You Help Us?
          </h2>

          <p className="text-description mt-6 text-base md:text-xl  max-w-2xl mx-auto">
            You can support us by donating, volunteering your time, or providing
            food supplies. <br className="lg:block hidden" /> Every effort makes
            a difference!
          </p>
        </div>

        {/* Help Cards */}
        <div className="mt-12 grid grid-cols-12 gap-8">
          {helpdata.map((item, index) => (
            <div
              key={index}
              className="md:col-span-4 sm:col-span-6 col-span-12 text-center 
              flex flex-col gap-5 justify-center p-6 rounded-2xl
              bg-cardbg shadow-lg shadow-primary/30
              backdrop-blur-sm"
              data-aos="fade-up"
              data-aos-delay={`${index * 150}`}
            >
              <div className="flex justify-center">
                {/* <Image
                  src={item.icon}
                  alt="icon"
                  width={64}
                  height={64}
                  className="transition-transform duration-300 hover:scale-110"
                /> */}

                {/* <Image
                            src={item.icon}
                            alt="icon"
                            width={64}
                            height={64}
                            style={{ width: "auto", height: "auto" }} // ✅ prevents warning
                            className="max-w-[64px] max-h-[64px] transition-transform duration-300 hover:scale-110"
                /> */}

                <Image
                  src={item.icon}
                  alt="404"
                  width={64}
                  height={64}             
                  style={{ objectFit: "cover" }}
                  className="max-w-[64px] max-h-[64px] transition-transform duration-300 hover:scale-110"
                />

              </div>
              <h4 className="text-lg font-semibold text-title">
                {item.title}
              </h4>
              <p className="text-description text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Border Type 2 at Bottom */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[80px]"
        >
          <path
            d="M0,0V46.29c47.85,22.48,103.78,29.26,158.73,13.79C273,41.85,335.39,7,419,0c103-8.19,192,43,292,54s197-35,292-47c92-11.42,178,8.29,277,35V0Z"
            className="fill-yellow-200 dark:fill-gray-800"
          ></path>
        </svg>
      </div> */}
    </section>
  );
};

export default Help;

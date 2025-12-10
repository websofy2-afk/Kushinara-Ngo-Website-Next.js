"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center justify-center bg-cardbg py-8 sm:py-20 px-6 md:px-12"
      data-aos="fade-up"
    >
      <h1
        className="text-3xl text-title md:text-5xl font-extrabold text-center 
      "
        data-aos="zoom-in"
      >
        About Buddha Bhumi Kushinara Charitable Trust
      </h1>
      <p
        className="mt-6 max-w-5xl text-justify text-description text-base md:text-xl leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Buddha Bhumi Kushinara Charitable Trust is a non-profit organization committed to fostering holistic growth through initiatives in{" "}
        <span className="font-semibold text-purple-700 dark:text-purple-300">Culture</span>,{" "}
        <span className="font-semibold text-green-700 dark:text-green-300">Education</span>,{" "}
        <span className="font-semibold text-orange-600 dark:text-orange-300">Health</span>, and{" "}
        <span className="font-semibold text-yellow-600 dark:text-yellow-300">Awareness</span>.
        <br />
        Inspired by the timeless teachings of Lord Buddha, we strive to build a compassionate and inclusive society where every individual has the opportunity to learn, live healthily, and contribute meaningfully to the community. Our mission is to preserve and promote cultural heritage, empower underprivileged communities through education, ensure access to quality healthcare, and raise awareness on issues that shape a better tomorrow. With compassion as our foundation and enlightenment as our goal, we continue to serve humanity — nurturing peace, wisdom, and sustainable development for all.
      </p>
      <button
        onClick={() => router.push("/about-us")}
        data-aos="zoom-in"
        data-aos-delay="500"
        className="mt-8 
        text-error text-sm cursor-pointer font-semibold border border-error py-4 px-7 rounded-md ml-8 hover:bg-error hover:text-white"
      >
        Learn More About Us
      </button>
    </section>
  );
};

export default AboutUs;

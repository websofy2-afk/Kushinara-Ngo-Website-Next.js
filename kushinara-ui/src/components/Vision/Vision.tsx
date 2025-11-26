"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { HeartHandshake, Target, Lightbulb, Users, Quote } from "lucide-react";
import { useRouter } from "next/navigation";

const Vision = () => {
    const router = useRouter();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const focusAreas = [
        {
            title: "Education for All",
            description:
                "We aim to ensure quality education reaches every child, nurturing curiosity, creativity, and knowledge for a brighter future.",
            image:
                "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=60",
        },
        {
            title: "Healthcare and Well-being",
            description:
                "Promoting holistic health through awareness programs, free health camps, and mental wellness initiatives in rural areas.",
            image:
                "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&auto=format&fit=crop&q=60",
        },
        {
            title: "Women Empowerment",
            description:
                "Empowering women through skill training, self-employment opportunities, and education to create an equal and inclusive society.",
            image:
                "https://images.unsplash.com/photo-1598801942765-0b0190054f77?w=600&auto=format&fit=crop&q=60",
        },
        {
            title: "Environmental Protection",
            description:
                "Building awareness about sustainable living, tree plantation, and clean energy to protect our planet for future generations.",
            image:
                "https://plus.unsplash.com/premium_photo-1663061406443-48423f04e73d?w=600&auto=format&fit=crop&q=60",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-16 ">
            {/* Header Section */}
            <div className="text-center max-w-3xl" data-aos="fade-up">
                <h2 className="mt-2 mb-3 text-2xl md:text-4xl font-extrabold text-title">
                    Unveiling Our Vision, Identity and Values
                </h2>
                <p className="text-description mt-6 text-base md:text-xl  max-w-2xl mx-auto">
                    At{" "}
                    <span className="font-semibold text-[#16a34a]">
                        Buddha Bhumi Kushinara Charitable Trust
                    </span>
                    , we are dedicated to serving humanity through compassion, education,
                    sustainability, and community upliftment — inspired by the teachings
                    of Buddha.
                </p>
            </div>

            {/* Icon Row */}
            <div
                data-aos="zoom-in-up"
                className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8 rounded-3xl shadow-lg w-full max-w-5xl"
            >
                {[
                    // { icon: <HeartHandshake size={32} />, label: "Compassion" },
                    // { icon: <Target size={32} />, label: "Focus" },
                    // { icon: <Lightbulb size={32} />, label: "Innovation" },
                    // { icon: <Users size={32} />, label: "Community" },
                    { title: "Education", icon: "📚" },
                    { title: "Healthcare", icon: "🏥" },
                    { title: "Women Empowerment", icon: "👩‍🦱" },
                     { title: "Environment", icon: "🌍" },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full w-12 h-12  flex justify-center items-center  shadow-md bg-error/90 ">
                            {item.icon}
                        </div>
                        <p className="font-medium text-center">{item.title}</p>
                    </div>
                ))}
            </div>

           

            {/* Vision & Mission */}
            {/* <div
                data-aos="fade-up "
                className="w-full max-w-6xl rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 bg-white"
            >
                <div className="p-10 flex flex-col items-start justify-center">
                    <h2 className="text-2xl font-bold text-[#8B5CF6] mb-3">Our Vision</h2>
                    <p className="text-description">
                        To build a compassionate and educated society through sustainable
                        social initiatives, empowering communities, and nurturing equality,
                        peace, and environmental consciousness.
                    </p>
                </div>
                <div className="p-10 flex flex-col items-start justify-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-bold text-[#f97316] mb-3">Our Mission</h2>
                    <p className="text-description">
                        To serve society by providing education, healthcare, and social
                        support; promoting moral values and holistic development; and
                        fostering human dignity and compassion across all communities.
                    </p>
                </div>
            </div> */}

            {/* Focus Areas */}
            <div className="mt-20 w-full max-w-7xl space-y-20">
                {focusAreas.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    >
                        <div className="flex-1">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={600}
                                height={400}
                                className="rounded-3xl object-cover w-full h-80 shadow-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <h3
                                className={`text-2xl ${index % 2 === 0 ? "text-[#16a34a]" : "text-[#8B5CF6]"
                                    } mb-3 font-semibold text-title`}
                            >
                                {item.title}
                            </h3>
                            <p className="text-description text-base leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative mt-20">
          
                <div
                    data-aos="zoom-in"
                    className="w-full max-w-4xl mx-auto text-center rounded-3xl shadow-2xl p-10 relative overflow-hidden 
    "
                >
                    <Quote className="absolute top-6 left-6 text-[#84cc16] w-10 h-10" />
                    <br />
                    <h3 className="text-2xl md:text-3xl font-semibold text-title leading-relaxed z-10 relative">
                        “Our vision is to create a compassionate, educated, and peaceful
                        society where every person lives with dignity, harmony, and purpose.”
                    </h3>
                    <p className="text-[#65a30d] dark:text-[#d9f99d] mt-6 font-medium text-lg">
                        – Buddha Bhumi Kusinara Charitable Trust
                    </p>
                    <Quote className="absolute bottom-6 right-6 rotate-180 text-[#84cc16] w-10 h-10" />
                </div>
            </div>

           {/* <div
                data-aos="zoom-in"
                className="mt-20 text-center flex flex-col items-center space-y-6"
            >
                <Image
                    src="https://buddhbhumi.org/images/logo/m-logo.png"
                    alt="NGO Logo"
                    width={140}
                    height={140}
                    className="rounded-full shadow-lg"
                />
                <p className="max-w-2xl text-description dark:text-gray-300">
                    Guided by the teachings of Buddha, we strive to bring light, love, and
                    peace to every corner of society through collective compassion.
                </p>
                <button
                    className="cursor-pointer bg-error hover:bg-error/90 text-white font-semibold px-6 py-3 rounded-full shadow-md"
                    onClick={() => router.push("/")}
                >
                    Know More About Us
                </button>
            </div> */}
        </div>
    );
};

export default Vision;

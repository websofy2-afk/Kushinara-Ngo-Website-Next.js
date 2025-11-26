"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const generateTeamData = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Member ${i + 1}`,
        title: ["CEO", "CTO", "Manager", "Developer", "Designer"][i % 5],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod.",
        img: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`,
    }));

const teamData = generateTeamData(12);

const testimonials = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    role: ["CEO", "CTO", "Manager", "Developer"][i % 4],
    img: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${i + 30}.jpg`,
    text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}));

export default function TeamPhotos() {
    const sliderRow1 = useRef<Slider>(null);
    const sliderRow2 = useRef<Slider>(null);

    const settingsRow1 = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 8000,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const settingsRow2 = { ...settingsRow1, rtl: true };

    const handleMouseEnter = (sliderRef: React.RefObject<Slider>) => {
        sliderRef.current?.slickPause();
    };

    const handleMouseLeave = (sliderRef: React.RefObject<Slider>) => {
        sliderRef.current?.slickPlay();
    };

    return (
        <>            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl  md:text-5xl font-extrabold text-title">
                            Meet Our Team
                        </h2>
                        <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                            Our team of experts is dedicated to bringing positive change to our community.
                        </p>
                    </div>
                    <Slider {...settingsRow1} ref={sliderRow1} className="mb-12">
                        {teamData.map((member) => (
                            <div key={member.id} className="px-4">
                                <div
                                    className="group perspective w-full h-72 md:h-80 cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(sliderRow1)}
                                    onMouseLeave={() => handleMouseLeave(sliderRow1)}
                                >
                                    <div className="relative w-full h-full transform-style-preserve-3d">
                                        {/* Front */}
                                        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl group-hover:rotate-y-180 duration-0">
                                            <Image
                                                src={member.img}
                                                alt={member.name}
                                                fill
                                                className="object-cover rounded-2xl"
                                            />
                                        </div>
                                        {/* Back */}
                                        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white shadow-xl flex flex-col items-center justify-center p-4 text-center duration-0 group-hover:rotate-y-0">
                                            <h3 className="text-lg font-bold text-title">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-subtitle">{member.title}</p>
                                            <p className="mt-2 text-description text-sm">
                                                {member.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    {/* Row 2: Left to Right */}
                    <Slider {...settingsRow2} ref={sliderRow2}>
                        {teamData.map((member) => (
                            <div key={member.id} className="px-4">
                                <div
                                    className="group perspective w-full h-72 md:h-80 cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(sliderRow2)}
                                    onMouseLeave={() => handleMouseLeave(sliderRow2)}
                                >
                                    <div className="relative w-full h-full transform-style-preserve-3d">
                                        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl group-hover:rotate-y-180 duration-0">
                                            <Image
                                                src={member.img}
                                                alt={member.name}
                                                fill
                                                className="object-cover rounded-2xl"
                                            />
                                        </div>
                                        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white shadow-xl flex flex-col items-center justify-center p-4 text-center duration-0 group-hover:rotate-y-0">
                                            <h3 className="text-lg font-bold text-title dark:text-white">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-subtitle">{member.title}</p>
                                            <p className="mt-2 text-description text-sm">
                                                {member.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
            <section className="text-center">
                <h2 className="text-3xl texttext-3xl  md:text-5xl font-extrabold 
          text-title mb-12">
                    Testimonials
                </h2>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 px-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="mb-6 break-inside-avoid bg-white/90  rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition transform"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={t.img}
                                    alt={t.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 text-left">
                                <p className="text-description text-sm">{t.text}</p>
                                <h3 className="mt-3 font-bold text-title">{t.name}</h3>
                                <p className="text-sm text-subtitle">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}





"use client"
import Image from "next/image";

import React, { FC, useEffect, useState } from "react";

interface HeroSubProps {
    title: string;
    description?: string;
    imageSrc?: string;
}

const HeroSub: FC<HeroSubProps> = ({ title, description, imageSrc }) => {

    const [imgSrc, setImgSrc] = useState<string | null>(null)

    useEffect(() => {
        setImgSrc(`/images/${imageSrc}`);
    }, [imageSrc]);

    return (
        <>
            <section className="relative lg:mt-40 h-60 sm:mt-44 mt-20">
                <div className="absolute inset-0 w-full h-full">
                    {
                        imgSrc &&
                        <Image
                            src={imgSrc}
                            alt={`Banner of ${title}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    }

                </div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative container mx-auto lg:max-w-[--breakpoint-xl] px-4 h-full flex flex-col justify-center">
                    <h2
                        className="text-white md:text-6xl text-4xl font-medium"
                        data-aos="fade-right"
                    >
                        {title}
                    </h2>

                    {description && (
                        <p
                            className="text-subtitle text-sm sm:text-base md:text-lg mt-2 sm:mt-3 md:mt-4 font-medium"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            {description}
                        </p>
                    )}
                </div>
            </section>
        </>

    );
};

export default HeroSub;


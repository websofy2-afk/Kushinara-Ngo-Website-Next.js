"use client"
import { Reviews } from "@/app/api/data";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NgoMember = () => {
    const settings = {
        autoplay: true,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 100,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <section className="py-16 bg-cardbg">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <h2 className=" text-center  
                text-2xl md:text-4xl font-extrabold mb-3
            text-title" data-aos="fade-left">
                    
                </h2>
                <p className="text-base text-center text-description mt-6 md:text-xl  lg:max-w-60% mx-auto">
                Our leaders drive Buddha Bhumi Kushinara Charitable Trust with dedication, inspiring initiatives in Culture, Education, Health, and Awareness!
                </p>
                <div className="mt-12">
                    <Slider {...settings}>
                        {Reviews.map((item, index) => (
                            <div key={index} className="px-3" data-aos="fade-up" data-aos-delay={`${index * 180}`}>
                                <div className="bg-white pt-12 pb-6 pr-16 pl-10 rounded-md relative">
                                    <div className="absolute bg-linear-to-r from-primary to-secondary py-2 pr-6 pl-24 top-11 left-0 flex">
                                        <div className="relative">
                                            <Image
                                                src={item.clientImg}
                                                alt={item.clientName}
                                                width={60}
                                                height={60}
                                                className="rounded-full absolute -top-4 -left-20"
                                            />
                                            <p className="text-white text-lg ">
                                                {item.clientName}
                                            </p>
                                        </div>
                                    </div>  
                                    <p className="text-base text-description mt-24">
                                        {item.review}
                                    </p>
                                    <h5 className="text-base pt-7 mt-7 relative before:content-[''] before:absolute before:w-28 before:h-px before:bg-border  before:top-0 before:left-0">
                                        {item.post}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default NgoMember;
"use client";
import Image from "next/image";;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const Testimonial = () => {
    const [testimonial, setTestimonial] = useState<any[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch("/api/auth/testimonial");
                if (!res.ok) throw new Error("Failed to fetch");
                const result = await res.json();
                setTestimonial(result?.data || []);
            } catch (error) {
                console.error("Error fetching donation records:", error);
            }
        };
        fetchNews();
    }, []);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                },
            },
        ],
    };

    return (
        <section className="pb-16">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <h2 className="mb-3
            text-2xl md:text-4xl font-extrabold
            text-title text-center 
           " data-aos="fade-left">
                    Your Support Can Transform Lives
                </h2>

                <p className="text-center leading-relaxed text-description mt-6 text-base md:text-xl mx-auto">
                    Supporting this initiative showed me the power of compassion. From improving medical care to<br className="lg:block hidden" /> empowering communities every small effort becomes part of a larger change!
                </p>
                <div className="mt-12">
                    <Slider {...settings}>
                        {testimonial?.map((item, index) => (
                            <div key={index} className="px-4">
                                <div className="bg-cardbg shadow-lg shadow-primary/30 group rounded-2xl overflow-hidden " data-aos="fade-up" data-aos-delay={`${(index) * 250}`}>
                                    <div className="overflow-hidden ">
                                        <Image
                                            src={item.image}
                                            alt="image"
                                            width={350}
                                            height={250}
                                            className="w-full h-auto group-hover:scale-110 duration-300"
                                        />
                                    </div>
                                    <div className="px-8 pt-8 pb-6 shadow-cause-shadow dark:shadow-darkmd">
                                        <h4 className="text-lg font-bold text-title group-hover:text-primary mb-4">
                                            {item.title}
                                        </h4>
                                        <p className="text-description text-base pb-8 ">
                                            {item.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Testimonial;
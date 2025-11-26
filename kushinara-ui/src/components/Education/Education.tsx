"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import Slider from "react-slick";
import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function EducationPage() {

    const [education, setEducation] = useState<any[]>([])
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (item: any) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsOpen(false);
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);


    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const res = await fetch("/api/auth/programme");
                if (!res.ok) throw new Error("Failed to fetch");
                const result = await res.json();
                setEducation(result?.data || []);
            } catch (error) {
                console.error("Error fetching donation records:", error);
            }
        };
        fetchEducation();
    }, []);

    const useCounter = (endValue: number, duration: number = 2000) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            let start = 0;
            const stepTime = Math.abs(Math.floor(duration / endValue));
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === endValue) clearInterval(timer);
            }, stepTime);
            return () => clearInterval(timer);
        }, [endValue, duration]);
        return count;
    };

    const stats = [
        { number: 123, label: "Available Subjects", color: "bg-green-500" },
        { number: 1234, label: "Online Courses", color: "bg-blue-500" },
        { number: 123, label: "Skilled Instructors", color: "bg-red-500" },
        { number: 1234, label: "Happy Students", color: "bg-yellow-500" },
    ];
    const features = [
        {
            icon: "🎓",
            title: "Skilled Instructors",
            desc: "Our expert instructors provide top-quality learning experiences.",
            color: "bg-blue-500",
        },
        {
            icon: "📜",
            title: "International Certificate",
            desc: "Earn globally recognized certificates to boost your career.",
            color: "bg-red-500",
        },
        {
            icon: "💻",
            title: "Online Classes",
            desc: "Flexible and interactive classes available anytime, anywhere.",
            color: "bg-yellow-500",
        },
    ];

    const testimonials = [
        {
            text: "This platform completely changed the way I learn! The instructors are amazing.",
            student: "Alex Johnson",
            course: "Web Design",
            image: "https://randomuser.me/api/portraits/men/40.jpg",
        },
        {
            text: "I love the flexibility and the support I get from the community!",
            student: "Sophie Lee",
            course: "Data Science",
            image: "https://randomuser.me/api/portraits/women/60.jpg",
        },
        {
            text: "Excellent content and real-world projects that helped me get my dream job.",
            student: "Michael Carter",
            course: "Python Development",
            image: "https://randomuser.me/api/portraits/men/61.jpg",
        },
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div>
            <section className="p-16 flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20">
                <div data-aos="fade-right" className="md:w-1/2 mb-10 md:mb-0">
                    <Image
                        src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Student"
                        width={500}
                        height={500}
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div data-aos="fade-left" className="md:w-1/2">
                    <h1 className="md:text-5xl font-extrabold mb-4 text-3xl text-title leading-tight">First Choice For Online Education Anywhere</h1>
                    <p className="text-description mb-6 leading-relaxed text-base md:text:xl">
                        Learn from the best instructors with interactive online courses. Enhance your skills and career prospects from the comfort of your home.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {stats.map((item, i) => {
                            const counter = useCounter(item.number, 1500 + i * 300);
                            return (
                                <div key={i} className={`${item.color} text-white p-4 text-center rounded-lg shadow-md`} data-aos="zoom-in">
                                    <h3 className="text-3xl md:text-4xl font-bold">{counter}</h3>
                                    <p className="text-sm md:text-sm mt-1 uppercase font-semibold">{item.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className=" pb-16 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20">

                <div data-aos="fade-right" className="md:w-1/2 pr-2">
                    <h4 className="text-error font-bold uppercase tracking-wide mb-2 ">Why Choose Us</h4>
                    <h2 className="md:text-4xl font-extrabold mb-4 text-2xl text-title">Why You Should Start Learning With Us?</h2>
                    <p className="text-description mb-8 leading-relaxed text-base">
                        We believe in transforming education through innovation and quality content. Join thousands of learners growing their skills every day.
                    </p>

                    <div className="space-y-6">
                        {features.map((item, i) => (
                            <div key={i} className="flex items-start" data-aos="fade-up">
                                <div className={`${item.color} text-white text-3xl p-4 rounded-lg mr-4`}>{item.icon}</div>
                                <div>
                                    <h3 className="text-title font-bold mb-1">{item.title}</h3>
                                    <p className="text-subtitle dark:text-gray-300">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div data-aos="fade-left" className="md:w-1/2 mb-10 md:mb-0">
                    <Image
                        src="https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Learning"
                        width={500}
                        height={500}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>
            <section className=" px-6 md:px-20 text-center">
                <h4 className="text-error font-bold uppercase tracking-wide mb-2">
                    EDUCATION IS EMPOWERMENT
                </h4>
                <h2 className="mb-10 text-2xl md:text-4xl font-extrabold text-title">
                    STORIES OF CHANGE
                </h2>

                <Slider {...sliderSettings}>
                    {education?.map((item, i) => (
                        <div key={item._id}>
                            {item.type === "Education" && (
                                <div className="p-4 sm:p-6 md:p-6 lg:p-8">
                                    <div className="bg-cardbg rounded-2xl shadow-lg overflow-hidden flex flex-col items-center py-6 px-4 sm:px-6 hover:scale-105 transition duration-500">
                                        <Image
                                            src={item.image}
                                            alt={item.text}
                                            width={150}
                                            height={150}
                                            className="rounded-full mb-4 object-cover"
                                        />
                                        <h3 className="text-xl font-semibold mb-1 text-title">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-subtitle mb-3">{item.text}</p>
                                        <button
                                            onClick={() => openModal(item)}
                                            className="text-primary text-sm cursor-pointer font-semibold border border-primary py-4 px-7 rounded-md ml-8 hover:bg-primary hover:text-white"
                                        >
                                            Read More...
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </Slider>
                {isOpen && selectedItem && (
                    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[500px] p-6 relative animate-fadeIn">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 cursor-pointer right-4 text-gray-600 hover:text-red-500 text-xl"
                            >
                                ✕
                            </button>
                            <div className="flex flex-col items-center text-center">
                                <Image
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    width={160}
                                    height={160}
                                    className="rounded-full mb-4 object-cover"
                                />
                                <h2 className="text-2xl font-semibold text-title mb-2">
                                    {selectedItem.title}
                                </h2>
                                <h3 className="text-sm text-subtitle mb-2">
                                    {selectedItem.text || "Education Initiative"}
                                </h3>
                                <p className="text-description text-sm mb-3 text-justify">
                                    {selectedItem.description || selectedItem.detail}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <section className="px-6 pt-16 md:px-20 ">
                <h2 data-aos="fade-up" className="text-2xl text-title md:text-4xl font-extrabold mb-10 text-center">What Say Our Students</h2>
                <div className="grid md:grid-cols- gap-10 items-center">
                    <div data-aos="fade-right">
                        <p className="text-lg text-justify text-description leading-relaxed">
                            We take pride in helping our students and community members achieve their learning and personal growth goals. Hear from some of them below — their success stories reflect our shared mission of promoting culture, education, health, and awareness.
                        </p>
                    </div>

                    <div data-aos="fade-left" className="relative bg-cardbg  rounded-2xl shadow-lg p-8">
                        <p className="italic text-lg mb-6 text-description">“{testimonials[currentTestimonial].text}”</p>
                        <div className="flex items-center gap-4">
                            <Image src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].student} width={60} height={60} className="rounded-full object-cover" />
                            <div>
                                <h4 className="font-bold text-title ">{testimonials[currentTestimonial].student}</h4>
                                <p className="text-sm text-subtitle ">{testimonials[currentTestimonial].course}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-3 right-4 flex gap-2">
                            <button onClick={prevTestimonial} className="p-2 cursor-pointer bg-gray-200  rounded-full hover:bg-gray-300">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button onClick={nextTestimonial} className="p-2 bg-gray-200 cursor-pointer rounded-full hover:bg-gray-300">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                </div>
            </section>
        </div>
    );
}




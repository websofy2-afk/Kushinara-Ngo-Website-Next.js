"use client";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    Heart,
    BookOpen,
    Globe2,
    Users,
    Lightbulb,
} from "lucide-react";
import Vision from "../Vision/Vision";
import { useRouter } from "next/navigation";
import JoinNow from "../SharedComponent/JoinNow";

const AboutUsDetails = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main
            className="min-h-screen"
        >
            <section
                className="w-full flex flex-col items-center justify-center py-16 px-6 md:px-12"
                data-aos="fade-up"
            >
                <h1
                    className="text-3xl text-title md:text-5xl font-extrabold text-center leading-tight"
                    data-aos="zoom-in"
                >
                    Serving Humanity through Culture, Education, Health, and Awareness
                </h1>
                <p
                    className="mt-6 max-w-5xl text-justify text-description text-base md:text-xl leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    At Buddh Bhumi Kushinara Charitable Trust, we believe that true progress is achieved when compassion meets action.
                    Our mission is to serve humanity by nurturing the values of culture, education, health, and awareness — the four pillars that form the foundation of a peaceful, progressive, and inclusive society.
                    <br />
                    We work tirelessly to preserve and promote India’s rich cultural heritage, ensuring that future generations remain connected to their roots while embracing the values of harmony and respect.
                    Through our educational initiatives, we strive to provide quality learning opportunities to children and youth, empowering them with the knowledge and confidence to shape their own destinies.<br />
                    In the field of health, our trust conducts medical camps, awareness drives, and wellness programs to promote preventive care and ensure access to essential healthcare for those in need.
                </p>
            </section>

            <AboutInfo />
            <Goals />
            <Vision />
            <section className="text-center px-6 md:px-12 " data-aos="fade-up">
                <h2 className="md:text-4xl mb-8 mt-2 text-2xl font-extrabold text-title">The Founder’s Story</h2>
                <p className=" text-justify mx-auto leading-relaxed
                mt-6 max-w-5xl  text-description text-base md:text-xl">
                    The Buddh Bhumi Kusinara Charitable Trust was born from a vision of
                    peace, equality, and education for all. Our founder, inspired by the
                    eternal teachings of Lord Buddha, dedicated their life to cultivating
                    wisdom, compassion, and cultural harmony in society. Starting from a
                    small initiative in the sacred land of Kushinagar, the trust has
                    grown into a beacon of hope for countless individuals — organizing
                    free medical camps, cultural programs, and education awareness drives
                    that connect people from every walk of life. Our journey continues,
                    guided by the principles of selfless service and the belief that
                    “service to humanity is the greatest service to divinity.”
                </p>
            </section>
            <section
                className="pt-16 text-center"
                data-aos="fade-up"
            >
                <h2 className="mb-12 text-2xl md:text-4xl font-extrabold text-title">
                    Our Partners
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {[1, 2, 3, 4, 5, 6,].map((i) => (
                        <div
                            key={i}
                            className="relative overflow-hidden rounded-2xl group shadow-md hover:shadow-xl transition-all"
                            data-aos="zoom-in"
                            data-aos-delay={i * 150}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBwYXJ0bmVyfGVufDB8fDB8fHww"
                                alt={`Partner ${i}`}
                                width={400}
                                height={300}
                                className="object-cover w-full h-64 group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center p-4 transition-all">
                                <p className="text-white text-xl font-semibold">
                                    Partner Organization {i}
                                </p>
                                <p className="text-gray-200 text-sm mt-2 max-w-[250px]">
                                    Supporting our mission through community development and
                                    education programs.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="pt-16 text-center px-6 md:px-12" data-aos="fade-up">
                <h2 className="mb-12 text-2xl md:text-4xl font-extrabold text-title">Our Awards</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-yellow-200/50 dark:hover:shadow-purple-800/50 transition-all"
                            data-aos="zoom-in"
                            data-aos-delay={i * 150}
                        >
                            <Image
                                src="https://media.istockphoto.com/id/1468706146/photo/red-maroon-laurel-golden-stage-night-wreath-steps-royal-awards-graphics-background-lines.webp?a=1&b=1&s=612x612&w=0&k=20&c=pxH0bnLnSY4mFwaAt6a2--1zoGRSoHSyUjK8kLoPjSM="
                                alt={`Award ${i}`}
                                width={400}
                                height={300}
                                className="object-cover w-full h-64 group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-all">
                                <p className="text-white text-lg font-semibold">Excellence Award {i}</p>
                                <p className="text-gray-200 text-sm">Honored for outstanding contribution to culture and education.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Cta />
        </main>
    );
};

export default AboutUsDetails;

const aboutInfoImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGd4SAfQvLjEvG1IX59ZgBYtaXE8s5WUSiw&s",
    "https://img.freepik.com/premium-photo/man-touching-mission-text-screen_218381-4228.jpg?semt=ais_hybrid&w=740&q=80",
    "https://i0.wp.com/www.kouya.net/wp-content/uploads/2021/04/Company-Mission-Statement-1.jpg?fit=1200%2C750&ssl=1",
    "https://t3.ftcdn.net/jpg/05/19/81/94/360_F_519819425_xgW3SoStxkZJMMXCRxHvM4qwA7Nm19Xe.jpg",
];

const aboutData = [
    {
        icon: <Heart className="text-[#e65100] w-8 h-8" />,
        title: "Our Goals",
        desc: "To spread awareness, provide equal learning opportunities, and uplift underprivileged communities with empathy and care.",
    },
    {
        icon: <BookOpen className="text-[#f9a825] w-8 h-8" />,
        title: "Our Mission",
        desc: "To promote education, health, and cultural harmony through impactful programs and community service for holistic development.",
    },
    {
        icon: <Lightbulb className="text-[#6f2dbd] w-8 h-8" />,
        title: "Our Vision",
        desc: "To build a compassionate and enlightened society through education, culture, and awareness rooted in peace and human values.",
    },


];

export const AboutInfo = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="px-6 md:px-12">
            <div className="flexflex-col-reverse md:grid  lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8" data-aos="fade-right">
                    {aboutData.map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white/80 
                 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
                        >
                            <div className="p-3 rounded-full bg-[#f9d423]/20  flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-title mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-description text-base leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden relative w-full lg:flex justify-center items-center" data-aos="fade-left">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 rotate-45 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[65%] overflow-hidden">
                        {aboutInfoImages.map((src, i) => {
                            const icons = [
                                <Heart className="w-8 h-8 text-pink-400" />,
                                <BookOpen className="w-8 h-8 text-yellow-300" />,
                                <Globe2 className="w-8 h-8 text-green-400" />,
                                <Users className="w-8 h-8 text-indigo-400" />,
                            ];
                            return (
                                <div key={i} className="relative overflow-hidden w-full aspect-square border border-white/30 group">
                                    <Image
                                        src={src}
                                        alt={`Mission Image ${i + 1}`}
                                        width={600}
                                        height={600}
                                        className="-rotate-45 w-full h-full object-cover scale-140 transition-transform duration-700 group-hover:scale-150"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500"
                                    >
                                        <div className="-rotate-45">{icons[i]}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

const goalsData = [
    {
        icon: "👁️",
        title: "Awareness",
        desc: "Create awareness of the negative effects of children growing up in institutions.",
    },
    {
        icon: "💡",
        title: "Transform",
        desc: "End the institutionalisation of children and promote community-based care.",
    },
    {
        icon: "🚀",
        title: "Advancement",
        desc: "Transform education and welfare into systems that nurture and prosper families.",
    },
    {
        icon: "🤝",
        title: "Collaboration",
        desc: "Help the government and stakeholders strengthen family and community-based services.",
    },
    {
        icon: "👩‍👧",
        title: "Society-change",
        desc: "Change society’s views on orphans and unplanned pregnancies.",
    },
    {
        icon: "🕊️",
        title: "Salvation",
        desc: "Reduce and end abandonment, creating environments of love and belonging.",
    },
]

export const Goals = () => {
    return (
        <section
            className="text-center pt-16"
            data-aos="fade-up">
            <h2 className="mb-12  text-2xl md:text-4xl font-extrabold text-title">
                Driving Positive Change through Our Goals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
                {goalsData.map((goal, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center 
        space-y-4 px-6 py-4 transition-all duration-500"
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
                    >
                        <div className="text-5xl mb-2">{goal.icon}</div>
                        <h3 className="text-lg font-semibold text-title">
                            {goal.title}
                        </h3>
                        <p className="text-description text-base leading-relaxed max-w-xs">
                            {goal.desc}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    )
}

export const Cta = () => {
    const router = useRouter();
    return (
        <div
            data-aos="zoom-in"
            className="pt-16 text-center flex flex-col items-center space-y-6"
        >
            <Image
                src="/images/logo/logo.png"
                alt="NGO Logo"
                width={140}
                height={140}
                className="rounded-full shadow-lg"
            />
            <p className="max-w-2xl text-description  ">
                Guided by the teachings of Buddha, we strive to bring light, love, and
                peace to every corner of society through collective compassion.
            </p>
            <JoinNow/>
        </div>
    )
}
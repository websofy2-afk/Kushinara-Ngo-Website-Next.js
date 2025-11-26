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

const missionImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGd4SAfQvLjEvG1IX59ZgBYtaXE8s5WUSiw&s",
  "https://img.freepik.com/premium-photo/man-touching-mission-text-screen_218381-4228.jpg?semt=ais_hybrid&w=740&q=80",
  "https://i0.wp.com/www.kouya.net/wp-content/uploads/2021/04/Company-Mission-Statement-1.jpg?fit=1200%2C750&ssl=1",
  "https://t3.ftcdn.net/jpg/05/19/81/94/360_F_519819425_xgW3SoStxkZJMMXCRxHvM4qwA7Nm19Xe.jpg",
];

const missions = [
  {
    title: "Promoting Quality Education",
    description: "We strive to preserve and promote cultural heritage, traditions, and values to build a more aware and connected society."
  },
  {
    title: "Advancing Health and Wellness",
    description: "Our goal is to provide quality education and learning opportunities for underprivileged communities to foster growth and empowerment."
  },
  {
    title: "Preserving Cultural Heritage",
    description: "Safeguarding and celebrating our cultural roots to inspire harmony, respect, and shared identity across generations."
  },
  {
    title: "Spreading Social Awareness",
    description: "Creating awareness about environmental protection, gender equality, and social justice — empowering communities to act with knowledge and responsibility."
  }
];


const Mission = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const missionData = [
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

  return (
    <section
      className="pt-8 px-6 md:px-12"
    >
      <div className="text-center mb-16" data-aos="fade-down">
        <h2 className="text-4xl font-extrabold text-[#5a189a] dark:text-[#ffeb80] mb-4">
          Our Mission
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          We are dedicated to cultivating awareness, compassion, and equality — shaping a brighter
          future through education, cultural preservation, health initiatives, and social unity.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8" data-aos="fade-right">
          {missionData.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white/80 
              p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="p-3 rounded-full bg-[#f9d423]/20  flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-title dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-description text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative w-full flex justify-center items-center" data-aos="fade-left">
          <div
            className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 
            rotate-45 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[65%] overflow-hidden"
          >
            {missionImages.map((src, i) => {
              const icons = [
                <Heart className="w-8 h-8 text-pink-400" />,
                <BookOpen className="w-8 h-8 text-yellow-300" />,
                <Globe2 className="w-8 h-8 text-green-400" />,
                <Users className="w-8 h-8 text-indigo-400" />,
              ];
              return (
                <div
                  key={i}
                  className="relative overflow-hidden w-full aspect-square border border-white/30 dark:border-white/10 group"
                >
                  <Image
                    src={src}
                    alt={`Mission Image ${i + 1}`}
                    width={600}
                    height={600}
                    className="-rotate-45 w-full h-full object-cover scale-140
                     transition-transform duration-700 group-hover:scale-150"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                    flex items-center justify-center transition-opacity duration-500"
                  >
                    <div className="-rotate-45">{icons[i]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="text-center space-y-12 max-w-6xl mx-auto 
       "
        data-aos="fade-up"
      >
        <h2 className="mb-12 text-2xl md:text-4xl font-extrabold text-title">
          Mission for a Better Tomorrow
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8">
          {missions.map((value, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow-md 
              hover:shadow-xl hover:scale-105 transition-all duration-500
              
              "
              data-aos="zoom-in"
              data-aos-delay={i * 120}
            >
              <h3 className="mb-3 text-lg font-semibold text-title">
                {value.title}
              </h3>
              <p className="text-description text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mt-20 text-center "
        data-aos="fade-up"
      >
        <h3 className="mb-12 text-3xl  md:text-5xl font-extrabold text-title">
          Our Commitments
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 md:px-10">
          {[
            { title: "Education for All", desc: "Providing access to quality education and scholarships to empower youth." },
            { title: "Health Awareness", desc: "Organizing free health camps and awareness drives for underprivileged communities." },
            { title: "Cultural Preservation", desc: "Promoting traditional values, art, and heritage through cultural events." },
            { title: "Community Development", desc: "Supporting rural initiatives and creating sustainable livelihoods." },
            { title: "Women Empowerment", desc: "Encouraging equality and leadership opportunities for women." },
            { title: "Environmental Action", desc: "Advocating eco-friendly practices for a cleaner, greener future." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80  p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <h4 className="text-xl font-semibold text-title mb-3">
                {item.title}
              </h4>
              <p className="text-description dark:text-gray-300 text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;

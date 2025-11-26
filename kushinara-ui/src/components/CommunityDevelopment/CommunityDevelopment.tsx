"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BookOpen,
  Heart,
  Users,
  Target,
  Lightbulb,
  Leaf,
  Globe,
  MessageCircle,
  Building2,
} from "lucide-react";
import JoinNow from "../SharedComponent/JoinNow";

const CommunityDevelopment = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const focusAreas = [
    { icon: <BookOpen className="w-8 h-8 text-white" />, title: "Education Programs", desc: "Empowering children through quality education and learning resources." },
    { icon: <Heart className="w-8 h-8 text-white" />, title: "Healthcare Initiatives", desc: "Organizing free medical camps and awareness programs for better health." },
    { icon: <Users className="w-8 h-8 text-white" />, title: "Women Empowerment", desc: "Creating opportunities for women through training and employment." },
    { icon: <Target className="w-8 h-8 text-white" />, title: "Skill Development", desc: "Providing vocational training and digital skills to local communities." },
    { icon: <Lightbulb className="w-8 h-8 text-white" />, title: "Innovation Hubs", desc: "Encouraging local innovation and small business incubation." },
    { icon: <Leaf className="w-8 h-8 text-white" />, title: "Environmental Awareness", desc: "Promoting sustainability and eco-friendly living through community action." },
    { icon: <Globe className="w-8 h-8 text-white" />, title: "Digital Inclusion", desc: "Bridging the digital divide with access to technology and internet." },
    { icon: <Building2 className="w-8 h-8 text-white" />, title: "Rural Infrastructure", desc: "Building sanitation, clean water, and energy access projects." },
  ];

  const testimonials = [
    { name: "Priya Sharma", message: "Through this program, I gained valuable skills that helped me start my small business. Truly life-changing!" },
    { name: "Rahul Verma", message: "The health awareness camp in our village made a real difference — the support team was incredible." },
    { name: "Meena Das", message: "Thanks to their education support, my daughter now attends school with full confidence!" },
    { name: "Arjun Patel", message: "Volunteering here gave me a new perspective on giving back to society." },
  ];

  const stats = [
    { number: "10K+", label: "People Impacted" },
    { number: "500+", label: "Workshops Conducted" },
    { number: "200+", label: "Volunteers Engaged" },
    { number: "75+", label: "Communities Served" },
  ];

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10 max-w-6xl">
        <div className="flex-1" data-aos="fade-right">
          <Image
            src="https://www.shutterstock.com/image-photo/top-view-diverse-team-people-600nw-2486679585.jpg"
            alt="Buddha Bhumi Kusinara Charitable Trust"
            width={600}
            height={600}
            className="rounded-se-full mx-auto shadow-xl border-2 border-primary"
          />
        </div>
        <div className="flex-1" data-aos="fade-left">
          <h1 className="text-3xl font-extrabold text-center text-title mb-4">
            Our Mission to Empower Communities
          </h1>
          <p className="text-subtitle mb-6 text-justify">
            Inspired by the teachings of Lord Buddha, we work towards sustainable growth, compassion, and equality.
            Our mission is to build self-reliant, peaceful, and inclusive communities through education, skill
            training, and collective action.
          </p>
          <ul className="list-disc ml-6 text-description  space-y-2">
            <li>Empowering women and youth through education.</li>
            <li>Promoting health awareness and hygiene practices.</li>
            <li>Building compassion-driven leadership in rural areas.</li>
          </ul>
        </div>
      </section>
      <section className="w-full text-center pb-16">
        <h2
          className=" md:text-4xl font-extrabold mb-12 text-2xl text-title"
          data-aos="zoom-in"
        >
          Our Key Focus Areas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {focusAreas.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-cardbg rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition-transform"
            >
              <div className="bg-primary w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl text-title font-semibold mb-2">{item.title}</h3>
              <p className="text-description text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-16  bg-cardbg text-title w-full text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl  font-bold mb-12">Our Impact in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <h3 className="text-4xl font-bold">{s.number}</h3>
              <p className="text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-16 px-6 md:px-20 w-full text-center"
        data-aos="fade-up"
      >
        <h2 className="text-2xl mb-12 md:text-4xl font-extrabold text-title">
          Voices from Our Community
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              className="p-8 rounded-2xl shadow-lg border border-title"
            >
              <MessageCircle className="w-10 h-10 text-error mx-auto mb-4" />
              <p className="text-description mb-4">"{t.message}"</p>
              <h4 className="font-semibold text-title">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>
      <section
        className="w-full bg-cardbg py-20 px-6 text-center"
        data-aos="fade-up"
      >
        <div className="max-w-3xl flex items-center justify-center flex-col mx-auto">
          <h2 className="md:text-4xl text-2xl text-title font-bold mb-6">Join Our Community</h2>
          <p className="text-lg mb-8 text-subtitle">
            Become part of a compassionate network inspired by Buddha’s teachings — dedicated to peace,
            kindness, and community upliftment.
          </p>
          <JoinNow/>
          <p className="mt-6 text-sm text-description">
            Together, we can make lasting change — one compassionate act at a time.
          </p>
        </div>
      </section>
    </main>
  );
};

export default CommunityDevelopment;

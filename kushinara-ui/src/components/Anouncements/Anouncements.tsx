"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";


const announcements = [
  {
    id: 1,
    title: "How Do We Choose Our Political Leaders?",
    author: "Editorial Team",
    date: "2025-10-01",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMatkw1IBhhlV0O0P_EzIzoW4mJnZipRsOvw&s",
    description:
      "Wherever you live in the world, you know what it's like when it's election time. The airwaves and billboards are taken over by candidates. Your mailbox is flooded with promises...",
  },
  {
    id: 2,
    title: "Is Social Media the Bad Guy? Redefining Beauty in a Digital World",
    author: "Seline Shenoy",
    date: "2025-09-20",
    image: "https://img.freepik.com/free-photo/children-playing-grass_1098-504.jpg?semt=ais_hybrid&w=740&q=80",
    description:
      "We're living in an age of hyper-connectivity where social media is widely used by every age group. It's connected people globally and shaped how we perceive beauty...",
  },
  {
    id: 3,
    title: "What's Personality Got To Do With Us? A Lot",
    author: "Richard Kensinger",
    date: "2025-09-15",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMatkw1IBhhlV0O0P_EzIzoW4mJnZipRsOvw&s",
    description:
      "Personality is understood as the consistent features we display in our thinking, feeling, and behavior. It begins to emerge around the age of 3...",
  },
  {
    id: 4,
    title: "The Brain of an Introvert",
    author: "Viacheslav Wassoff",
    date: "2025-09-10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMatkw1IBhhlV0O0P_EzIzoW4mJnZipRsOvw&s",
    description:
      "The introvert's brain treats interactions with people at the same intensity level as encounters with objects. Introverts process everything deeply...",
  },
  {
    id: 5,
    title: "How Facebook Preys on Its Users",
    author: "Michael Kaplan",
    date: "2025-08-30",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMatkw1IBhhlV0O0P_EzIzoW4mJnZipRsOvw&s",
    description:
      "Facebook’s algorithms are designed to maximize engagement, often at the cost of user well-being. This article explores how design choices influence behavior...",
  },
];

const past = [
  {
    title: "Women’s Health Seminar – July 2025",
    summary: "Conducted awareness session for 200+ women on health hygiene.",
  },
  {
    title: "Education for All Program – May 2025",
    summary: "Distributed learning kits to underprivileged students.",
  },
];

export default function Announcements() {
  const [selected, setSelected] = useState(announcements[0]);
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="py-16">
      <section
        data-aos="zoom-in"
        className="bg-green-100 py-16 px-6 md:px-16 text-center relative"
      >
        <h1 className=" text-error mb-4 text-3xl md:text-5xl font-extrabold text-center leading-tight">
          Featured: Scholarship Applications Now Open!
        </h1>
        <p className="mx-auto text-subtitle text-base md:text-xl leading-relaxed">
          Students from rural areas can now apply for our annual education
          scholarship program. Deadline: <b>Oct 20, 2025</b>.
        </p>
        <button onClick={() => router.push("#")} className="mt-5 bg-error cursor-pointer text-white px-6 py-2 rounded-full hover:bg-error/90 transition">
          Apply Now
        </button>
      </section>
      <section className="px-4 pt-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-cardbg lg:col-span-2 rounded-lg shadow-md overflow-hidden" data-aos="fade-right">
            {selected.image && (
              <div className="relative w-full h-64">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl text-title font-semibold mb-2">{selected.title}</h2>
              <p className="text-sm text-subtitle mb-4">
                {selected.author} • {selected.date}
              </p>
              <p className="text-description text-base md:text-xl whitespace-pre-line">{selected.description}</p>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[600px] no-scrollbar pr-2 scrollbar-thin scrollbar-thumb-[#f4b400] scrollbar-track-transparent" data-aos="fade-left">
            {announcements.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className="bg-cardbg cursor-pointer border-1 border-primary rounded-lg shadow-md p-4 mb-4 transition hover:scale-105"
              >
                <p className="text-sm text-subtitle mb-1">
                  {item.author} • {item.date}
                </p>
                <h3 className="text-lg text-title font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-description line-clamp-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pt-16 px-6 md:px-16">
        <h2 className="text-2xl text-center  md:text-4xl font-extrabold text-title mb-8" data-aos="fade-up">
          Past Announcements
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {past.map((p, i) => (
            <details key={i} className="bg-gray-100 rounded-lg p-4 cursor-pointer" data-aos="fade-up">
              <summary className="font-semibold text-title text-lg">{p.title}</summary>
              <p className="mt-2 text-description">{p.summary}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

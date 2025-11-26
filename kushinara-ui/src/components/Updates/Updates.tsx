"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = ["All", "Culture", "Education", "Health", "Awareness"];

const dummyUpdates = [
  {
    id: 1,
    title: "Cultural Festival in Kushinagar",
    date: "2025-09-20",
    category: "Culture",
    image: "https://www.daiwikhotels.com/wp-content/uploads/2024/07/festivals-1.jpg",
    description: "Celebrating local heritage with music, dance, and food.",
  },
  {
    id: 2,
    title: "Free Health Camp",
    date: "2025-09-10",
    category: "Health",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfEeSB4iamoSPQM6A4qzb__bXf6fzPyQ09Ow&s",
    description: "Medical checkups and awareness sessions for villagers.",
  },
  {
    id: 3,
    title: "Education Drive for Girls",
    date: "2025-08-25",
    category: "Education",
    image: "https://images.ctfassets.net/0oan5gk9rgbh/5uqFcJ8mhG0weCJNAoySNe/43a1c8aa419a5a124dce13aa2597f444/CTA.jpg",
    description: "Providing books and scholarships to underprivileged girls.",
  },
  {
    id: 4,
    title: "Cleanliness Awareness Walk",
    date: "2025-08-15",
    category: "Awareness",
    image: "https://assets.thehansindia.com/h-upload/2023/05/25/1353258-ramagundam.webp",
    description: "Spreading awareness about hygiene and sanitation.",
  },
];

const miscellaneousUpdates = {
  All: {
    title: "Community Spotlight: Local Hero",
    date: "2025-10-01",
    category: "Miscellaneous",
    image: "https://i.ytimg.com/vi/4SZvXe4oRcQ/hqdefault.jpg?v=63161cca",
    description: "Honoring individuals making a quiet impact in their communities through compassion and service.",
  },
  Culture: {
    title: "Artisans of Kushinagar",
    date: "2025-09-28",
    category: "Miscellaneous",
    image: "https://www.sarkaritel.com/wp-content/uploads/2025/01/kumbh-exhibition.jpg",
    description: "Celebrating the unsung artists preserving traditional crafts and music.",
  },
  Education: {
    title: "Teacher Training Initiative",
    date: "2025-09-22",
    category: "Miscellaneous",
    image: "https://abp.championsofchange.gov.in/public-assets/static/uploads/2023/07/Edu_PB_4.png",
    description: "Empowering educators with modern tools and inclusive teaching methods.",
  },
  Health: {
    title: "Mental Wellness Circle",
    date: "2025-09-18",
    category: "Miscellaneous",
    image: "https://tandempsychology.com/wp-content/uploads/2023/04/chart.png",
    description: "Creating safe spaces for emotional support and mental health awareness.",
  },
  Awareness: {
    title: "Digital Literacy for All",
    date: "2025-09-12",
    category: "Miscellaneous",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHKo1SVXwNCWR8CS3tY7dpU1q4ztPmDotgg&s",
    description: "Workshops to help villagers navigate online safety and digital tools.",
  },
};

export default function Updates() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const filteredUpdates =
    selectedCategory === "All"
      ? dummyUpdates
      : dummyUpdates.filter((update) => update.category === selectedCategory);

  //  @ts-ignore
  const featured = miscellaneousUpdates[selectedCategory] || miscellaneousUpdates["All"];

  return (
    <div>
      <section className="
      w-full flex flex-col items-center justify-center py-16 px-6 md:px-12" data-aos="fade-down">
        <h1 className="mb-2 text-3xl  md:text-5xl font-extrabold text-title">Latest Updates</h1>
        <p className="mt-6 text-description max-w-5xl   text-base md:text-xl text-justify leading-relaxed">Stay informed with the most recent news, events, and milestones from Buddha Bhumi Kusinara Charitable Trust, reflecting our ongoing efforts to serve communities through culture, education, health, and awareness.</p>
      </section>
      <div className="flex flex-wrap justify-center gap-4 pb-6" data-aos="fade-up">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full cursor-pointer border ${selectedCategory === cat
              ? "bg-primary/90 text-white"
              : "bg-white  text-title"
              } hover:bg-secondary transition`}
          >
            {cat}
          </button>
        ))}
      </div>
      <section className="max-w-5xl mx-auto px-4 py-8" data-aos="zoom-in">
        <div className="bg-cardbg p-6 rounded-lg shadow-md shadow-primary/90 flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-full md:w-1/3 h-48">
            <Image
              src={featured.image}
              alt="Featured"
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div>
            <h2 className="text-2xl text-title font-semibold mb-2">{featured.title}</h2>
            <p className="mb-4 text-description">{featured.description}</p>
            <span className="text-sm text-subtitle">{featured.date}</span>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto py-8" data-aos="fade-up">
        {filteredUpdates.map((update) => (
          <div key={update.id} className="border bg-cardbg border-primary rounded-lg shadow hover:shadow-secondary hover:shadow-md transition p-4">
            <div className="relative w-full h-40 mb-4">
              <Image
                src={update.image}
                alt={update.title}
                fill
                className="rounded-md object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-xl text-title font-bold mb-2">{update.title}</h3>
            <p className="text-sm text-subtitle mb-2">{update.date}</p>
            <p className="text-description">{update.description}</p>
          </div>
        ))}
      </section>
      <section className="max-w-4xl mx-auto px-4 py-10" data-aos="fade-right">
        <h2 className="mb-6 text-center text-2xl md:text-4xl font-extrabold text-title">Milestones</h2>
        <div className="border-l-4 border-primary pl-6 space-y-6">
          {dummyUpdates.map((update) => (
            <div key={update.id}>
              <h4 className="font-semibold text-title ">{update.date}</h4>
              <p className="text-subtitle">{update.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

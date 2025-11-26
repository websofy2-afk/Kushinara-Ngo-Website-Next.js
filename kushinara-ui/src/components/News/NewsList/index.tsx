"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

export default function News() {
  const [search, setSearch] = useState("");
   const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Aos.init({ duration: 1000, once: true });
    }
  }, []);

      useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch("/api/auth/news");
                if (!res.ok) throw new Error("Failed to fetch");
                const result = await res.json();
                setNews(result?.data || []);
            } catch (error) {
                console.error("Error fetching donation records:", error);
            }
        };
        fetchNews();
    }, []);

  const filteredData = news?.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });


  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="px-4 md:px-20 py-16">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-muted rounded-md p-3 flex-1 focus:outline-none focus:ring-1 focus:ring-primary"
          data-aos="fade-down"
        />
      </div>
      
      {
        sortedData.length > 0 ? <div className="flex flex-col gap-8">
          {sortedData.map((featured, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="flex flex-col md:flex-row gap-6 bg-cardbg shadow-primary shadow-sm rounded-lg overflow-hidden"
            >
              <div className="md:w-1/3 w-full relative">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-title mb-2" data-aos="fade-right">
                    {featured.title}
                  </h1>
                  <p className="text-sm text-subtitle mb-4" data-aos="fade-right">
                    {featured.date.split("T")[0]}
                  </p>
                  <p className="text-description mb-4 leading-relaxed" data-aos="fade-right">
                    {featured.summary}
                  </p>
                  <div className="flex items-center gap-3" data-aos="fade-left">
                    <Image
                      src={featured.thumbnail}
                      alt={featured.author}
                      width={40}
                      height={40}
                      className="rounded-full w-11 h-11 border-2 border-primary"
                    />
                    <span className="font-semibold text-title">{featured.author}</span>
                  </div>
                </div>
                <Link
                  href={`/news/${featured._id}`}
                  className="mt-4  w-24 inline-block text-muted font-semibold hover:underline hover:text-primary"
                  data-aos="fade-left"
                >
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div> : <div className="col-span-full text-center text-gray-500">
          No data found in this category.
        </div>
      }
    </section>
  );
}


"use client";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { useState } from "react";
import { useEvent } from "@/app/context/EventContext";

const EventList = () => {
  const [category, setCategory] = useState("all");
  const { event } = useEvent();

  const filteredEvents = event?.filter((item) => {
    const eventDate = new Date(item.date);
    const now = new Date();
    if (category === "upcoming") return eventDate >= now;
    if (category === "past") return eventDate < now;
    return true;
  });

  return (
    <section className="py-16">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { label: "All Events", value: "all" },
            { label: "Upcoming Events", value: "upcoming" },
            { label: "Past Events", value: "past" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setCategory(btn.value)}
              className={`px-4 py-2 rounded-full cursor-pointer border ${category === btn.value
                ? "bg-primary/90 text-white"
                : "bg-white  text-title"
                } hover:bg-secondary transition`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((item, index) => (
              <Link
                key={index}
                href={`/events/${item._id}`}
                className="group border-1 border-title  rounded-lg"
                data-aos="fade-up"
                data-aos-delay={`${index * 120}`}

              >
                <div className="relative overflow-hidden mb-8  rounded-t-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={350}
                    height={200}
                    className="w-full h-auto group-hover:scale-110 duration-300 scale-[1.01] rounded-lg"
                  />
                  <div className="px-3 py-2 bg-primary/90  absolute z-10 top-3 right-3 rounded-sm text-center text-white">
                    <span className="block">{format(new Date(item.date), "MMM")}</span>
                    <span className="block text-2xl font-semibold">
                      {format(new Date(item.date), "dd")}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg text-title font-semibold m-3 group-hover:text-primary  transition">
                  {item.title}
                </h4>
                <p className="text-description text-base  m-3 line-clamp-3">
                  {item.text}
                </p>
                <div className="text-subtitle m-3 hover:text-primary font-medium flex gap-2 items-center">
                  Learn More
                  <Icon icon="solar:arrow-right-linear" width="20" height="20" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No events found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventList;


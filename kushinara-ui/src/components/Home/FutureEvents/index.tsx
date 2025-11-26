"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import { IoNotificationsOutline } from "react-icons/io5";
import { useEvent } from "@/app/context/EventContext";
import { CalendarClock, MapPin, Megaphone, MoveRight } from "lucide-react";

export default function FutureEvents() {
  const { event } = useEvent();
  const today = new Date();
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  const upcomingEvents = event
    .filter((item) => new Date(item.date).getTime() >= today.getTime())
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  return (
    <>
      {
        upcomingEvents.length > 0 &&
        <div className="w-full py-16">
          <div className="w-full pb-10">
            <div
              className="flex items-center justify-center gap-2 mb-6"
              data-aos="fade-up"
            >
              <div className="relative">
                <IoNotificationsOutline className="text-3xl text-primary" />

                {upcomingEvents.length > 0 && (
                  <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                    {upcomingEvents.length}
                  </span>
                )}
              </div>

              <h2 className="
          text-2xl md:text-4xl font-extrabold mb-3 ml-2
            text-title
          ">
                Upcoming Events
              </h2>
            </div>

            <p className="mb-6 lg:max-w-60% text-center text-description mt-6 text-base md:text-xl  max-w-2xl mx-auto
        ">
              Join us at local events to make a difference! Connect, volunteer, and support our mission in your community.
            </p>
            <div
              className="relative max-w-6xl mx-auto overflow-hidden whitespace-nowrap mb-6 group"
              data-aos="fade-left"
            >
              <div className="pointer-events-none absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />
              <div
                className="
            flex
            animate-[smoothMarquee_8s_linear_infinite]
            group-hover:[animation-play-state:paused]
          "
              >
                {upcomingEvents.map((e) =>

                (
                  <div
                    key={e._id}
                    className="text-description flex items-center justify-center gap-2 cursor-pointer text-sm px-10"
                  >

                    <span> <Megaphone size={17} /></span> <span> {e.title} • {new Date(e.date).toLocaleDateString()} • {e.location}</span>
                  </div>
                ))}
                {upcomingEvents.map((e) => (
                  <div
                    key={e._id + '_clone'}
                    className="text-description flex items-center justify-center gap-2 cursor-pointer text-sm px-10"
                  >
                    <span> <Megaphone size={17} /></span> <span> {e.title} • {new Date(e.date).toLocaleDateString()} • {e.location}</span>

                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

            {upcomingEvents?.map((event, index) =>

              <div key={event._id}>
                {
                  index < 2 &&

                  (
                    <div

                      data-aos="fade-up"
                      className="bg-white mx-4 sm:mx-0 shadow-xl border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-2xl transition-all"
                    >
                      <div className="w-28 h-28 relative rounded-lg overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between w-96">
                        <div>
                          <h3 className="text-lg font-bold text-title">
                            {event.title}
                          </h3>

                          <p className="text-sm text-description mt-1 line-clamp-2">
                            {event.text}
                          </p>

                          <p className="text-sm flex gap-2 items-center text-primary mt-2">

                            <span><CalendarClock className="text-red-600" size={15} /></span><span>{new Date(event.date).toLocaleDateString()}</span>
                          </p>
                          <p className="text-sm flex gap-2 mt-2 items-center text-subtitle"> <span><MapPin className="text-error" size={15} /></span><span>{event.location}</span> </p>
                        </div>

                        <div className="flex justify-end items-center">
                          <Link
                            href={`/events/${event._id}`}
                            className="mt-3 flex gap-2 justify-center px-4 py-1.5 rounded-md  transition
                
                text-primary text-sm cursor-pointer font-semibold border border-primary ml-8 hover:bg-primary hover:text-white
                "
                          >
                            <span>Read More </span>    <MoveRight />

                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            )
            }
          </div>
        </div>
      }
    </>
  );
}



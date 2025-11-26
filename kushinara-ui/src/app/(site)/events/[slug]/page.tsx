"use client";
import EventDetails from "@/components/Events/EventDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Events = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch("/api/auth/event");
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setEvent(result?.data || []);
      } catch (error) {
        console.error("Error fetching donation records:", error);
      }
    };
    fetchEvent();
  }, []);

  const item = event?.find((item) => item._id === slug);

  return (
    <>
      <EventDetails
        title={item?.title}
        detail={item?.detail}
        category={item?.category}
        location={item?.location}
        eventdate={item?.date}
        duration={item?.duration}
        type={item?.type}
        entrants={item?.entrants}
        image={item?.image}
      />
    </>
  );
};

export default Events;

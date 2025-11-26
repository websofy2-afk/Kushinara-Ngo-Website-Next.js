"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { EventType } from "@/types/Event";

interface EventContextType {
  event: EventType[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {

  const [event, setEvent] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch("/api/auth/event");
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setEvent(result?.data || []);
      } catch (error) {
        console.error("Error fetching event records:", error);
      }
    };
    fetchEvent();
  }, []);

  return (
    <EventContext.Provider value={{ event }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used inside an EventProvider");
  }
  return context;
};

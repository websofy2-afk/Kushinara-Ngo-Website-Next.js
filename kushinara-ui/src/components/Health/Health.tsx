"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { Award, Users, Clock, Wallet } from "lucide-react";

export default function Health() {


  const [health, setHealth] = useState<any[]>([])

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const aboutFeatures = [
    { icon: Award, text: "Award Winning" },
    { icon: Users, text: "Professional Staff" },
    { icon: Clock, text: "24/7 Opened" },
    { icon: Wallet, text: "Fair Prices" },
  ];


  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch("/api/auth/programme");
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setHealth(result?.data || []);
      } catch (error) {
        console.error("Error fetching donation records:", error);
      }
    };
    fetchHealth();
  }, []);

  const timeline = [
    { title: "Clinic Founded", description: "Started with a small team of dedicated doctors.", date: "2010" },
    { title: "Expansion", description: "Opened new departments and hired specialists.", date: "2015" },
    { title: "Telemedicine Launch", description: "Introduced online consultations and digital health services.", date: "2020" },
    { title: "Modern Facilities", description: "Upgraded with cutting-edge healthcare technologies.", date: "2024" },

    { title: "Clinic Founded", description: "Started with a small team of dedicated doctors.", date: "2010" },
    { title: "Expansion", description: "Opened new departments and hired specialists.", date: "2015" },
    { title: "Telemedicine Launch", description: "Introduced online consultations and digital health services.", date: "2020" },
    { title: "Modern Facilities", description: "Upgraded with cutting-edge healthcare technologies.", date: "2024" }
  ];

  return (
    <main className="overflow-hidden">
      <section className="py-16 px-6 md:px-20">
        <div className="md:grid md:grid-cols-2 gap-10 items-center">

          <div
            className="flex justify-center order-1 md:order-2"
            data-aos="fade-left"
          >
            <div className="relative w-full max-w-sm h-96">
              <Image
                src="https://www.smilefoundationindia.org/wp-content/uploads/2023/05/4-2.png"
                alt="Doctor"
                fill
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>
          <div
            className="order-2 md:order-1 pt-6 md:pt-0 text-center md:text-left"
            data-aos="fade-right"
          >
            <h1 className="md:text-5xl font-extrabold mb-4 text-3xl text-title">
              About Our Healthcare
            </h1>
            <p className="text-subtitle text-base md:text-xl text-justify mb-6">
              We provide world-class medical care with modern facilities and expert staff dedicated to your wellbeing.
            </p>



            <ul className="space-y-3">

              {aboutFeatures.map((item, i) => (

                <li key={i} className="flex items-center justify-center md:justify-start gap-3">
                  <item.icon className="text-error w-6 h-6" />
                  <span className="font-medium text-description">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
      <section className="px-6 md:px-20">
        <h2
          className="text-center mb-12 md:text-4xl font-extrabold text-2xl text-title"
          data-aos="fade-up"
        >
          We Offer The Best Quality Health Services
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            health?.map((item, i) => (
              <div key={item._id}>
                {
                  item.type === "Health" &&
                  (
                    <div
                      key={i}
                      data-aos="zoom-in"
                      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
                    >
                      <div className="relative w-full h-52">
                        <Image
                          src={item.image}
                          alt={item.text}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 text-center bg-cardbg">
                        <h3 className="text-lg font-semibold text-title">{item.title}</h3>
                        <p className="text-sm text-justify text-subtitle mb-3">{item.detail}</p>
                      </div>
                    </div>
                  )
                }
              </div>
            ))}
        </div>
      </section>
      <section className="pt-16 px-6 md:px-20">
        <h2
          className="text-center mb-12 md:text-4xl font-extrabold text-2xl text-title"
          data-aos="fade-up"
        >
          Our Journey
        </h2>

        <div className="relative border-l-2 border-primary pl-12 space-y-12 max-w-3xl mx-auto">
          {timeline.map((item, i) => (
            <div key={i} data-aos="fade-up" className="relative">
              <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-primary rounded-full" />
              <div className="ml-7">
                <h3 className="text-title font-semibold mb-2">{item.title}</h3>
                <p className="text-description mb-1">{item.description}</p>
                <span className="text-sm text-primary">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

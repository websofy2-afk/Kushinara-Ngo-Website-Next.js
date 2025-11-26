import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Home/Hero';
import Help from '@/components/Home/Help';
import FutureEvents from '@/components/Home/FutureEvents';
import AboutUs from '@/components/AboutUs/AboutUs';
import NgoMember from '@/components/Home/NgoMember';
import Testimonial from '@/components/Home/Testimonial';

export const metadata: Metadata = {
  title: "Buddh Bhumi Kusinara Charitable Trust",
  description: "Focused on Culture, Education, Health, and Awareness",
};

export default function Home() {
  return (
    <main >
      <Hero />
      <AboutUs />
      <FutureEvents />
      <NgoMember />
      <Help />
      <Testimonial />
    </main>
  )
}

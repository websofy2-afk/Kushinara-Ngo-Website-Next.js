import Event from '@/components/event/Event'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Events | Buddh Bhumi Kushinara Charitable Trust",
  description: "Buddha Bhumi Kushinara Charitable Trust is a non-profit organization committed to fostering holistic growth through initiatives in Culture, Education, Health, and Awareness.",
};

const page = () => {
  return <Event/>
}

export default page
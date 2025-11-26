import Mission from '@/components/Mission/Mission'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Our Mission",
};

const page = () => {
  return (
    <>
      <HeroSub
        imageSrc="/event/event-banner.png"
        title="Our Mission" description='We are dedicated to cultivating awareness, compassion, and equality — shaping a brighter future through education, cultural preservation, health initiatives, and social unity.' />
      <Mission />
    </>
  )
}

export default page
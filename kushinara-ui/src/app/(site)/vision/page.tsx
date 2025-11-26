import HeroSub from '@/components/SharedComponent/HeroSub'
import Vision from '@/components/Vision/Vision'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Our Vision",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Our Vision and Values" 
                imageSrc="/event/event-banner.png"
                description='At Buddha Bhumi Kusinara Charitable Trust, we are dedicated to serving humanity through compassion, education, sustainability, and community upliftment — inspired by the teachings of Buddha.'
            />
           <Vision/>
        </>
  )
}

export default page
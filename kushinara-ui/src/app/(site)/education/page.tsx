import Education from '@/components/Education/Education'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Education",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Education"
                imageSrc="/education/education-banner.jpg"
            />
           <Education/>
        </>
  )
}

export default page
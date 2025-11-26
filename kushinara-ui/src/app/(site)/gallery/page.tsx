import Gallery from '@/components/Gallery/Gallery'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Gallery",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Gallery"
                imageSrc='/gallery/gallery-banner.png'
            />
            <Gallery/>
        </>
  )
}

export default page



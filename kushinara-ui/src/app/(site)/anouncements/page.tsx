import Anouncements from '@/components/Anouncements/Anouncements'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Anouncements",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Anouncements"
                imageSrc='/anouncements/anouncements-banner.png'
            />
            <Anouncements/>
        </>
  )
}

export default page



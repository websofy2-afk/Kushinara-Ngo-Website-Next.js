import Certificate from '@/components/Certificate/Certificate'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Certification",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Our Certification"
                imageSrc='/certification/certification-banner.jpg'
            />
           <Certificate/>
        </>
  )
}

export default page
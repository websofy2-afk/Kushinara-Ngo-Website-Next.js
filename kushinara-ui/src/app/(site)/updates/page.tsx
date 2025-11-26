import HeroSub from '@/components/SharedComponent/HeroSub'
import Updates from '@/components/Updates/Updates'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Updates",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Updates"
                imageSrc='/updates/updates-banner.png'
            />
           <Updates/>
        </>
  )
}

export default page
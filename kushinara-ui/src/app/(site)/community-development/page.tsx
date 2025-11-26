import CommunityDevelopment from '@/components/CommunityDevelopment/CommunityDevelopment'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Community Development",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Community Development"
                imageSrc="/community-development/community-development-banner.png"
            />
           <CommunityDevelopment/>
        </>
  )
}

export default page
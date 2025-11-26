import HeroSub from '@/components/SharedComponent/HeroSub'
import TeamPhotos from '@/components/TeamPhotos/TeamPhotos'
import { Metadata } from 'next';

import React from 'react'

export const metadata: Metadata = {
  title: "Team Photos",
};

const page = () => {
  return (
    <>
      <HeroSub
        title="Team Photos"
        imageSrc="/event/event-banner.png"
        description='Our team of experts is dedicated to bringing positive change to our community.
'/>
      <TeamPhotos />
    </>
  )
}

export default page
import News from '@/components/News/NewsList';
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
    title: "News",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="News"
                imageSrc='/press-releases/press-releases-banner.png'
            />
            <News />
        </>
    )
}

export default page

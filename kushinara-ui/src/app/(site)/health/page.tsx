import Health from '@/components/Health/Health'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Health",
};

const page = () => {
  return (
     <>
            <HeroSub
                title="Health"
                imageSrc="/health/health-banner.jpg"
            />
           <Health/>
        </>
  )
}

export default page
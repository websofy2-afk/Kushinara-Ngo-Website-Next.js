import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import AboutUsDetails from "@/components/AboutUs/AboutUsDetails";
export const metadata: Metadata = {
    title: "About Us",
};

const Page = () => {
    return (
        <>
            <HeroSub
                title="About Us"
                imageSrc="/aboutus/about-us-banner.jpg"
            />
            <AboutUsDetails />
        </>
    )
}

export default Page;
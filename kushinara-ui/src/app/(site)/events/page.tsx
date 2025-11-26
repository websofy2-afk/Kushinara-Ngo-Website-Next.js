import HeroSub from "@/components/SharedComponent/HeroSub";
import EventList from "@/components/Events/EventList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events",
};

const Page = () => {
    return (
        <>
            <HeroSub
                title="Event List"
                imageSrc="/event/event-banner.png"
            />
            <EventList />
        </>
    )
}

export default Page;
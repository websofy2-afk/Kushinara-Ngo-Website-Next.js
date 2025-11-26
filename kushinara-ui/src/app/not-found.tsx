import HeroSub from "@/components/SharedComponent/HeroSub";
import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Not Found ",
};

const ErrorPage = () => {
  return (
    <>
      <HeroSub
        imageSrc="/404/not-found.jpg"
        title="404"
      />
      <NotFound />
    </>
  );
};

export default ErrorPage;

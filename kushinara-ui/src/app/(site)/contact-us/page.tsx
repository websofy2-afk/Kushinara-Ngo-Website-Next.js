import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us",
};

const page = () => {
  return (
    <>
      <HeroSub
        title="Contact Us"
        imageSrc="/contact-page/contact-us.png"
      />
      <ContactInfo />
      <ContactForm />
      <Location />
    </>
  );
};

export default page;

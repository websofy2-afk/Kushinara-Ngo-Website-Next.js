import React from "react";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <>
      <section className="py-16 lg:pb-24">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <h1 className="text-3xl text-title  md:text-5xl font-extrabold mb-12 text-center">Locate Buddh Bhumi Kusinara Charitable Trust easily through the interactive Google Map</h1>
          <div className="pb-8">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d113886.69493703307!2d80.97628160000001!3d26.873036799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1759839512783!5m2!1sen!2sin" width="1114" height="477" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg w-full"></iframe>
          </div>
        </div>
        <div className="border-b border-solid border-1 border-primary"></div>
      </section>
    </>
  );
};

export default ContactInfo;

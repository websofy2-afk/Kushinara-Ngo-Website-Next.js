import React, { FC } from "react";
import Link from "next/link";
import Logo from "../Header/Logo";
import { footerLinks } from "@/app/api/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Facebook, Instagram, LinkedIn, Twitter, Youtube } from "@/components/SharedComponent/SocialMediaIcon";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="pt-16 mt-12 border-t-1 bg-fbgcol">

      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-12 sm:gap-28 pb-10 ">
          {/* First Column */}
          {/* <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <Logo />
            <div className="mt-6">
              <p className="text-sm  text-ftextcol mb-6">
                You can relay on our amazing features list and also our customer
                services will be great experience.
              </p>
              <p className="text-sm text-ftextcol mb-0">
                our amazing features list and also our customer services is
                great.
              </p>
            </div>
          </div> */}
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <div className="lg:pl-10">
              <div className="flex mb-4 gap-4">

                <div>
                  <h5 className="text-[20px]  font-bold text-title mb-4 ml-2">
                    About Us
                  </h5>
                  <div className="flex w-72 text-justify  justify-center items-center gap-3">
                    <p className="text-sm text-ftextcol">
                      Buddha Bhumi Kushinara Charitable Trust is a non-profit organization committed to fostering holistic growth through initiatives in Culture, Education, Health, and Awareness.
                      <br />
                      Inspired by the timeless teachings of Lord Buddha, we strive to build a compassionate and inclusive society where every individual has the opportunity to learn, live healthily, and contribute meaningfully to the community.
                    </p>
                  </div>
                </div>

              </div>

              <div className="flex items-center mb-4 gap-4">
                <Link
                  href="/"
                  className="text-sm w-48 flex items-center justify-center hover:text-primary text-ftextcol mb-0"
                >
                  <Image
                    src="/images/logo/logo.png"
                    alt="Buddh Bhumi Logo"
                    width={80}
                    height={80}
                    quality={100}
                    priority
                    className="rounded-full w-28 h-28 sm:w-20 sm:h-20 md:w-14 md:h-14 lg:w-28 lg:h-28 object-contain"
                  />
                </Link>
              </div>

            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <div className="lg:pl-10">
              <div className="flex mb-4 gap-4">

                <div>
                  <h5 className="text-[20px]  font-bold text-title mb-4 ml-2">
                    Address
                  </h5>
                  <div className="flex  justify-center items-center gap-4">
                    <Icon
                      icon="mdi:location"
                      className="sm:text-6xl text-2xl  text-ftextcol"
                    />

                    <p className="text-sm w-42 sm:w-auto text-ftextcol">
                      134, Cornish Building, Some Near by area, New York, USA -
                      34556
                    </p>
                  </div>
                </div>

              </div>

              <div className="flex items-center mb-4 gap-4">

                <Icon
                  icon="mdi:phone"
                  className="text-2xl  text-ftextcol"
                />
                <Link
                  href="tel:+917030513954"
                  className="text-sm hover:text-primary text-ftextcol mb-0"
                >
                  +91-7030513954
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Icon
                  icon="mdi:email"
                  className="text-2xl text-ftextcol"
                />
                <Link
                  href="mailto:info@gmail.com"
                  className="text-sm text-ftextcol mb-0 hover:text-primary"
                >
                  info@gmail.com
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <h5 className="text-[20px] font-bold text-title mb-4">
              Programs & Activities
            </h5>
            <div className="flex">
              <ul className="pl-5">
                {footerLinks.slice(0, 3).map((item, index) => (
                  <li key={index} className="mb-5">
                    <Link
                      href={item.url}
                      className="text-sm relative hover:text-primary text-ftextcol mb-0 before:content-[''] before:absolute before:w-2 before:h-2 before:border-t-2 before:border-r-2 before:top-1 before:-left-5 before:rotate-45"
                    >
                      {item.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <h5 className="text-[20px] font-bold text-title mb-4">
              Media & Updates
            </h5>
            <div className="flex" >
              <ul className="pl-5">
                {footerLinks.slice(3).map((item, index) => (
                  <li key={index} className="mb-5 ">
                    <Link
                      href={item.url}
                      className="text-sm hover:text-primary relative text-ftextcol mb-0 before:content-[''] before:absolute before:w-2 before:h-2 before:border-t-2 before:border-r-2 before:top-1 before:-left-5 before:rotate-45"
                    >
                      {item.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <LowestBar />
    </footer>
  );
};

export default Footer;



export const LowestBar = () => {
  return (
    <div className="border-t border-border">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex items-center justify-between py-6 lg:flex-nowrap flex-wrap lg:gap-0 gap-4">
        <p className="text-sm text-ftextcol w-[40em]">
          © 2025 All Rights Reserved by{" "}
          <Link
            href="/"
            className="hover:text-primary!"
          >
            Buddh Bhumi Kusinara Charitable Trust.| Registered under the Societies Registration Act.
            Focused on Culture, Education, Health, and Awareness.
          </Link>
        </p>

        <p className="text-sm text-ftextcol">
          Designed by :{" "}
          <Link
            href="https://www.websofy.com/"
            className="hover:text-primary!"
            target="_blank"
          >
            Websofy Software Pvt Ltd.
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <Facebook fbUrl="#" color="ftextcol" />
          <Instagram instUrl="#" color="ftextcol" />
          <LinkedIn linkedInUrl="#" color="ftextcol" />
          <Twitter xUrl="#" color="ftextcol" />
          <Youtube youtubeUrl="#" color="ftextcol" />
        </div>
      </div>
    </div>
  );
}

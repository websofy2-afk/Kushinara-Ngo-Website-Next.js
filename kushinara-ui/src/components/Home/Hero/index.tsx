"use client";
import Slider from "react-slick";
import Image from "next/image";
import { useContext } from "react";
import DonationFormContext from "@/app/context/donationContext";

const Hero = () => {
  const donationInfo = useContext(DonationFormContext);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: false,
    pauseOnHover: false,
  };
  const carouselImages = [
    "https://observerbd.com/2018/04/29/1525021965.jpg",
    "https://timesasian.com/wp-content/uploads/2024/05/20240509_112807.jpg",
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/monk-are-teacher-wichan-sumalee.jpg",
    "https://www.newagebd.com/files/records/news/202205/170643_120.jpg",
  ];

  return (
    <section className="relative text-white overflow-hidden lg:mt-40 sm:mt-44 mt-20">
      {/* 🔹 Background Carousel */}
      <div className=" inset-0 -z-10 h-full w-full">
        <Slider {...settings} className="h-full">
          {carouselImages.map((src, index) => (
            <div
              key={index}
              className="relative h-[100vh] w-full"
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover w-full h-full"
                priority={index === 0}
              />
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </Slider>
      </div>

      {/* 🔹 Foreground Content */}
      {/* <div className="relative container mx-auto px-4 grid grid-cols-12 items-center min-h-[90vh]">
        <div
          className="backdrop-blur-md bg-white/20 dark:bg-dark/30 rounded-md p-6 sm:p-8 md:p-10 lg:p-12 
                 lg:col-span-5 md:col-span-7 sm:col-span-10 col-span-12 shadow-xl border border-white/30 
                 transition-all duration-500"
          data-aos="fade-right"
        >
          
          <div className="flex justify-between mb-6 items-center">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-midnight_text/80 rounded-sm">
              <p className="text-white text-xs sm:text-sm font-semibold">Featured</p>
            </div>
            <p className="text-muted dark:text-white/80 text-xs sm:text-sm font-medium">
              193 days left
            </p>
          </div>
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-6 drop-shadow-lg">
            Bring Hope to Children Without Classrooms
          </h3>
          <p className="text-white/90 text-sm sm:text-base mb-5 leading-relaxed">
            Help provide education, books, and safe learning spaces for children in rural areas who dream of a better future.
          </p>
          <div className="grid grid-cols-2 border-t border-white/30 mb-5">
            <div className="col-span-1 border-r border-white/30 px-3 sm:px-5 py-3 sm:py-4">
              <p className="text-xs text-white/70 mb-1">Raised</p>
              <h4 className="text-xl sm:text-2xl text-yellow-400">₹65,360</h4>
            </div>
            <div className="col-span-1 px-3 sm:px-5 py-3 sm:py-4">
              <p className="text-xs text-white/70 mb-1">Goal</p>
              <h4 className="text-xl sm:text-2xl text-white">₹124,500</h4>
            </div>
          </div>

          
          <div className="flex justify-center">
            <button
              onClick={() => donationInfo?.setIsDonationOpen(true)}

              className="cursor-pointer border-transparent bg-linear-to-r from-primary to-secondary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:from-transparent hover:to-transparent hover:text-primary border hover:border-primary"
            >
              Donate now
            </button>
            <Test />
          </div>
        </div>
      </div> */}
    </section>

  );
};

export default Hero;

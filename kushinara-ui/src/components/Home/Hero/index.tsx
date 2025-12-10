"use client";
import Slider from "react-slick";
import Image from "next/image";

const Hero = () => {

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
    // "https://observerbd.com/2018/04/29/1525021965.jpg",
    // "/images/hero/carousel-1.png",
    "/images/hero/carousel-5.png",
    // "/images/hero/carousel-3.png",
    // "https://timesasian.com/wp-content/uploads/2024/05/20240509_112807.jpg",
    // "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/monk-are-teacher-wichan-sumalee.jpg",
    // "https://www.newagebd.com/files/records/news/202205/170643_120.jpg",
  ];

  return (
      <section className="relative text-white  overflow-hidden mt-[56px] sm:mt-44 lg:mt-36">
      <div className="relative h-[20vh] sm:h-[65vh] md:h-[55vh] lg:h-[82vh] w-full -z-10">
        <Slider {...settings} className="h-full">
          {carouselImages.map((src, index) => (
            <div
              key={index}
              className="relative h-[20vh] sm:h-[65vh] md:h-[55vh] lg:h-[82vh] w-full"
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
              />

              {/* Optional dark overlay */}
              {/* <div className="absolute inset-0 bg-black/50" /> */}
            </div>
          ))}
        </Slider>
      </div>
    </section>


  );
};

export default Hero;

import React, { FC } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import SocialMediaShear from "@/components/SharedComponent/SocialMediaShear";
import { EventProps } from "@/types/EventProps";


const EventDetails: FC<EventProps> = ({
  title,
  detail,
  category,
  location,
  eventdate,
  duration,
  type,
  entrants,
  image
}) => {
  const formattedDate = eventdate
    ? format(new Date(eventdate), "MMM dd, yyyy")
    : "Date not available";

  const router = useRouter();
  const safeImage = image && image.trim() !== "" ? image : "/images/press-releases/press-releases.png";

  return (
    <section className="sm:mt-28 pt-28">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-sm text-muted hover:text-primary cursor-pointer transition"
          >
            ← Back to Event
          </button>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="lg:col-span-9 col-span-12">
            {
              safeImage && (
                <div className="flex  gap-6 col-span-4 pt-4 md:pt-0">
                  <Image
                    src={safeImage}
                    alt={`Banner image of ${title}`}
                    className="rounded-lg w-[100%] h-80 mb-6"
                    width={1170}
                    height={300}
                    quality={100}

                  />
                </div>
              )
            }
            <h1 className="text-4xl font-medium text-title">{title}</h1>
            <p className="text-description text-justify md:text-xl text-base my-8">{detail}</p>
          </div>
          <div className="lg:col-span-3 md:col-span-5 sm:col-span-6 col-span-12 lg:mt-0">
            <h4 className="text-title text-lg font-bold mb-6">Info</h4>
            <div className="pb-6 border-b border-primary mb-6">
              <table>
                <tbody>
                  <tr className="">
                    <td>
                      <h5 className="text-description font-semibold text-base pb-4">Category:</h5>
                    </td>
                    <td>
                      <p className="text-subtitle  text-base pb-4 pl-4">{category}</p>
                    </td>
                  </tr>
                  <tr className="">
                    <td>
                      <h5 className="text-description font-semibold text-base pb-4">Location:</h5>
                    </td>
                    <td>
                      <p className="text-subtitle text-base pb-4 pl-4">{location}</p>
                    </td>
                  </tr>
                  <tr className="">
                    <td>
                      <h5 className="text-description text-base font-semibold pb-4">Date:</h5>
                    </td>
                    <td>
                      <p className="text-subtitle text-base pb-4 pl-4">
                        {formattedDate}
                      </p>
                    </td>
                  </tr>

                  <tr className="">
                    <td>
                      <h5 className="text-description text-base font-semibold pb-4">Duration:</h5>
                    </td>
                    <td>
                      <p className="text-subtitle text-base pb-4 pl-4">{duration}</p>
                    </td>
                  </tr>
                  <tr className="">
                    <td>
                      <h5 className="text-description text-base font-semibold  pb-4">Type:</h5>
                    </td>
                    <td>
                      <p className="text-subtitle text-base pb-4 pl-4">{type}</p>
                    </td>
                  </tr>
                  <tr className="">
                    <td>
                      <h5 className="text-description text-base font-semibold pb-4">Entrants:</h5>
                    </td>
                    <td>
                      <p className="text-subtitle text-base pb-4 pl-4">{entrants}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <SocialMediaShear title={title!} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

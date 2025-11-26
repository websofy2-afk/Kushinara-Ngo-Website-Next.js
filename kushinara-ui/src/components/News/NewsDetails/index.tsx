"use client";
import SocialMediaShear from "@/components/SharedComponent/SocialMediaShear";
import { NewseProps } from "@/types/NewseProps";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NewsDetails: React.FC<NewseProps> = ({
  title,
  subtitle,
  date,
  summary,
  author,
  image,
  thumbnail,
  category,
}) => {
  const router = useRouter();
  const safeImage = image && image.trim() !== "" ? image : "/images/placeholder-banner.jpg";
  const safeThumbnail = thumbnail && thumbnail.trim() !== "" ? thumbnail : "/images/default-avatar.png";

  return (
    <section className="container bg-cardbg sm:mt-28 pt-28 mx-auto px-4 md:px-10">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-muted hover:text-primary cursor-pointer transition"
        >
          ← Back to News
        </button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-title mb-3">{title}</h1>
        {subtitle && <p className="text-lg text-subtitle">{subtitle}</p>}
        <div className="text-sm text-muted mt-3">
          <span>{date?.split("T")[0]}</span> • <span>By {author}</span> •{" "}
          <span className="capitalize">{category}</span>
        </div>
      </div>
      {safeImage && (
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-md">
          <Image
            src={safeImage}
            alt={`Banner image of ${title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="max-w-3xl pb-8 mx-auto text-description text-lg leading-relaxed">
        <p className="mb-6">{summary}</p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-10 border-t pt-6">
          <div className="flex items-center gap-3 text-title mb-4 md:mb-0">
            {safeThumbnail && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={safeThumbnail}
                  alt={`thumbnail image of ${author}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p>
                <span className="font-semibold">Author:</span> {author}
              </p>
              <p className="text-sm text-subtitle">Published on {date?.split("T")[0]}</p>
            </div>
          </div>
          <div className="flex  items-center justify-center sm:block ">
            <SocialMediaShear title={title!} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetails;







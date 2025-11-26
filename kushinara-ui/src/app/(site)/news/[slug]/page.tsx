"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NewsDetails from "@/components/News/NewsDetails";

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const { slug } = useParams();
    useEffect(() => {
      const fetchPressRelease = async () => {
        try {
          const res = await fetch("/api/auth/news");
          if (!res.ok) throw new Error("Failed to fetch");
          const result = await res.json();
          setNews(result?.data || []);
        } catch (error) {
          console.error("Error fetching donation records:", error);
        }
      };
      fetchPressRelease();
    }, []);

  const item = news?.find((item) => item._id === slug);

  return (
    <>
      <NewsDetails
        title={item?.title}
        subtitle={item?.subtitle}
        date={item?.date}
        summary={item?.summary}
        author={item?.author}
        image={item?.image}
        thumbnail={item?.thumbnail}
        category={item?.category}

      />
    </>
  );
};

export default News;

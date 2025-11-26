"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (typeof document !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      setTimeout(() => {
        if (token) {
          router.push("/signin");
        } else {
          // router.push("/signup");
          router.push("/signin");
        }
      }, 2000);
    }
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!loading) return null;

  return (
    <div className="flex h-screen items-center justify-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#FF00D4"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

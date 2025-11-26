"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { getVideoEmbedUrl } from "../../lib/getVideoEmbedUrl";
import { isYouTube } from "../../lib/isYouTube";
import { Icon } from '@iconify/react/dist/iconify.js'

export default function GalleryPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVideo, setModalVideo] = useState<string | null>(null);
    const [images, setImages] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);
    const videoRef = useRef<HTMLDivElement>(null);

    const scrollVideos = (direction: number) => {
        if (videoRef.current) {
            const width = videoRef.current.offsetWidth;
            videoRef.current.scrollBy({ left: width * direction, behavior: "smooth" });
        }
    };
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("/api/auth/gallery/photo");
                const result = await res.json();
                setImages(result?.data || []);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        const fetchVideos = async () => {
            try {
                const res = await fetch("/api/auth/gallery/video");
                const result = await res.json();
                setVideos(result?.data || []);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchImages();
        fetchVideos();
    }, []);

    return (
        <div className="min-h-screen px-4 md:px-16 pt-16">
            <h1 className="text-3xl text-title md:text-5xl font-bold mb-12 text-center">
                Every Picture Tells a Story of Hope
            </h1>
            <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mb-16">
                {images.length === 0 ? (
                    <div className="text-center text-gray-500">No photos uploaded.</div>
                ) : (
                    images.map((img) => (
                        <div
                            key={img._id}
                            className="relative mb-4 w-full rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                            data-aos="fade-up"
                        >
                            <Image
                                src={img.image}
                                alt={img.title}
                                width={400}
                                height={400}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        </div>
                    ))
                )}
            </section>
            <section>
                <h2 className="text-2xl md:text-4xl text-title text-center font-semibold mb-12 border-b-2 border-primary pb-2">
                    Videos
                </h2>

                <div className="flex items-center relative">
                    <button
                        className="cursor-pointer z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition"
                        onClick={() => scrollVideos(-1)}
                    >
                        <ChevronLeft />
                    </button>

                    <div
                        ref={videoRef}
                        className="flex overflow-x-hidden space-x-4 scrollbar-none scroll-smooth py-2 mx-4"
                    >
                        {videos.length === 0 ? (
                            <div className="text-center text-gray-500">No videos uploaded.</div>
                        ) : (
                            videos.map((vid) => {
                                const embedUrl = getVideoEmbedUrl(vid.video);
                                const youtube = isYouTube(vid.video);
                                return (
                                    <div
                                        key={vid._id}
                                        className="relative flex-shrink-0 w-80 h-40 rounded-lg overflow-hidden cursor-pointer group"
                                    >
                                        {youtube ? (
                                            <iframe
                                                src={embedUrl}
                                                className="w-full h-full rounded-lg"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <video
                                                src={vid.video}
                                                className="w-full h-full object-cover rounded-lg"
                                                muted
                                                loop
                                                autoPlay
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-opacity-30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2">
                                            <span className="text-white font-semibold">{vid.title}</span>
                                            <Eye
                                                className="text-white w-6 h-6 cursor-pointer"
                                                onClick={() => {
                                                    setModalVideo(vid.video);
                                                    setModalOpen(true);
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <button
                        className="cursor-pointer z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition"
                        onClick={() => scrollVideos(1)}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </section>

            {modalOpen && modalVideo && (
                <div className="fixed inset-0 z-50 bg-opacity-70 flex backdrop-blur-sm justify-center items-center p-4">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="absolute top-4 right-4 z-[9999] 
               p-3 bg-white rounded-full shadow hover:bg-gray-200 cursor-pointer"
                        aria-label="Close video Modal">
                        <Icon icon="ic:round-close" className="cursor-pointer text-2xl" />
                    </button>
                    <div className="relative z-[5000] max-w-3xl w-full px-4">
                        {
                            isYouTube(modalVideo) ?
                                <iframe
                                    src={getVideoEmbedUrl(modalVideo)}
                                    className="w-full h-96 md:h-[500px] rounded"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                :
                                <video
                                    src={modalVideo}
                                    controls
                                    className="w-full h-96 md:h-[500px] rounded"
                                ></video>}
                    </div>
                </div>
            )}
        </div>
    );
}
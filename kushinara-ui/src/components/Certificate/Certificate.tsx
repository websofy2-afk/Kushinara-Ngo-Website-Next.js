"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { Eye, DownloadCloud } from "lucide-react";

export default function CertificatesSection() {
    const [selected, setSelected] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [radius, setRadius] = useState(250);
    const [isClient, setIsClient] = useState(false);
    const [certificate, setCertificate] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        if (!isClient) return;
        const update = () => {
            const w = window.innerWidth;
            if (w < 640) setRadius(110);
            else if (w < 1024) setRadius(180);
            else setRadius(250);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [isClient]);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await fetch("/api/auth/certificate");
                if (!res.ok) throw new Error("Failed to fetch");
                const result = await res.json();
                setCertificate(result || []);
            } catch (error) {
                console.error("Error fetching donation records:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const openModal = async (cert: any) => {
        setSelected(cert);
        setIsOpen(true);
        document.body.style.overflow = "hidden";

        try {
            const res = await fetch(`/api/auth/certificate/${cert._id}`);
            if (!res.ok) throw new Error("Failed to load PDF");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (err) {
            console.error("Error fetching PDF:", err);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelected(null);
        setPdfUrl(null);
        document.body.style.overflow = "";
    };

    const downloadCert = async (cert: any) => {
        try {
            const res = await fetch(`/api/auth/certificate/${cert._id}`);
            if (!res.ok) throw new Error("Download failed");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = cert.filename || "certificate.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    const total = certificate.length;
    return (
        <>
            <section className="relative overflow-hidden">
                <div
                    className="w-full flex flex-col items-center justify-center pt-16 px-6 md:px-12"
                    data-aos="fade-up"
                >
                    <h1
                        className="text-3xl text-title md:text-5xl font-extrabold text-center leading-tight"
                        data-aos="zoom-in"
                    >
                        Official Certifications & Recognitions
                    </h1>
                    <p
                        className="mt-6 max-w-5xl text-justify text-description text-base md:text-xl leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Discover the official certifications and recognitions that honor the commitment,
                        integrity, and trusted service of Buddha Bhumi Kushinara Charitable Trust.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {isClient && (
                        <div className="relative flex justify-center items-center min-h-[550px] sm:min-h-[600px] md:min-h-[700px]">
                            <div
                                className="absolute flex flex-col items-center justify-center text-center rounded-full shadow-2xl z-10"
                                style={{
                                    width: radius * 1.5,
                                    height: radius * 1.5,
                                    background:
                                        "radial-gradient(circle, #fff8e1 0%, #fde68a 40%, #fef9c3 100%)",
                                }}
                                data-aos="zoom-in"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-title-800">
                                    Buddha Bhumi Kushinara
                                </h3>
                                <p className="text-subtitle text-sm md:text-base mt-1">
                                    Charitable Trust Certificates
                                </p>
                            </div>
                            <div
                                className="relative flex items-center justify-center"
                                style={{
                                    width: (radius + 200) * 2,
                                    height: (radius + 200) * 2,
                                }}
                            >
                                {certificate.length === 0 ? (
                                    <div>No certificates found.</div>
                                ) : (
                                    certificate.map((cert, i) => {
                                        const angle = (360 / total) * i;
                                        const x = (radius + 50) * Math.cos((angle * Math.PI) / 180);
                                        const y = (radius + 50) * Math.sin((angle * Math.PI) / 180);

                                        return (
                                            <div
                                                key={cert._id}
                                                data-aos="zoom-in-up"
                                                data-aos-delay={i * 100}
                                                className="absolute group transition-transform"
                                                style={{
                                                    transform: `translate(${x}px, ${y}px)`,
                                                }}
                                            >
                                                <div className="relative cursor-pointer w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white/90 hover:scale-105 transition-all">
                                                    <Image
                                                        src="/images/certification/certificate-thumbnil.png"
                                                        alt={cert.filename}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => openModal(cert)}
                                                            className="bg-white/90 rounded-full p-2 hover:scale-110 transition"
                                                            title="View"
                                                        >
                                                            <Eye className="text-primary cursor-pointer" size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() => downloadCert(cert)}
                                                            className="bg-white/90 rounded-full p-2 hover:scale-110 transition"
                                                            title="Download"
                                                        >
                                                            <DownloadCloud className="text-error cursor-pointer" size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-center mx-3 text-xs mt-2 text-title w-28">
                                                    {cert.title}
                                                </p>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {isOpen && selected && (
                    <div
                        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-cardbg rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {selected.filename}
                                </h4>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-900 cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-4">
                                {pdfUrl ? (
                                    <iframe
                                        src={pdfUrl}
                                        className="w-full h-[70vh]"
                                        title={selected.filename}
                                    />
                                ) : (
                                    <p>Loading PDF...</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-extrabold mb-8 md:text-4xl text-title">
                        Our Global Partners
                    </h2>
                    <p className="max-w-3xl text-base md:text-xl mx-auto text-description mb-10">
                        We proudly collaborate with organizations and communities around the world to drive change in education, health, and sustainable development.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-10 px-6">
                        {[
                            { name: "UNICEF", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVLiVI_YxoXAdQkopQqVfunSAtCHyfuL8zxA&s" },
                            { name: "WHO", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQuNV2uGr4x3iBtI-RaUddpeUWTLDEdGdd4w&s" },
                            { name: "UNESCO", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIqGoJgUeJnyphM2U_vaXihyL2tYYD-DyMjEb_0BOvNnb9cK30HqbDHKSg5JRXW40ea0c&usqp=CAU" },
                            { name: "Save the Children", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAsphfLOMlR7efpYqQvO31cxg5sti2jHfrCQ&s" },
                        ].map((partner, i) => (
                            <div
                                key={i}
                                data-aos="zoom-in"
                                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl bg-white/90 group cursor-pointer"
                            >
                                <Image
                                    src={partner.img}
                                    alt={partner.name}
                                    fill
                                    className="object-cover rounded-full transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                                    <p className="text-white text-sm md:text-lg font-bold text-center px-2">
                                        {partner.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}


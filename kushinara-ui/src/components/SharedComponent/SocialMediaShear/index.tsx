import React from 'react'
import { Facebook, LinkedIn, LinkUrl, Twitter, WhatsApp } from '../SocialMediaIcon'

const SocialMediaShear = ({ title }: { title?: string }) => {
    const handleShare = (platform: string) => {
        const url = typeof window !== "undefined" ? window.location.href : "/images/event/event-banner.png";
        const encodedUrl = encodeURIComponent(url);
        const text = encodeURIComponent(title ?? "");
        let shareUrl = "";
        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case "whatsapp":
                shareUrl = `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`;
                break;
            case "copy":
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
                return;
        }
        window.open(shareUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="flex items-center gap-4">
            <p className="font-medium text-title">Share :</p>
            <button onClick={() => handleShare("whatsapp")} className="hover:scale-110 transition">
                <WhatsApp color="error" />
            </button>
            <button onClick={() => handleShare("facebook")} className="hover:scale-110 transition">
                <Facebook color="blue-600" />
            </button>
            <button onClick={() => handleShare("twitter")} className="hover:scale-110 transition">
                <Twitter color="twitter" />
            </button>
            <button onClick={() => handleShare("linkedin")} className="hover:scale-110 transition">
                <LinkedIn color="linkedIn" />
            </button>
            <button onClick={() => handleShare("copy")} className="hover:scale-110 transition">
                <LinkUrl />
            </button>
        </div>
    )
}

export default SocialMediaShear
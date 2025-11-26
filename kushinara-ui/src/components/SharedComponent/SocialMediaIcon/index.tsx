import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { FC } from "react";

interface SocialMediaProps {
    fbUrl?: string;
    instUrl?: string;
    linkedInUrl?: string;
    youtubeUrl?: string;
    wtsUrl?: string;
    linkUrl? : string;
    xUrl?: string;
    color?: string;
}

export const Facebook: FC<SocialMediaProps> = ({ fbUrl = '#', color = 'black' }) => {
    return (
        <Link href={fbUrl!}>
            <Icon
                icon="ri:facebook-fill"
                className={`text-xl text-${color} hover:text-[#1877F2] cursor-pointer`}
            />
        </Link>
    )
}

export const Instagram: FC<SocialMediaProps> = ({ instUrl = '#', color = 'black' }) => {
    return (
        <Link href={instUrl!}>
            <Icon
                icon="mdi:instagram"
                className={`text-xl text-${color} hover:text-[#E1306C] cursor-pointer`}
            />
        </Link>
    )
}
export const LinkedIn: FC<SocialMediaProps> = ({ linkedInUrl = '#', color = 'black' }) => {
    return (
        <Link href={linkedInUrl!}>
            <Icon
                icon="ri:linkedin-fill"
                className={`text-xl text-${color} hover:text-[#0077B5] cursor-pointer`}
            />
        </Link>
    )
}

export const Youtube: FC<SocialMediaProps> = ({ youtubeUrl = '#', color = 'black' }) => {
   
    return (
        <Link href={youtubeUrl!}>
            <Icon
                icon="line-md:youtube"
                className={`text-xl text-${color} hover:text-red-500 cursor-pointer`}
            />
        </Link>
    )
}

export const Twitter: FC<SocialMediaProps> = ({ xUrl = '#', color = 'black' }) => {
    return (
        <Link href={xUrl!}>
            <Icon
                icon="line-md:twitter-x-alt"
                className={`text-xl text-${color} hover:text-[#1DA1F2] cursor-pointer`}
            />
        </Link>
    )
}

export const LinkUrl: FC<SocialMediaProps> = ({ linkUrl = '#', color = 'black' }) => {
    return (
        <Link href={linkUrl!}>
            <Icon
                icon="mdi:link-variant"
                className={`text-xl text-${color} hover:text-[#1DA1F2] cursor-pointer`}
            />
        </Link>
    )
}
export const WhatsApp: FC<SocialMediaProps> = ({ wtsUrl = '#', color = 'black' }) => {
    return (
        <Link href={wtsUrl!}>
            <Icon
                icon="mdi:whatsapp"
                className={`text-xl text-${color} hover:text-[#25D366] cursor-pointer`}
            />
        </Link>
    )
}
import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Kushinara",
    href: "#",
    submenu: [
      { label: "About Us", href: "/about-us" },
      { label: "Certificate", href: "/certificate" },
    ],
  },
  {
    label: "Programs",
    href: "#",
    submenu: [
      { label: "Education", href: "/education" },
      { label: "Health", href: "/health" },
      { label: "Community Development ", href: "/community-development" },

    ],
  },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },

  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
];

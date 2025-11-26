import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { Metadata } from 'next';

const outfit = Outfit({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Buddh Bhumi Kushinara Charitable Trust | Focused on Culture, Education, Health, and Awareness",
  description:
    "Buddha Bhumi Kushinara Charitable Trust is a non-profit organization committed to fostering holistic growth through initiatives in Culture, Education, Health, and Awareness.",
  icons: {
    icon: "/images/auth-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
          <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}

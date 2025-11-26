import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import { DonationProvider } from "./context/donationContext";
import NextTopLoader from 'nextjs-toploader';
import { JoinUsProvider } from "./context/JoinUsContext";
import { EventProvider } from "./context/EventContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  session: any
}>) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Toaster position="top-center" />
        <NextTopLoader color="#FF4D7E" />
        <JoinUsProvider>
          <EventProvider>
            <DonationProvider>
              <Aoscompo>
                <Header />
                {children}
                <Footer />
              </Aoscompo>
              <ScrollToTop />
            </DonationProvider>
          </EventProvider>
        </JoinUsProvider>
      </body>
    </html>
  );
}

import Link from 'next/link'
import React, { useContext } from 'react'
import Logo from '../Logo'
import DonationFormContext from '@/app/context/donationContext'
import { Donation } from '@/components/Home/Hero/Donation'
import { Icon } from '@iconify/react/dist/iconify.js'

const LogoBar = () => {
  const info = useContext(DonationFormContext);
  const donationInfo = useContext(DonationFormContext);

  
  return (
    <div>
      <div className="px-4 container bg-white lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) sm:flex lg:justify-between justify-center py-5 hidden">
        <div className="lg:block hidden">
          <Logo />
        </div>

        <div className="flex items-center">
          <div className="flex gap-3 py-2 pr-6 border-r justify-center items-center ">
            <Icon
              icon="mdi:email"
              className="text-3xl text-muted"
            />
            <div className="">
              <p className="text-sm font-normal text-muted mb-0">
                Email us at
              </p>
              <Link href="mailto:info@gmail.com" className="text-base font-semibold mb-0 hover:text-primary">
                info@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex gap-3 justify-center items-center py-2 pl-6">
            <Icon
              icon="mdi:phone"
              className="text-3xl text-muted"
            />
            <div className="">
              <p className="text-sm font-normal text-muted dark:text-white/60 mb-0">
                Call us now
              </p>
              <Link href="tel:+917030513954" className="text-base font-semibold mb-0 hover:text-primary">
                
                +91-7030513954
              </Link>
            </div>
          </div>
          <button onClick={() => info?.setIsDonationOpen(true)} className="text-error text-sm cursor-pointer font-semibold border border-error py-4 px-7 rounded-md ml-8 hover:bg-error hover:text-white">
            Donate Now
          </button>
        </div>
      </div>
      {donationInfo?.isDonationOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 m-0!">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center">
            <button
              onClick={() => donationInfo?.setIsDonationOpen(false)}
              className=" hover:bg-gray-200 p-1 rounded-full absolute -right-3 mr-8 top-10"
              aria-label="Close Sign In Modal"
            >
              <Icon icon="ic:round-close" className="cursor-pointer text-2xl" />
            </button>
            <Donation />
          </div>
        </div>
      )}
    </div>
  )
}

export default LogoBar
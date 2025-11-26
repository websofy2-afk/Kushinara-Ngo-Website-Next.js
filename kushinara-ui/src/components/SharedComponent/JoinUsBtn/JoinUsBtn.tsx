// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import JoinUs from "@/components/Auth/JoinUs";

// const JoinUsButton = ({
//   isMobile = false,
//   onCloseMobileMenu,
// }: {
//   isMobile?: boolean;
//   onCloseMobileMenu?: () => void;
// }) => {
//   const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);
//   const joinUsRef = useRef<HTMLDivElement>(null);

//   // Close modal when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (joinUsRef.current && !joinUsRef.current.contains(event.target as Node)) {
//         setIsJoinUsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Disable body scroll when modal is open
//   useEffect(() => {
//     document.body.style.overflow = isJoinUsOpen ? "hidden" : "";
//   }, [isJoinUsOpen]);

//   const openModal = () => {
//     setIsJoinUsOpen(true);
//     if (isMobile && onCloseMobileMenu) onCloseMobileMenu(); // close mobile sidebar
//   };

//   return (
//     <>
//       {/* Join Us Button */}
//       <button
//         onClick={openModal}
//         className={`${
//           isMobile
//             ? "w-full bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-darkprimary hover:text-white"
//             : "hidden lg:block bg-error text-sm hover:bg-error/90 text-white px-4 py-3.5 leading-none rounded-lg font-medium text-nowrap"
//         }`}
//       >
//         Join Us
//       </button>

//       {/* Modal */}
//       {isJoinUsOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8">
//           <div
//             ref={joinUsRef}
//             className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[50em] rounded-2xl bg-white dark:bg-dark px-5 sm:px-8 py-8 sm:py-12 text-center shadow-lg"
//           >
//             <button
//               onClick={() => setIsJoinUsOpen(false)}
//               className="absolute top-6 right-3 p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//               aria-label="Close Join Us Modal"
//             >
//               <Icon icon="ic:round-close" className="text-2xl cursor-pointer text-gray-700 dark:text-white" />
//             </button>
//             <JoinUs joinInOpen={(value: boolean) => setIsJoinUsOpen(value)} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default JoinUsButton;


"use client";
import React from "react";

interface JoinUsButtonProps {
  isMobile?: boolean;
  onClick?: () => void;
}

const JoinUsButton: React.FC<JoinUsButtonProps> = ({ isMobile = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${isMobile
          ? "w-full bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-darkprimary hover:text-white"
          : "hidden lg:block bg-error text-sm hover:bg-error/90 text-white px-4 py-3.5 leading-none rounded-lg font-medium text-nowrap"
        } cursor-pointer`}
    >
      Join Us
    </button>
  );
};

export default JoinUsButton;

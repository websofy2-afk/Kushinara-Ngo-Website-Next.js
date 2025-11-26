import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center justify-center sm:justify-start">
      <div className="flex flex-row items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
        <Image
          src="/images/logo/logo.png"
          alt="Buddh Bhumi Logo"
          width={80}
          height={80}
          quality={100}
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
        />

        <div className="flex flex-col justify-center text-left">
          <p className="font-semibold text-title text-sm sm:text-base md:text-lg lg:text-xl leading-snug">
            Buddh Bhumi Kushinara Charitable Trust
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-subtitle leading-tight">
            (Focused on Culture, Education, Health, and Awareness)
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;

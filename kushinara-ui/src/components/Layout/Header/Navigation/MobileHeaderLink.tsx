import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const path = usePathname();
  let navString

  const counterLetter = item.label.slice(-1);
  if (counterLetter === "s") {
    navString = item.label.toLowerCase().substring(item.label.length - 1, - 1);
  } else {
    navString = item.label.toLowerCase();
  }

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={item.submenu ? handleToggle : undefined}
        className={`flex items-center justify-between w-full py-2 px-3 text-black rounded-md focus:outline-hidden  ${path.startsWith(`/${navString}`) ? "bg-primary! text-white!" : null} ${path === item.href ? "bg-primary! text-white! " : ""
          }`}
      >
        {item.label}
        {item.submenu && (
          <ChevronDown size={20} className="top-[4px] relative" />
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block py-2 px-3 text-gray-500  ${path === subItem.href ? "text-primary!" : null}`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;

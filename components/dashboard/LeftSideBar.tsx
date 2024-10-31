"use client"

import { UserButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky w-60 py-10 flex flex-col items-center gap-12 min-h-[600px] bg-gray-900 shadow-xl max-lg:hidden">
      <Image src="/logos/logo-wide.webp" alt="logo" width={150} height={50} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-green-1" : "text-gray-1"
              }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center mt-4">
        <UserButton
          appearance={{
            layout: {
              logoPlacement: "none",
            },
            elements: {
              userButtonAvatarBox: "h-9 w-9",
            },
          }}
        />
        <p>
          <SignOutButton>
            <button className="text-gray-2">Sign out</button>
          </SignOutButton>
        </p>
      </div>
    </div>
  );
};

export default LeftSideBar;

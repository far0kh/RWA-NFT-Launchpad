"use client"

import { UserButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky w-60 flex flex-col items-center justify-end min-h-[600px] bg-gray-900 shadow-xl max-lg:hidden">
      <div className="flex flex-col gap-14 h-full w-full px-8 pt-10">

        <div className="flex gap-4 text-body-medium items-center">
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
            <SignOutButton redirectUrl="/log-in">
              <button className="text-gray-2">Sign out</button>
            </SignOutButton>
          </p>
        </div>

        <div className="flex flex-col gap-10 ps-3">
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
      </div>

      <div className="flex flex-col justify-end items-center h-full w-full p-2">
        <Link href="https://www.tezuka.xyz">
          <Image src="/logos/logo-wide.webp" alt="logo" width={90} height={30} />
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;

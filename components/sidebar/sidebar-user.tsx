"use client"

import {
  ChevronsUpDown,
  LogOut,
  UserRoundIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useClerk, useUser, useAuth } from '@clerk/nextjs'
import Link from "next/link"

export const SignOutButton1 = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button onClick={() => signOut({ redirectUrl: '/' })}>Sign out</button>
  )
}
export const SignOutButton = () => {
  const clerk = useClerk();
  console.log(clerk);
  const { signOut } = clerk;
  return (
    <button
      className="flex text-gray-300 w-full"
      onClick={async () => await signOut({ redirectUrl: "/log-in" })}
    >
      <LogOut className="h-5 w-5" />
      <span className="text-sm ml-2">Log out</span>
    </button>
  )
}

export function SidebarUser() {
  const { isMobile } = useSidebar()

  const { user, isLoaded } = useUser()

  const { sessionId } = useAuth()

  if (!sessionId) {
    console.log("not sessionId");
    return null;
  }

  if (!isLoaded) {
    console.log("not isLoaded");
    // Handle loading state however you like
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.imageUrl} alt="Tezuka Artist" />
                <AvatarFallback className="rounded-lg">
                  {user?.emailAddresses[0]?.emailAddress.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-xs">{user?.emailAddresses[0]?.emailAddress}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.imageUrl} alt="Tezuka Artist" />
                  <AvatarFallback className="rounded-lg">
                    {user?.emailAddresses[0]?.emailAddress.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.fullName}</span>
                  <span className="truncate text-xs">{user?.emailAddresses[0]?.emailAddress}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/profile" className="flex text-gray-300 w-full">
                  <UserRoundIcon className="h-5 w-5" />
                  <span className="text-sm ml-2">My Profile</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem>
              <SignOutButton />
              {/* <SignOutButton redirectUrl="/log-in" signOutOptions={{ sessionId, redirectUrl: "/log-in" }}>
                <div className="flex text-gray-300 w-full cursor-pointer">
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm ml-2">Log out</span>
                </div>
              </SignOutButton> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

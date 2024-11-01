"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
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

import { useUser, SignOutButton } from '@clerk/clerk-react'

export function SidebarUser() {
  const { isMobile } = useSidebar()

  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    // Handle loading state however you like
    return null
  }
  console.log(user);

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
              <a href="/profile">
                <DropdownMenuItem>
                  <Sparkles />
                  <span>Profile</span>
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
            <SignOutButton redirectUrl="/log-in">
              <DropdownMenuItem>
                <button className="flex text-gray-300">
                  <LogOut />
                  <span className="text-base ml-2">Log out</span>
                </button>
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

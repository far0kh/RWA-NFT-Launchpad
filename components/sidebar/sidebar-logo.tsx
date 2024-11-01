"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

export function SidebarLogo() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
            <Link href="https://www.tezuka.xyz">
              <Image src="/logos/logo.webp" alt="logo" width={32} height={32} />
            </Link>
          </div>
          <div className="grid flex-1 text-left text-base leading-tight">
            <span className="truncate font-semibold">
              Tezuka
            </span>
            <span className="truncate text-xs ps-1">Artist Dashboard</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

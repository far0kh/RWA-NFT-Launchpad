"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { navLinks } from "@/lib/constants";

export function SidebarNav() {
  // const { isMobile } = useSidebar()

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu className="gap-4 my-4">
        {navLinks.map((link, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton tooltip={link.label} asChild>
              <a href={link.url}>
                <link.icon />
                <span>{link.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

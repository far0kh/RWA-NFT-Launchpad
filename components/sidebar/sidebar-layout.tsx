"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import { SidebarLogo } from "@/components/sidebar/sidebar-logo"
import { SidebarNav } from "@/components/sidebar/sidebar-nav"
import { SidebarUser } from "@/components/sidebar/sidebar-user"
import { SidebarSettings } from "@/components/sidebar/sidebar-settings"

export function SidebarLayout({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarNav />
        <SidebarSeparator />
        <SidebarSettings />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

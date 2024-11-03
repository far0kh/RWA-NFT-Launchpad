"use client"

import {
  ChevronRight,
  UserRoundPen,
  Moon,
  type LucideIcon
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function SidebarSettings() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="mb-2">Settings</SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {/* ---------------- Profile ---------------- */}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Profile" asChild>
            <a href="/profile">
              <UserRoundPen />
              <span>Profile</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* ---------------- Theme ---------------- */}
        <Collapsible
          asChild
          defaultOpen={false}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Theme">
                <Moon />
                <span>Theme</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href={"#"}>
                      <span>Light</span>
                    </a>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubButton asChild>
                    <a href={"#"}>
                      <span>Dark</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  )
}

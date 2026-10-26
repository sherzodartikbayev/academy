"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Braces,
  BriefcaseBusiness,
  Bug,
  Camera,
  Cat,
  CircleGauge,
  GitCompareArrows,
  Home,
  Play,
  Rss,
  Send,
  Terminal,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbar_items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Startups</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {startups.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="flex items-center border-t group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-x-2 pt-2">
            {social_items.map((item) => (
              <Button variant="ghost" size="icon" key={item.href}>
                <Link href={item.href}>
                  <item.icon />
                </Link>
              </Button>
            ))}
          </div>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

const navbar_items = [
  { title: "Home", href: "/", icon: Home },
  { title: "Courses", href: "/courses", icon: Braces },
  { title: "Projects", href: "/projects", icon: Terminal },
  { title: "Source codes", href: "/source-codes", icon: Bug },
  { title: "Dashboard", href: "/dashboard", icon: CircleGauge },
];

const startups = [
  { title: "Blogs", href: "/blogs", icon: Rss },
  { title: "Resume builder", href: "/resume-builder", icon: UserPen },
  { title: "Beautiful code", href: "/beautiful-code", icon: GitCompareArrows },
];

const social_items = [
  { title: "Telegram", href: "https://t.me/sherzod_artikbayev", icon: Send },
  {
    title: "Instagram",
    href: "https://www.instagram.com/sherzodartikbayevvv",
    icon: Camera,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/sherzodartikbayev/",
    icon: BriefcaseBusiness,
  },
  { title: "Youtube", href: "https://www.youtube.com", icon: Play },
  {
    title: "GitHub",
    href: "https://www.github.com/sherzodartikbayev",
    icon: Cat,
  },
];

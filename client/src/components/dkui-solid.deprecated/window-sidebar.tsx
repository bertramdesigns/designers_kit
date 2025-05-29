import { For } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "~/components/dkui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../solidui/avatar";
import {
  FaSolidHouse,
  FaSolidBook,
  FaSolidMugHot,
  FaSolidCompassDrafting,
  FaSolidArrowRightArrowLeft,
} from "solid-icons/fa";
import { Show } from "solid-js/web";
import { authState } from "~/store/authStore";

export function WindowSidebar() {
  const location = useLocation();
  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaSolidHouse color="currentColor" />,
      route: "/",
      disabled: false,
    },
    {
      title: "Research",
      icon: <FaSolidBook />,
      route: "/research",
      disabled: true,
    },
    {
      title: "Productivity",
      icon: <FaSolidMugHot />,
      route: "/productivity",
      disabled: false,
    },
    {
      title: "Create",
      icon: <FaSolidCompassDrafting />,
      route: "/create",
      disabled: true,
    },
    {
      title: "File Utils",
      icon: <FaSolidArrowRightArrowLeft />,
      route: "/file-utils",
      disabled: true,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={menuItems}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      as={A}
                      href={item.route}
                      isActive={location.pathname === item.route}
                      aria-disabled={item.disabled}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton
                as={A}
                href={"login"}
                isActive={
                  location.pathname === "/login" ||
                  location.pathname === "/register" ||
                  location.pathname === "/profile"
                }
              >
                <Show when={authState.isAuthenticated}>
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/150" />
                    <AvatarFallback>DK</AvatarFallback>
                  </Avatar>
                  <span>{authState.user.name}</span>
                </Show>
                <Show when={!authState.isAuthenticated}>
                  <span>Log in</span>
                </Show>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

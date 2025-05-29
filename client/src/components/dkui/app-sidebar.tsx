import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  HouseIcon,
  BookIcon,
  CoffeeIcon,
  PencilRulerIcon,
  FadersHorizontalIcon,
} from "@phosphor-icons/react";
import { useLocation, Link } from "@tanstack/react-router";

const menuItems = [
  {
    title: "Dashboard",
    icon: <HouseIcon color="currentColor" />,
    route: "/",
    disabled: false,
  },
  {
    title: "Research",
    icon: <BookIcon />,
    route: "/research",
    disabled: true,
  },
  {
    title: "Productivity",
    icon: <CoffeeIcon />,
    route: "/productivity",
    disabled: false,
  },
  {
    title: "Create",
    icon: <PencilRulerIcon />,
    route: "/create",
    disabled: true,
  },
  {
    title: "File Utils",
    icon: <FadersHorizontalIcon />,
    route: "/file-utils",
    disabled: true,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      {/* <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter /> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.route}
                    aria-disabled={item.disabled}
                  >
                    <Link to={item.route}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
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
      </SidebarFooter> */}
    </Sidebar>
  );
}

import { Component, ComponentProps, splitProps } from "solid-js";
import { WindowSidebar } from "~/components/dkui/window-sidebar";
import { SidebarProvider } from "~/components/dkui/sidebar";
import { WindowTitlebar } from "~/components/dkui/window-titlebar";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem,
} from "~/components/solidui/breadcrumb";
import { ColorModeProvider } from "@kobalte/core";
import { cn } from "~/lib/utils";

/**
 * A layout component that fills the window.
 */
const Window: Component<ComponentProps<"div">> = (props) => {
  const [local, _] = splitProps(props, ["class", "children"]);
  // path and strip slashes
  const pageName = window.location.pathname.replace(/^\/|\/$/g, "");

  return (
    <>
      <ColorModeProvider>
        <SidebarProvider>
          <div class={cn("fixed inset-0 flex flex-col", local.class)}>
            <WindowTitlebar />
            <div class="flex flex-row flex-1">
              <WindowSidebar />
              <main class="container">
                <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink current>{pageName}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  {local.children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </ColorModeProvider>
    </>
  );
};

export { Window };

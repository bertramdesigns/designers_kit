import { Component, ComponentProps, splitProps } from "solid-js";
import { WindowSidebar } from "~/components/dkui/window-sidebar";
import { SidebarProvider } from "~/components/dkui/sidebar";
import { WindowTitlebar } from "~/components/dkui/window-titlebar";
import { ColorModeProvider } from "@kobalte/core";
import { cn } from "~/lib/utils";

/**
 * A layout component that fills the window.
 */
const Window: Component<ComponentProps<"div">> = (props) => {
  const [local, _] = splitProps(props, ["class", "children"]);

  return (
    <>
      <ColorModeProvider>
        <SidebarProvider>
          <div class={cn("fixed inset-0 flex flex-col", local.class)}>
            <WindowTitlebar />
            <div class="flex flex-row flex-1">
              <WindowSidebar />
              <main class="container">{local.children}</main>
            </div>
          </div>
        </SidebarProvider>
      </ColorModeProvider>
    </>
  );
};

export { Window };

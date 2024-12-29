import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/utils";

const TitleBar: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  return (
    <div
      data-tauri-drag-region
      class="relative flex w-full mh-11 flex-row justify-between bg-titlebar border text-titlebar-foreground"
      {...others}
    >
      {local.children}
    </div>
  );
};
const TitleBarGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-tauri-drag-region
      date-titlebar="group"
      class={cn(
        "relative flex items-center min-w-min flex-row p-1",
        local.class
      )}
      {...others}
    />
  );
};
const TitleBarGroupContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-tauri-drag-region
      date-titlebar="group-content"
      class={cn("flex-initial text-sm", local.class)}
      {...others}
    />
  );
};

export { TitleBar, TitleBarGroup, TitleBarGroupContent };

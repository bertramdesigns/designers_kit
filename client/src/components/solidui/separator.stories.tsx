import { Separator } from "./separator";
import { cn } from "~/lib/utils";

import { ComponentProps } from "solid-js";

type SeparatorProps = ComponentProps<typeof Separator>;

const meta = {
  title: "Separator",
  component: Separator,
  render: ({ ...args }) => (
    <div
      class={cn(
        "flex space-y-4 w-96 h-full justify-between",
        args.orientation === "vertical" ? "flex-row" : "flex-col"
      )}
    >
      <div class="space-y-1 flex-column max-w-52">
        <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
        <p class="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <div>
        <Separator orientation={args.orientation} />
      </div>
      <div
        class={cn(
          "flex text-sm",
          args.orientation === "vertical"
            ? "flex-col content-end"
            : "h-5 space-x-4 items-center"
        )}
      >
        <div>Blog</div>
        <div>Docs</div>
        <div>Source</div>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = SeparatorProps;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};

import { Button } from "./button";
import { ComponentProps } from "solid-js";

type ButtonCustomProps = ComponentProps<typeof Button> & { label?: string };

const meta = {
  title: "Button",
  component: Button,
  render: ({ label = "Button", ...args }) => <Button {...args}>{label}</Button>,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    variant: "default",
  },
  argTypes: {
    variant: {
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = ButtonCustomProps;

export const Default: Story = {
  args: {
    size: "default",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
  },
};

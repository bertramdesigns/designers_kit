import { WindowTitlebar } from "./window-titlebar";
import { ComponentProps } from "solid-js";

type TitlebarProps = ComponentProps<typeof WindowTitlebar>;

const meta = {
  title: "Window Titlebar",
  component: WindowTitlebar,
  render: ({}) => <WindowTitlebar />,
  parameters: {
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
};

export default meta;

type Story = TitlebarProps;

export const Default: Story = {};

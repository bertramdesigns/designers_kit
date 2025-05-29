import { Combobox } from "./combobox";
import { ComponentProps } from "solid-js";

type ComboboxCustomProps = ComponentProps<typeof Combobox>;

const meta = {
  title: "Combobox",
  component: Combobox,
  render: ({ ...args }) => <Combobox {...args} />,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    listItems: [
      {
        label: "Verbier",
        value: "Verbier2023",
      },
      {
        label: "Zermatt",
        value: "Zermatt2023",
      },
      {
        label: "St. Moritz",
        value: "StMoritz2023",
      },
      {
        label: "Davos",
        value: "Davos2023",
      },
    ],
  },
};

export default meta;

type Story = ComboboxCustomProps;

export const Default: Story = {};

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { ComponentProps } from "solid-js";

type DropdownMenuCustomProps = ComponentProps<typeof DropdownMenu>;

const meta = {
  title: "Dropdown Menu",
  component: DropdownMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button<"button">}>
        Git Settings
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-48">
        <DropdownMenuItem>
          <span>Commit</span>
          <DropdownMenuShortcut>⌘+K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Push</span>
          <DropdownMenuShortcut>⇧+⌘+K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Update Project</span>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub overlap>
          <DropdownMenuSubTrigger>GitHub</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Create Pull Request…</DropdownMenuItem>
              <DropdownMenuItem>View Pull Requests</DropdownMenuItem>
              <DropdownMenuItem>Sync Fork</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Open on GitHub</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={false}>
          Show Git Log
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={true}>
          Show History
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Branches</DropdownMenuGroupLabel>
          <DropdownMenuRadioGroup value="branch">
            <DropdownMenuRadioItem value="main">main</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="develop">
              develop
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
};

export default meta;

type Story = DropdownMenuCustomProps;

export const Default: Story = {};

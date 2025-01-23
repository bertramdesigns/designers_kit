import { For } from "solid-js";

import type { Row } from "@tanstack/solid-table";

import { IconDots } from "~/components/icons";
import { Button } from "~/components/solidui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
} from "~/components/solidui/dropdown-menu";

import { deleteTask } from "~/store/taskStore";

type TableRowActionsProps = {
  row: Row<any>;
  labels: { value: string; label: string }[];
};

export function TableRowActions(props: TableRowActionsProps) {
  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger
        as={Button<"button">}
        variant="ghost"
        class="flex size-8 p-0 data-[state=open]:bg-muted"
      >
        <IconDots />
        <span class="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            console.log("Edit", props.row);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub overlap>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={props.row.original.label}>
                <For each={props.labels}>
                  {(label) => (
                    <DropdownMenuRadioItem value={label.value}>
                      {label.label}
                    </DropdownMenuRadioItem>
                  )}
                </For>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Delete", props)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

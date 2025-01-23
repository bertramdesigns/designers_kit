import type { Table } from "@tanstack/solid-table";

import { IconX } from "~/components/icons";
import { Button } from "~/components/solidui/button";
import { TextField, TextFieldInput } from "~/components/solidui/text-field";

import { TableFacetedFilter } from "./table-faceted-filter";
import { TableViewOptions } from "./table-view-options";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  priorities: { value: string; label: string; icon: any }[];
  statuses: { value: string; label: string; icon: any }[];
};

export function TableToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const isFiltered = () => props.table.getState().columnFilters.length > 0;

  return (
    <div class="flex items-center justify-between">
      <div class="flex flex-1 items-center space-x-2">
        <TextField
          value={
            (props.table.getColumn("title")?.getFilterValue() as string) ?? ""
          }
          onChange={(value) =>
            props.table.getColumn("title")?.setFilterValue(value)
          }
        >
          <TextFieldInput
            placeholder="Filter tasks..."
            class="h-8 w-[150px] lg:w-[250px]"
          />
        </TextField>
        {props.table.getColumn("status") && (
          <TableFacetedFilter
            column={props.table.getColumn("status")}
            title="Status"
            options={props.statuses}
          />
        )}
        {props.table.getColumn("priority") && (
          <TableFacetedFilter
            column={props.table.getColumn("priority")}
            title="Priority"
            options={props.priorities}
          />
        )}
        {isFiltered() && (
          <Button
            variant="ghost"
            onClick={() => props.table.resetColumnFilters()}
            class="h-8 px-2 lg:px-3"
          >
            Reset
            <IconX />
          </Button>
        )}
      </div>
      <TableViewOptions table={props.table} />
    </div>
  );
}

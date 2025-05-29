import { Combobox as ComboboxPrimitive } from "@kobalte/core/combobox";
import { FaSolidCheck, FaSolidCaretDown } from "solid-icons/fa";
import { ComponentProps, splitProps, mergeProps } from "solid-js";
import { cn } from "~/lib/utils";

export interface ComboboxItem<TValue> {
  label: string;
  value: TValue;
}

type ComboboxProps<TValue> = Omit<ComponentProps<"div">, "onChange"> & {
  class?: string | undefined;
  ariaLabel?: string | undefined;
  listItems?: ComboboxItem<TValue>[];
  onChange?: (value: ComboboxItem<TValue> | undefined) => void;
};

const Combobox = <TValue,>(rawProps: ComboboxProps<TValue>) => {
  const props = mergeProps<ComboboxProps<TValue>[]>(
    {
      listItems: [
        {
          label: "Apple",
          value: "apple" as TValue,
        },
        {
          label: "Banana",
          value: "banana" as TValue,
        },
      ],
    },
    rawProps
  );
  const [local, _] = splitProps(props, [
    "class",
    "listItems",
    "ariaLabel",
    "onChange",
  ]);

  return (
    <ComboboxPrimitive
      options={local.listItems as ComboboxItem<TValue>[]}
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      onChange={(value) => {
        if (local.onChange) {
          local.onChange(value !== null ? value : undefined);
        }
      }}
      triggerMode="focus"
      placeholder="Search for a workspace"
      class={cn("", local.class)}
      itemComponent={(props) => (
        <ComboboxPrimitive.Item
          item={props.item}
          class={cn(
            "relative flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
          )}
        >
          <ComboboxPrimitive.ItemLabel>
            {props.item.rawValue.label}
          </ComboboxPrimitive.ItemLabel>
          <ComboboxPrimitive.ItemIndicator class="combobox__item-indicator">
            <FaSolidCheck />
          </ComboboxPrimitive.ItemIndicator>
        </ComboboxPrimitive.Item>
      )}
    >
      <ComboboxPrimitive.Control
        class="flex h-10 items-center rounded-md border px-3"
        aria-label={local.ariaLabel ?? "combobox"}
      >
        <ComboboxPrimitive.Input class="flex size-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" />
        <ComboboxPrimitive.Trigger class="size-4 opacity-50">
          <ComboboxPrimitive.Icon>
            <FaSolidCaretDown />
          </ComboboxPrimitive.Icon>
        </ComboboxPrimitive.Trigger>
      </ComboboxPrimitive.Control>
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Content class="relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
          <ComboboxPrimitive.Listbox class="m-0 p-1" />
        </ComboboxPrimitive.Content>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive>
  );
};
export { Combobox };

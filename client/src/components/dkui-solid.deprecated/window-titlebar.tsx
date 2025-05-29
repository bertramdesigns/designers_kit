import {
  TitleBar,
  TitleBarGroup,
  TitleBarGroupContent,
} from "~/components/dkui/titlebar";
import { SidebarTrigger } from "~/components/dkui/sidebar";
import { Combobox, type ComboboxItem } from "~/components/dkui/combobox";

export function WindowTitlebar() {
  // for global store
  const handleSelectionChange = (value: ComboboxItem | undefined) => {
    console.log(value);
  };

  return (
    <TitleBar>
      <TitleBarGroup>
        <TitleBarGroupContent></TitleBarGroupContent>
      </TitleBarGroup>
      <TitleBarGroup class="justify-between">
        <TitleBarGroupContent>{/* <span>CLeft</span> */}</TitleBarGroupContent>
        <TitleBarGroupContent>
          {
            // In the future this should allow for multiple selections.
            // The result will be multiple workspaces being shown simultaneously.
            // will need to adjust component to accept props for setting input type and selection type.
          }
          <Combobox onChange={handleSelectionChange} />
        </TitleBarGroupContent>
        <TitleBarGroupContent>{/* <span>CRight</span> */}</TitleBarGroupContent>
      </TitleBarGroup>
      <TitleBarGroup>
        <TitleBarGroupContent>
          <SidebarTrigger />
        </TitleBarGroupContent>
      </TitleBarGroup>
    </TitleBar>
  );
}

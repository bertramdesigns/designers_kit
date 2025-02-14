import { render } from "solid-js/web";

import "../src/App.css";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { withThemeByClassName } from "@storybook/addon-themes";

const preview = {
  decorators: [
    (Story) => {
      const solidRoot = document.createElement("div");

      render(Story, solidRoot);

      return solidRoot;
    },
    withThemeByDataAttribute({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-kb-theme",
    }),
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;

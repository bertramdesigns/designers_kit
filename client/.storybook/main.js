import solid from "vite-plugin-solid";

const config = {
  stories: ["./docs/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  viteFinal(config) {
    // make solid work
    config.plugins?.unshift(solid({ hot: false }));

    return config;
  }
};
export default config;

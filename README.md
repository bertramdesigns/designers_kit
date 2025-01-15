# Designer's Kit

This is a collection of commonly used open sourced projects for designers to utilize in their work.

## ToC

- [SolidUI Docs](#solidui)
- [SolidIcons Docs](#solidicons)
- [Storybook Docs](#storybook)
- [Vitest Docs](#vitest)
- [Tauri Docs](#tauri)
- [Appwrite Docs](#appwrite)

## Cheatsheet

**Appwrite** - NoSQL database
`pnpm run appwrite:start` to start the Appwrite server.
[Appwrite Console](http://localhost:80/)
Credentials can be found in `./appwrite/.env`
Username: `admin`

**Tauri** - Desktop app framework
`pnpm run tauri dev` to start the app.
[App](http://localhost:1420/)

**SolidUI** - UI library
`pnpm exec solidui-cli add <component-name>` to add a component.

**Storybook** - Component library & UI Testing
`pnpm run storybook` to start Storybook.
`pnpm run storybook:build` to build Storybook.

**Vitest** - Functional & logic testing framework
`pnpm run test` to run tests.

## General notes

**errors when using `pnpm dlx`**

I am using NVM to mangage my node versions. Sometimes weird things happen and I need to reset the node version. The system default is 18.15.0, but the projects use v20 and up so make sure the right version is set with `nvm list` (to see installed versions) and `nvm use 21.4.0` (to set the version).

Note: bash doesn't have nvm in the path so you need to use `source ~/.nvm/nvm.sh` to load it in.

---

---

## SolidUI

The SolidUI library is used to load in pre-built component templates. These are generated into the `./src/components/solidui` folder. The components are built with SolidJS and TailwindCSS. If a component is modified from the base template, it is shifted up into `./src/components/dkui` to prevent the cli accidentally overwriting it.

Tailwind includes a twMerge utility to merge classes with tw config. This utility is found in `./src/utils/utils.ts`.

`pnpm exec solidui-cli add <component-name>` to add a component.

Find components at [solid-ui.com](https://www.solid-ui.com/docs/introduction)

It is good to note that this library is built on Kobalte and is an unnoficial port of shadcn. Docs are a bit limited in comparison to shadcn so it would be good in the future to migrate, but for speed and simplicity I have gone with SolidUI for now.

### Architecture

SolidUI relies heavily on a providers (Context API) to manage state across components. A basic example of this can be see in support for dark mode. [docs]{https://www.solid-ui.com/docs/dark-mode/vite}

### Configuration

In `tsconfig.json`, a path alias is added. This can be updated in the future if needed

```json
"paths": {
    "~/*": ["./src/*"]
},
```

The `ui.config.json` file configures import locations and files for tailwind.

Tailwind is configured in `tailwind.config.js`. In general, all the variables set in App.css are set to hsl values. These are then loaded into the config file during compilation.

## SolidIcons

**[^ to the top](#designers-kit)**

This project has the Solid Icons library loaded. It gives access to quite a few different icon libraries in Solid components.
For this project, Font Awesome is used. Imports are prefixed with Fa. [Solid Icons Font Awesome](https://solid-icons.vercel.app/search/package/fa)

The search is not so great as it searches all the libraries. It is best to search direction on [Font Awesome](https://fontawesome.com/icons) for the names. Some of the icons are not available, but a lot of the premium ones are also available.

In the future, I would like to swap this back to the Phosphor library again.

```tsx
import { FaBeer } from "solid-icons/fa";

export default function App() {
  return <FaBeer />;
}
```

## Storybook

**[^ to the top](#designers-kit)**

Storybook has been added to document the ui components. This is to allow me to learn more about UI testing and validation. [Carbon Storybook](https://react.carbondesignsystem.com/) is a fantastic example of a well setup Storybook.

### Configuration

~~There is beta support if you select Solid on the [install page](https://storybook.js.org/docs/get-started/install). It is available in [beta.6](https://www.npmjs.com/package/storybook-solidjs-vite?activeTab=dependencies) version at the time of writing. So the setup will be using Storybook 8.5 beta~~

~~`pnpm dlx storybook@next init`~~

Currently, the renderer is very broken. Backing up and using html-vite following elite174's setup is the best option.
[working setup](https://github.com/elite174/storybook-solid-js)

Adding in dark/light mode toggle requires [@storybook/addon-themes](https://storybook.js.org/addons/@storybook/addon-themes)

Because SolidUI uses Tailwind, it needs to be configured. [Instructions](https://storybook.js.org/recipes/tailwindcss). make sure to run in @next, not @latest until the next version is released.

### Bugs

**Dark Mode** -

Right now the dark/light mode toggle works on the component, but you need to pop back and forth between docs and the component for the background and component to switch.

## Vitest

**[^ to the top](#designers-kit)**

Vitest - test runner. Simply add file-name.test.tsx to create a file.

```tsx
// sum.test.js
import { sum } from "./sum.js";
import { test, expect } from "vitest";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Tauri supports "mocking" the IPC to test the frontend without having tauri running. This makes it compatible with Vitest. Find more details here: [Tauri Mock API](https://v2.tauri.app/develop/tests/mocking/)

### Configuration

The docs for solid testing are [here](https://docs.solidjs.com/guides/testing).
`pnpm i -D vitest jsdom @solidjs/testing-library @testing-library/user-event @testing-library/jest-dom`

With Vite already installed, no need for a vitest.config.ts file.
Note that without the resolve conditions, vitest will fail.
Install Vitest extension for VSCode.
Setting globals to true allows you to skip imports to js files, but is broken in ts right now. However, it is necessary for types to not throw errors.

```tsx
// vite.config.ts
export default defineConfig(async () => ({
  plugins: [solid()],
  resolve: {
    ///...
    // essential for vitest. Otherwise will fail with "Client-only API called on server side"
    conditions: ['development', 'browser'],
  },

  // Vitest
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
    isolate: false,
    // optional
    coverage: {
      provider: "v8",
      reporter: ['text', 'html'],
    }
  },
```

```json
//tsconfig.json
"compilerOptions": {
    // ...
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "types": ["vite/client", "@testing-library/jest-dom"]
}
```

## Tauri

**[^ to the top](#designers-kit)**

Tauri is setup to run for V2. Currently it is targetting desktop only, but can be expanded for mobile if needed.

It is good to note that as soon as "invoke" is used to call the Rust backend, the app needs to be run in the Tauri environment with `pnpm run tauri dev`. Developing for the web will require conditionals to handle the different environments.

### Configuration

`data-tauri-drag-region` can be added to html tags to make a region that drags the entire window. The `core:window:allow-start-dragging` has been added to `./src-tauri/capabilities/default.json` to allow this.

## Appwrite

Appwrite is the backend for the project. It is configured to be self-hosted using Docker. The server is started with `pnpm run appwrite:start` and can be accessed at [localhost:80](http://localhost:80/) or [localhost/console](http://localhost/console) for the console.

For convenience, tooling has been added to initialize the server with the correct configurations. This is done with `pnpm run appwrite:init`.

### Initialization

A script has been created to initialize the database with the necessary teams, collections, attributes, documents, and permissions. When adding/changing fields, the script needs to be updated. If it is not, the next rebuild will not have changes made in the Appwrite console.

All the configurations are stored in `./appwrite/appwrite.json` and the scripts are found in `./appwrite/scripts/`.

**Before running**

- Update all the .env files with the correct credentials
  - `./appwrite/.env`
  - `./.env`
- Start the Appwrite server with `pnpm run appwrite:start`
- Run the initialization script with `pnpm run appwrite:init`

This script is run with `pnpm run appwrite:db:init`. The script is located in `./appwrite/init.ts`.

When running appwrite:init it will run the script then unmount it.

#### Database Collections/Atrributes/Documents/Permissions

#### Environment Variables

To add new environment variables, add them to the `./.env` (NOT `./appwrite/.env` for now). These can be imported using `import.meta.env.VARIABLE_NAME` and should be prefixed with `VITE_` to be available in the browser.

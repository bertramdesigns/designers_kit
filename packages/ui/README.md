# Designers Kit design system

This is a design system for the Designers Kit project. It uses storybook to document the components and their variations.

For now, we are using shadcn to get the library set up. In the future this will be exchanged for a community-created library.

Nice video covering this:
https://www.youtube.com/watch?v=ESkD6Ouvs2s

## Tailwind and importing to other parts of the mono repo

In our projects, we want to use the common tailwind theme. This is tricky because Tailwind compiles the css file at build, meaning if we build a distributed library of components that uses tailwind and also have a project using tailwind there is a risk of having two different clashing themes.

The pros of having a compiled distribution of our design system is that it is truely locked and controlled.
The cons are the developer experience suffers with needing to potentially scope two different instances of tailwind (with shared classnames) to live side by side.

But is this a problem? The ideal situation is to have locked components that aren't impacted by the project's tailwind theme. On the flip side, designers should control the theme and let it propogate down. But this creates a potential issue for testing to make sure everything is consistent enough to not break any "custom" additions on subsequent pages.

Building a robust system that is equal to tailwind is a long way off... and it would require a ton of effort.

**How might we implement a system that propogates to all platforms that utilizes a single source styling package?**

When I think deeply about this, technically all classes are still available for use when developing from tailwind. The UI package simply pre-configures the package so that it does not need to be compiled from the project. All that would be needed is to import the tailwind stylesheet into the project and everything would be available.

So the best solution would be to completely eliminate the need for tailwind in the project (so no compiler setup anywhere except the UI package) and simply import the stylesheet into the project. Then this will give full access to tailwind classes. The only thing it wouldn't provide is

**Problem with production css file**

The issue with this approach is the project file wont have the tree-shaking functionality of tailwind 4, which makes sure the only css included is what is used. This happens using modules. As explained [here](https://tailwindcss.com/docs/detecting-classes-in-source-files), tailwind converts everything to plain text then does a string search for any matching classes.

The practical implication of this is if a tailwind class is used that is not in the ui library, it won't be on in the bundle stylesheet for the UI distribution. The flip side is, if we include every class from tailwind and purge it afterwards, we loose the module tree-shaking functionality and revert back to the purgecss method of v3.

Technically, the least "custom" method would be to include the tailwind compiler in every project and import the ui package uncompiled... this is the challenge as it requires a lot of duplication and maintenance in the compiler setup.

Perhaps this needs a shared compiler setup for the ui portion?

---

**Solution**
We are going to utilize the concept of "zero-install" component libraries that are used directly from source within a monorepo, avoiding many of the problems associated with pre-compiled libraries.

Tailwind 4 removes the tailwind.config.js file and replaces it with `@source` and `@theme` directives meaning we need the vite.config.js file to import the @tailwindcss/vite plugin to manage the tailwind configuration.

Then all we do is, instead of importing the index.css file from the project, import it from the ui package. This will include the full theme and, as we import components, will compile properly.

Because we have setup the package.json in the ui package to be imported, we can simply use `import "@designers-kit/ui/index.css"` to import the css file.

### Querks

Because this plugin crawls the directory the vite runs in, there may be a need to add an @source directive into a project that points to either the ui package or the project, but I am not sure yet.

As we are currently using Shadcn (temporarily), there are some issues with the way components are imported in the CLI. The tsconfig uses an alias of @ to point to the src directory. When the ui package is imported into the project this breaks because it isn't relative. So @'s need to be replaced with relative paths.

- The theoretical solution is to remove aliases and update the components.json file to point to the correct, relative path. This needs to be tested.

### Project setup

Install Tailwindcss Vite plugin:

```bash
pnpm add -D @tailwindcss/vite
```

Add the designer-kit ui package to the project:

```bash
pnpm add "@designers-kit/ui@workspace:*"
```

In your main.tsx file, import the css file:

```typescript
import "@designers-kit/ui/index.css";
```

In your vite.config.ts file, add the tailwindcss plugin:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

That's it! You should now have access to the full tailwind theme in your project.

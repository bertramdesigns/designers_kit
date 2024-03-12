# Designer's Kit

This is a collection of commonly used open sourced projects for designers to utilize in their work.

run `pnpm run tauri dev` to start the app.

## Notes

### Skeleton UI

The root UI kit of this project is Skeleton UI. It is mostly a collection of basic components that can be used to build more complex components. The layout is locked to an AppShell structure that controls input events/states.

Skeleton is committed to a repository with all components together as a monorepo (site, packages, etc.), meaning it is nested. There are a few components that need more work and some that need to be customized so I have a fork at bertramdesigns/skeleton#designers-kit that has been included as a submodule in `./packages/skeleton`. In the packages file, the nested `./packages/skeleton/packages/skeleton` folder is added to the `package.json` file as a dependency path.

All the useful files can be found in `./packages/skeleton/packages/skeleton/src/lib`

_Note_: the better way of this is is to use a solution like yarn workspaces. PNPM is releasing the feature in v9 so once it is stable, I will switch to it. [PNPM v9.0.0-alpha.1 notes](https://github.com/pnpm/pnpm/releases/tag/v9.0.0-alpha.1)

**Configuring package.json and vite.config.ts**

The package is included by running

```bash
pnpm install --save-dev "./packages/skeleton/packages/skeleton"
```

This will add the following link to the package.json file:

```json
"devDependencies": {
  	"@skeletonlabs/skeleton": "link:packages/skeleton/packages/skeleton",
}
```

The submodule is seen as outside the project root path. To fix it the following should be added to vite's config file:

```javascript
// vite.config.js
export default {
	server: {
		fs: {
			allow: ['packages/skeleton/packages/skeleton']
		}
	}
};
```

**Updating the submodule**

To pull updates:

```bash
git submodule update --init --recursive
```

Updates can also be pushed by editing the submodule and using source control to commit the changes.

## Included

- PDF Tools (Utilizing [Poppler](https://poppler.freedesktop.org/))
  - Convert to PS
  - Convert to PPM
  - Convert to Cairo
  - Convert to HTML
  - Extract text
  - Extract images
  - Extract fonts
  - Extract metadata
  - Combine
  - Split

## To add

- Research Tools

  - Wireless local phone screen recording [scrcpy]()
  - Summarization
  - Sentiment analysis
  - Image and video anonymization [BMW Anonymizer]() OR [Candle]()
    - BMW uses Yolov4 to detect objects anyway. Consider using mediapipe.
  - Transcription of audio files [Mozilla DeepSpeech]() OR [Candle Whisper](https://github.com/huggingface/candle) -> [demo](https://huggingface.co/spaces/lmz/candle-whisper)

- Transformers

  - Pdf to XXX (pdf tools)
  - SVG tools [resvg](https://github.com/RazrFalcon/resvg)
  - Image Editor
    - Cropping
    - Remove Background
    - Resizing ( compression )
    - Format conversion
  - Link shortening

- Refiners / Optimizers

  - Image + Image + Code = Code
  - Image + Code = Code

- Generative Tools

  - Image to code

    - Image to HTML [example](https://huggingface.co/spaces/taneemishere/html-code-generation-from-images-with-deep-neural-networks)
    - Image to SVG

  - Text to icon

- Productivity Tools

  - Time tracking
  - Invoice builder

## TODO

std::process::Command with Tauri may require whitelisting args to the shell.
https://tauri.app/v1/guides/building/sidecar/#running-it-from-rust

- maybe not necessary because the library is handling the command execution

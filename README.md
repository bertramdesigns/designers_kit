# Designer's Kit

This is a collection of commonly used open sourced projects for designers to utilize in their work.

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

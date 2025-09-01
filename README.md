# Writing Tool

This repository contains a minimal Chrome extension that provides basic writing assistance features.

## Features

- **Grammar checking** via [LanguageTool](https://languagetool.org/) API.
- **Rephrase sentences** with a simple synonym map.
- **Shorten text** by removing common filler words.
- **Issue detection** to flag filler words and passive voice phrases.

## Development

The extension lives in the `extension` directory. Load it unpacked in Chrome:

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and choose the `extension` folder.

## Testing

```
npm test
```

The current project has no automated tests; the command above simply prints a message.

# @epicollect5/capacitor-native-loader

A maintained fork of [Cap-go/capacitor-native-loader](https://github.com/Cap-go/capacitor-native-loader)
(v8.1.14) used by [Epicollect5](https://github.com/epicollect5).

**The JavaScript API is unchanged** — every option, method and behaviour
documented in the [upstream README](README.upstream.md) applies to this fork.

## Why this fork exists

Epicollect5 renders the ring loader natively above the WebView during question
navigation, so the spinner keeps animating while the WebView renders the next
question (a multi-second synchronous mount that would freeze a CSS spinner).
The loader is shown fully transparent — no card, no scrim — and must look
identical to the Ionic `<ion-spinner name="crescent">` used on the web/PWA
build, because the two renderers alternate between platforms.

Upstream's ring ships inside a visible card (background, border, track circle)
with a gradient arc at a different speed and length — none of which can be
turned off through options — so the fork adjusts the native rendering and the
packaging.

## Changes vs upstream

### Card border removed (Android + iOS)

The loader card drew a hardcoded 1px white stroke
(`argb(24,255,255,255)` / `Color.white.opacity(0.08)`). Invisible under the
default dark card background, but clearly visible once the card is
transparent — which is our use case.

### Ring alpha fix (Android)

The faint track circle set the paint's colour to 14% alpha, and the following
SweepGradient arc inherited that paint alpha — the whole ring rendered at 14%
opacity and looked washed out. The paint alpha is reset before the gradient
arc is drawn.

### Ring matches the Ionic crescent spinner (Android + iOS)

- track circle removed — the crescent has none
- arc reduced from 78% to **28%**: the crescent strokes
  `128px − 82px (dashoffset) = 46px` over a `2π × 26 ≈ 163px` circumference
  (viewBox 64, r 26)
- rotation of one full turn per **750ms** — the crescent sets an inline
  `animation-duration: 750ms` on the rotating SVG which overrides its
  stylesheet's `1s` rule
- butt caps — the crescent sets no `stroke-linecap` (SVG default)

The rotation is driven by wall-clock time (one turn per real 750ms,
independent of `duration`/`speed`/device animation scales), so the CSS and
native spinners always match.

### Packaging for GitHub installs

- `dist/` is committed: GitHub installs have no bun toolchain to run the
  upstream build (upstream builds at npm publish only)
- `devDependencies` dropped: npm installs the devDependencies of git
  dependencies, and the bun-oriented toolchain does not resolve via npm
- podspec renamed to `Epicollect5CapacitorNativeLoader`: the Capacitor CLI
  derives the iOS pod name from the package name

## Install

```bash
npm install @epicollect5/capacitor-native-loader@github:epicollect5/epicollect5-native-loader#v8.1.14-ec5.1
```

or in `package.json`:

```json
"@epicollect5/capacitor-native-loader": "github:epicollect5/epicollect5-native-loader#v8.1.14-ec5.1"
```

## Usage

Same API as upstream. This is how Epicollect5 shows it (native builds only):

```ts
import { NativeLoader } from '@epicollect5/capacitor-native-loader';

await NativeLoader.show({
  style: 'ring',
  placement: 'fullscreen',
  size: 28,
  thickness: 2,
  colors: [textColor, textColor], // identical stops: no gradient
  backgroundColor: 'rgba(0, 0, 0, 0)',
  interactionMode: 'block',
  reducedMotion: 'ignore',
});
```

## Reference

- Full API and all options: [README.upstream.md](README.upstream.md)
- Upstream repository: [Cap-go/capacitor-native-loader](https://github.com/Cap-go/capacitor-native-loader)

## Syncing with upstream

Add upstream as a remote, rebase `main`, restore this README, and re-verify
the crescent-match numbers above (arc fraction, turn duration, caps) against
the new upstream version before re-tagging.

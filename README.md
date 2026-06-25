<div align="center">

<img src="public/favicon.svg" alt="App Logo" width="128" />

# Keyboard Simulator

<a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="AGPL License" /></a>
<a href="https://tauri.app/"><img src="https://img.shields.io/badge/Tauri-2.x-blue.svg" alt="Tauri" /></a>
<a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19-blue.svg" alt="React" /></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript" /></a>
<a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-7-blue.svg" alt="Vite" /></a>

**A powerful cross-platform application for realistic keyboard simulation and visualization — built with React, Tauri, and Rust, with GitHub Actions for multi-platform builds and releases.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage-guide) • [Running & Building](#-running-the-application) • [GitHub Actions](#-github-actions-build--release) • [Icons](#-icons-generation) • [Contributing](#-contributing)

---

</div>

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Usage Guide](#-usage-guide)
- [Building for Production](#-building-for-production)
- [GitHub Actions (Build & Release)](#-github-actions-build--release)
- [Icons Generation](#-icons-generation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)
- [About Roboticela](#-about-roboticela)

---

## 🌟 About

**Keyboard Simulator** is a powerful cross-platform application that provides realistic keyboard simulation and visualization for a wide range of keyboard types. Designed for learning, demonstrations, presentations, accessibility testing, tutorials, keyboard exploration, and interactive experiences, it delivers an immersive environment with extensive customization and rich interactive features.

Built with modern technologies including **Tauri**, **React**, **React Three Fiber**, **TypeScript**, and **Rust**, Keyboard Simulator brings keyboard interaction to life through realistic rendering, real-time typing synchronization, beautiful animations, and highly interactive controls.

Whether you're a student learning layouts, a teacher creating demonstrations, a developer testing interactions, a content creator producing tutorials, or someone exploring different keyboard styles, Keyboard Simulator offers a complete experience packed with powerful features.

The application runs as a native desktop application through **Tauri 2** on Linux, Windows, and macOS, with Android and iOS support planned for future releases. It also includes automated multi-platform build pipelines, release workflows, and asset generation tools.

### Why Keyboard Simulator?

- ✅ **Free and Open Source** — Licensed under AGPL-3.0
- ✅ **Cross-Platform** — Works on Linux, Windows, and macOS (Android and iOS planned)
- ✅ **Fast & Lightweight** — Built with Rust and Tauri for excellent performance
- ✅ **Realistic Keyboard Simulation** — Interactive visualization with smooth rendering
- ✅ **Multiple Keyboard Types** — Support for various keyboard models and layouts
- ✅ **Real-Time Synchronization** — Syncs with physical keyboard input instantly
- ✅ **Learning & Education Friendly** — Great for teaching, learning, and tutorials
- ✅ **Demonstration Ready** — Perfect for presentations and keyboard showcases
- ✅ **Privacy Focused** — Everything stays local with no external servers
- ✅ **Modern User Interface** — Beautiful design with customizable themes
- ✅ **Highly Interactive** — Animated hands, indicators, and controls
- ✅ **Extensive Customization** — Personalize appearance and behavior
- ✅ **Multi-platform Build Support** — Automated release pipelines
- ✅ **Active Development** — Regular improvements and feature additions

---

## ✨ Features

### ⌨️ Keyboard Simulation & Visualization

- Realistic keyboard simulation experience
- Support for multiple keyboard types and layouts
- Real-time key press feedback
- Physical keyboard synchronization
- Interactive keyboard rendering
- Adjustable camera controls
- Zoom, rotate, and navigation controls
- Multiple viewing perspectives

### 🎓 Learning & Demonstration

- Great for learning keyboard layouts
- Educational typing demonstrations
- Tutorial and presentation support
- Accessibility testing
- Interactive showcase environment
- Visual typing guidance

### 📝 Document Editor

- Live text editor with real-time typing
- Cursor and caret tracking
- Fullscreen writing mode
- Save and copy functions
- Quick clear and reset tools

### 🎨 Themes & Customization

- Multiple built-in themes
- Custom appearance settings
- Smooth transitions and animations
- Responsive design
- Modern interface experience

### 🎮 Interactive Features

- Animated typing hands
- Mouse interaction visualization
- Arrow key indicators
- Function key shortcut support
- Dynamic keyboard interactions

### 🔒 Keyboard States

- Caps Lock indicator
- Num Lock indicator
- Scroll Lock indicator
- Insert mode indicator
- Function key states

### 💻 System Indicators

- Battery status
- WiFi status
- Bluetooth status
- Flight mode
- Microphone state
- Brightness controls
- Volume indicators
- Touchpad status

### 🎯 Advanced Features

- Fullscreen immersive mode
- Keyboard synchronization
- View reset controls
- Complete settings reset
- Project information and licensing

### 📦 Build & Release

- Automated GitHub Actions workflows
- Multi-platform build support
- Multi-architecture releases
- APK, AAB, AppImage, EXE, MSI, and more
- Asset checksum generation

### 🎨 Icon System

- Single-source SVG icon generation
- Desktop icons
- Android adaptive icons
- Web favicons and application assets

---

## 🛠️ Technology Stack

| Layer        | Technology |
|-------------|------------|
| Frontend    | [React 19](https://reactjs.org/), [TypeScript 5.x](https://www.typescriptlang.org/), [Vite 7](https://vitejs.dev/), [TailwindCSS 4](https://tailwindcss.com/), [Framer Motion 12](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/) |
| 3D Graphics | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/), [Three.js](https://threejs.org/), [@react-three/drei](https://github.com/pmndrs/drei) |
| Desktop/Mobile | [Tauri 2](https://tauri.app/), [Rust](https://www.rust-lang.org/) |
| Tooling     | ESLint, npm, PostCSS |

---

## 📋 Prerequisites

### Required
- **Node.js** (v20+, workflow uses 24) — [Download](https://nodejs.org/)
- **npm** — Node package manager
- **Rust** (latest stable) — [Install](https://www.rust-lang.org/tools/install)

### Platform-specific (for local builds)

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev \
  patchelf libsoup-3.0-dev libjavascriptcoregtk-4.1-dev
```

#### Linux (Fedora)
```bash
sudo dnf install webkit2gtk4.1-devel openssl-devel libappindicator-gtk3-devel librsvg2-devel
```

#### macOS
```bash
xcode-select --install
```

#### Windows
- [Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (usually on Windows 10/11)

#### Android (local)
- JDK 17, Android SDK, NDK (e.g. 27.0.12077973 as in workflow)
- `npx tauri android init` once; see [Tauri Android](https://v2.tauri.app/develop/android/)
- **Windows only:** enable [Developer Mode](https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development) (Settings → System → For developers). Tauri links `libapp_lib.so` into `src-tauri/gen/android/.../jniLibs` with a **symbolic link**; without Developer Mode (or the “create symbolic links” privilege) the build fails with *“Creation symbolic link is not allowed for this system”* ([upstream discussion](https://github.com/tauri-apps/tauri/issues/10937)). Keep the project on an **NTFS** drive (not exFAT/FAT32 on external disks).
- If Gradle/Kotlin reports *“this and base files have different roots”* (e.g. repo on **D:** and Cargo/registry on **C:**), the Kotlin daemon may fall back; builds can still succeed. If problems persist, put the **project on the same drive** as your user profile (where `.cargo` lives) or add `kotlin.incremental=false` in `src-tauri/gen/android/gradle.properties` after `tauri android init` (re-apply if you regenerate `gen/android`).

---

## 📥 Installation

```bash
git clone https://github.com/Roboticela/Keyboard-Simulator.git
cd Keyboard-Simulator
npm install
```

Optional: build Rust for desktop once:
```bash
cd src-tauri && cargo build && cd ..
```

---

## 🚀 Running the Application

### Frontend only (web)
```bash
npm run dev
```
Then open http://localhost:5173.

### Desktop (Tauri + Vite dev server)
```bash
npm run tauri dev
```
Starts Vite and opens the Tauri window with hot-reload.

---

## 📚 Usage Guide

### Getting Started

1. **Launch the Application** — Open the built application or run in dev mode
2. **Select Keyboard Model** — Choose from the available keyboard models in the header
3. **Start Typing** — Use the document editor to type and see the keyboard respond
4. **Explore Features** — Try different themes, enable hand visualization, and experiment with controls

### Using the Keyboard Simulator

1. **Select a Keyboard Model**
   - Click the keyboard dropdown in the header
   - Choose from: Asus UX370UAR, Dell Latitude 5300, Dell Latitude E7270, HP EliteBook 820 G4, or Toshiba Portege X30-E

2. **Type in the Document Editor**
   - The editor is located in the top section of the interface
   - Type any text and watch the 3D keyboard respond
   - Use the toolbar buttons to save, copy, or clear your text

3. **Interact with the 3D Keyboard**
   - Click on keys to see them press
   - Rotate and zoom the keyboard view using mouse controls
   - Enable keyboard sync to see your physical keyboard input reflected

### Customization Options

1. **Change Theme**
   - Click the theme button in the header
   - Select from 8 available themes (Navy, Dark, Light, Sunset, Ocean, Forest, Purple Dream, Midnight)

2. **Enable Features**
   - **Hand Visualization** — See animated hands typing
   - **Mouse Controls** — Show mouse pointer visualization
   - **Arrow Keys** — Visual feedback for arrow key presses
   - **Fn Shortcut** — Toggle Fn key shortcuts
   - **Typing Hands** — Animated hands that follow typing
   - **Keyboard Sync** — Sync with physical keyboard input
   - **Fullscreen** — Enter immersive fullscreen mode

3. **View Status Indicators**
   - Check the status controls panel for:
     - Lock states (Caps Lock, Num Lock, Scroll Lock, Insert)
     - System indicators (Battery, WiFi, Bluetooth, Flight Mode, etc.)
     - Click indicators to toggle states

### Keyboard Controls

- **Rotate View** — Click and drag on the keyboard
- **Zoom** — Use mouse wheel or pinch gesture
- **Reset View** — Click "Reset View" button to restore default camera position
- **Reset All** — Click "Reset" button to restore all settings to defaults

### Fullscreen Mode

1. Click the **Fullscreen** button in the header
2. The keyboard will expand to fill the entire screen
3. Press **Escape** to exit fullscreen mode

### Menu Options

Access additional options from the menu button:
- **Story** — View the project story
- **About** — Learn about the project
- **GitHub** — Open the repository
- **License** — View license information
- **Privacy Policy** — Read privacy policy
- **Terms of Service** — View terms of service

---

## 📦 Building for Production

### Frontend
```bash
npm run build
```
Output: `dist/`.

### Desktop (current platform)
```bash
npm run build
npm run tauri build
```
Or:
```bash
npm run build && npm run tauri:build
```
Output:
- **Linux:** `src-tauri/target/<target>/release/bundle/` (deb, rpm, AppImage)
- **Windows:** `src-tauri/target/<target>/release/bundle/` (nsis .exe, msi)
- **macOS:** `src-tauri/target/<target>/release/bundle/` (dmg, app)

### Desktop for a specific target (cross-compile)
Examples:
```bash
# Linux x86_64 (default on Linux)
npm run tauri:build -- --target x86_64-unknown-linux-gnu

# Linux ARM64
npm run tauri:build -- --target aarch64-unknown-linux-gnu

# Windows (from Linux/macOS with cross-compile setup)
npm run tauri:build -- --target x86_64-pc-windows-msvc
```
Rust targets must be installed (e.g. `rustup target add <target>`).

### Android
Prerequisites: Android SDK, NDK, and `npx tauri android init` done once.
```bash
# APK (split per ABI)
npx tauri android build --apk --split-per-abi

# AAB (bundle for Play Store)
npx tauri android build --aab
```
Set `NDK_HOME` if needed (e.g. `$ANDROID_HOME/ndk/<version>`).

### Build summary by platform

| Platform  | Command / note |
|-----------|-----------------|
| Web       | `npm run build` → `dist/` |
| Linux     | `npm run tauri:build` (or `--target x86_64-unknown-linux-gnu` etc.) |
| Windows   | `npm run tauri:build` on Windows (or cross-compile with MSVC target) |
| macOS     | `npm run tauri:build` on macOS |
| Android   | `npx tauri android build --apk` or `--aab` (after `tauri android init`) |

---

## 🤖 GitHub Actions (Build & Release)

The workflow file is **`.github/workflows/build-release.yml`**. It is triggered **manually** (workflow_dispatch) and:

1. **Prepares** — Patches version in `package.json`, `server/package.json`, `src-tauri/tauri.conf.json`, and `src-tauri/Cargo.toml`
2. **Builds** — Linux, Windows, and Android (each can be toggled on/off)
3. **Releases** — Creates a GitHub Release with artifacts and SHA256/SHA512 checksums

### Workflow inputs (manual trigger)

| Input | Type | Default | Description |
|-------|------|--------|-------------|
| `version` | string | `"0.1.0"` | Release version (e.g. `1.0.0`) |
| `prerelease` | boolean | `false` | Mark release as pre-release |
| `draft` | boolean | `false` | Create as draft release |
| `build_linux` | boolean | `true` | Build for Linux (.deb, .rpm, .AppImage) |
| `build_windows` | boolean | `true` | Build for Windows (.exe, .msi) |
| `build_android` | boolean | `true` | Build for Android (.apk, .aab) |
| `build_macos` | boolean | `false` | Reserved (coming soon) |
| `build_ios` | boolean | `false` | Reserved (coming soon) |

### Environment variables (workflow)

Set at the top level of the workflow:

| Variable | Example | Description |
|----------|---------|-------------|
| `APP_NAME` | `"Keyboard Simulator"` | Display name used in release title and Android signing DN |
| `NDK_VERSION` | `"27.0.12077973"` | Android NDK version installed via `sdkmanager` |
| `NODE_VERSION` | `"24"` | Node version for `actions/setup-node` |

### Secrets (optional, for Android signing)

If you want **release signing** for Android (e.g. for Play Store), add these repository secrets:

| Secret | Description |
|--------|-------------|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded `.keystore` file (contents of the keystore binary) |
| `ANDROID_KEY_ALIAS` | Key alias inside the keystore |
| `ANDROID_KEY_PASSWORD` | Private key password |
| `ANDROID_STORE_PASSWORD` | Keystore password |

If **none** of these are set, the workflow generates a **self-signed keystore** and uses it for the build (suitable for testing, not for Play Store distribution).

### Built artifacts

| Platform | Architectures | Formats |
|----------|----------------|--------|
| Linux | x86_64, aarch64, armv7 | .deb, .rpm, .AppImage |
| Windows | x86_64, i686, aarch64 | .exe (NSIS), .msi |
| Android | arm64-v8a, armeabi-v7a, x86, x86_64 | .apk (per ABI), .aab |

The release step uploads all artifacts and adds **SHA256SUMS** and **SHA512SUMS** to the release. Verify with:
```bash
sha256sum -c SHA256SUMS
# or
sha512sum -c SHA512SUMS
```

### How to run the workflow

1. Open the repo on GitHub → **Actions** → **Build and Release**.
2. Click **Run workflow**.
3. Fill in **version** (required) and optionally change **prerelease**, **draft**, and platform toggles.
4. Run; when all selected builds succeed, a release is created (or updated) with the given tag (e.g. `v1.0.0`).

---

## 🎨 Icons Generation

Icons are generated from a **single source image** (default: `public/favicon.svg`) so that desktop, Android, and web all stay in sync.

### Command

```bash
npm run icons:generate
```

Or with a custom source path (relative to project root or absolute):

```bash
npm run icons:generate -- public/logo.svg
node scripts/icons-generate.js path/to/icon.svg
```

### What it does

1. **Prompts (interactive)**  
   - **Android launcher background color** — Hex color (e.g. `#ffffff`). Previous value is read from `src-tauri/icons/android/values/ic_launcher_background.xml` and used as default.  
   - **Android icon scale** — Icon size as percentage of canvas (e.g. `50` = 50%). Stored in `src-tauri/icons/android/icon-options.json` and reused as default next time.

2. **Standard Tauri icons**  
   Runs `tauri icon "<inputPath>"` to generate desktop icons (e.g. 32x32, 128x128, icon.ico, icon.icns) in `src-tauri/icons/`.

3. **Android background color**  
   After `tauri icon`, overwrites the Android background color in `src-tauri/icons/android/values/ic_launcher_background.xml` with the color you chose (so `tauri icon` doesn’t override it).

4. **Android mipmap icons**  
   Builds scaled, padded PNGs for Android adaptive icon:
   - **Launcher:** `ic_launcher.png`, `ic_launcher_round.png` (mdpi → xxxhdpi)
   - **Foreground:** `ic_launcher_foreground.png` (2.25× sizes for adaptive layer)

   Padding is applied so the icon is not clipped by the adaptive icon mask; the **scale** (e.g. 50%) controls how large the logo is within the canvas.

5. **Web icons**  
   Runs `node scripts/copy-vite-icons.js`, which copies from `src-tauri/icons/` to `public/`:
   - `32x32.png` → `public/favicon-32x32.png`
   - `128x128.png` → `public/apple-touch-icon.png`
   - `icon.ico` → `public/favicon.ico`

### Icon options (saved)

| Option | File | Description |
|--------|------|-------------|
| Android background color | `src-tauri/icons/android/values/ic_launcher_background.xml` | `<color name="ic_launcher_background">#rrggbb</color>` |
| Scale (percent) | `src-tauri/icons/android/icon-options.json` | `{ "scalePercent": 50 }` — used as default for next run |

### Scale input format

When prompted for **Android icon scale**, you can enter:
- A number 1–100 (e.g. `50`) → treated as percent.
- A number 0.01–1 (e.g. `0.5`) → treated as fraction.
- With or without `%` (e.g. `50%`).

### Non-interactive / CI

The script is interactive by default. For CI or scripts, you would need to either:
- Pipe answers into it (e.g. `echo -e " #ffffff\n 50" | npm run icons:generate`), or
- Pre-create/update `icon-options.json` and `values/ic_launcher_background.xml` and adapt the script to read from env or args (not implemented in the current script).

---

## 📁 Project Structure

```
Keyboard-Simulator/
├── .github/
│   └── workflows/
│       └── build-release.yml    # Build & release workflow
├── public/
│   └── favicon.svg              # Default icon source for icons:generate
├── src/                         # React frontend
│   ├── components/
│   │   ├── Keyboard.tsx         # Main 3D keyboard component
│   │   ├── DocumentEditor.tsx   # Text editor component
│   │   ├── AppHeader.tsx        # Application header with controls
│   │   ├── StatusControls.tsx   # Status indicators panel
│   │   ├── AboutModal.tsx       # About dialog
│   │   ├── LicenseModal.tsx     # License dialog
│   │   ├── StoryModal.tsx       # Story dialog
│   │   ├── ThemeScript.tsx      # Theme initialization
│   │   ├── Asus-UX370UAR.tsx    # Asus keyboard model
│   │   ├── Dell-Latitude-5300-2-in-1.tsx
│   │   ├── Dell-Latitude-E7270.tsx
│   │   ├── HP-EliteBook-820-G4.tsx
│   │   ├── Toshiba-Portege-X30-E.tsx
│   │   └── ui/                  # UI components (button, dropdown-menu)
│   ├── contexts/                # React contexts for state management
│   │   ├── ThemeContext.tsx     # Theme state
│   │   ├── KeyboardTypeContext.tsx  # Keyboard model selection
│   │   ├── KeyboardViewContext.tsx  # 3D view controls
│   │   ├── KeyboardSyncContext.tsx  # Keyboard synchronization
│   │   ├── KeyboardInputContext.tsx  # Keyboard input handling
│   │   ├── KeyboardLockContext.tsx  # Lock states (Caps, Num, etc.)
│   │   ├── HandContext.tsx      # Hand visualization
│   │   ├── MouseContext.tsx     # Mouse controls
│   │   ├── ArrowContext.tsx     # Arrow key controls
│   │   ├── FnFunctionContext.tsx  # Fn function keys
│   │   ├── FnShortcutContext.tsx  # Fn shortcuts
│   │   ├── FullscreenContext.tsx  # Fullscreen mode
│   │   └── SystemStateContext.tsx  # System indicators
│   ├── lib/
│   │   ├── keyboard-configs/    # Keyboard button configurations
│   │   │   ├── asus-ux370uar.ts
│   │   │   ├── dell-latitude-5300-2-in-1.ts
│   │   │   ├── dell-latitude-e7270.ts
│   │   │   ├── hp-elitebook-820-g4.ts
│   │   │   ├── toshiba-portege-x30-e.ts
│   │   │   └── index.ts
│   │   ├── keyboard-button-types.ts  # TypeScript types
│   │   └── utils.ts             # Utility functions
│   ├── styles/                  # Component-specific styles
│   │   ├── Asus-UX370UAR.css
│   │   ├── Dell-Latitude-5300-2-in-1.css
│   │   ├── Dell-Latitude-E7270.css
│   │   ├── HP-EliteBook-820-G4.css
│   │   └── Toshiba-Portege-X30-E.css
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── src-tauri/                   # Tauri + Rust
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── icons/                   # Generated + Android custom
│   │   ├── 32x32.png, 128x128.png, icon.ico, icon.icns, ...
│   │   └── android/
│   │       ├── values/ic_launcher_background.xml
│   │       ├── icon-options.json
│   │       └── mipmap-*/        # Launcher & foreground PNGs
│   ├── capabilities/
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── ...
├── scripts/
│   ├── icons-generate.js        # Icon generation (tauri + Android + web)
│   └── copy-vite-icons.js       # Copy Tauri icons → public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── LICENSE
└── README.md
```

---

## ⚙️ Configuration

### Tauri
- **`src-tauri/tauri.conf.json`** — App name, version, identifier, window size, `beforeDevCommand` / `beforeBuildCommand`, bundle targets and icon list. Change here for product name and desktop behavior.

### Frontend
- **`vite.config.ts`** — Vite and React plugin; dev server port (default 5173).
- **`index.html`** — Title and favicon links (use `npm run icons:generate` to refresh favicons in `public/`).

### Keyboard models
Keyboard layouts are defined in `src/lib/keyboard-configs/`. Each keyboard model has its own configuration file that maps button IDs to key codes and visual properties.

To add a new keyboard model:
1. Create a new component in `src/components/` (e.g. `NewKeyboard.tsx`)
2. Create a configuration file in `src/lib/keyboard-configs/`
3. Add the keyboard to the `keyboards` array in `AppHeader.tsx`
4. Export the configuration in `src/lib/keyboard-configs/index.ts`

### Data storage
The application stores user preferences and settings locally. No database is required.

The app uses browser local storage (via Tauri's storage APIs) to persist:
- Selected keyboard model
- Theme preference
- View settings (camera position, zoom level)
- Feature toggles (hand visualization, mouse controls, etc.)
- System state preferences

All data is stored locally on your device and never transmitted to external servers.

### Version (for releases)
The GitHub Actions workflow patches version in:
- `package.json`
- `server/package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`

For local releases, keep these in sync manually or run your own patch step.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature` or `fix/your-fix`.
3. Make changes; follow existing style (ESLint, TypeScript, Rust fmt/clippy).
4. Commit with a clear message (e.g. `Add: ...`, `Fix: ...`, `Docs: ...`).
5. Push and open a Pull Request.

---

## 💬 Support

- **Website:** [keyboard-simulator.roboticela.com](https://keyboard-simulator.roboticela.com)
- **Issues:** [GitHub Issues](https://github.com/Roboticela/Keyboard-Simulator/issues) for bugs and feature requests.
- **Repository:** [Roboticela/Keyboard-Simulator](https://github.com/Roboticela/Keyboard-Simulator).

When reporting a bug, please include your operating system, application version, steps to reproduce, expected vs actual behavior, screenshots (if applicable), and any error messages or logs.

### FAQ

**Q: Is this application free to use?**  
A: Yes. It is completely free and open-source under the AGPL-3.0 license.

**Q: Can I use this for commercial purposes?**  
A: Yes, but you must comply with the AGPL-3.0 license terms. Any modifications used over a network must be made available to users.

**Q: Does my data get sent to any servers?**  
A: No. All data is stored locally on your device. The application works entirely offline.

**Q: Can I add my own keyboard model?**  
A: Yes. Create a new component and configuration file. See [Configuration](#-configuration) for details.

**Q: Does keyboard sync work with all keyboards?**  
A: Keyboard sync works with most standard keyboards. It captures keyboard events from your system and reflects them in the 3D visualization.

**Q: Can I customize the keyboard appearance?**  
A: Yes. You can change themes, and keyboard models are styled with CSS. Advanced customization requires modifying the component styles.

---

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See [LICENSE](LICENSE) for the full text.

If you modify this software and make it available over a network (e.g. as a web service), you must provide access to the complete corresponding source code under the same license.

---

## 🏢 About Roboticela

<div align="center">
   <img src="public/CompanyLogo.png" alt="Roboticela Logo" width="200" style="padding:30px;" />
</div>

**[Roboticela](https://github.com/Roboticela)** maintains Keyboard Simulator — an open-source 3D keyboard simulation app built with React, Tauri, and Rust. Star the repo if you find it useful.

---

<div align="center">

**Built with ❤️ by [Roboticela](https://github.com/Roboticela)**

[⬆ Back to Top](#-keyboard-simulator)

</div>

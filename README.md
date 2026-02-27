# 🏛️ Museum of Money — Horizontal Scroll Section
<img width="1920" height="1080" alt="Screenshot (353)" src="https://github.com/user-attachments/assets/8c51f61e-5fd5-440b-8598-0e333bcf1317" />

A **premium horizontal scroll experience** built with React, GSAP ScrollTrigger, and Tailwind CSS v4. Inspired by modern award-winning museum and gallery websites.

Cards float, rotate, and drift independently as the user scrolls — revealing rare historical financial artifacts with cinematic artwork, edition info, and estimated values.

---

## 🌐 Live Preview

> Run locally with `npm run dev` — visit `http://localhost:5173`

---

## ✨ Features

| Feature | Details |
|---|---|
| 🖱️ Horizontal scroll via vertical scroll | GSAP ScrollTrigger pins the section and translates the card track by `–350vw` |
| 🃏 Per-card independent animation | Each card gets a randomised rotation, Y-drift, and X-offset as it scrolls past |
| 🎨 Full-screen Hero Section | Animated entrance with staggered headline reveal, radial glow, grid overlay, and bouncing scroll arrow |
| 🖼️ Artwork images on cards | Each card features a unique AI-generated cinematic artwork covering 65% of the card face |
| 📝 Rich card content | Tag badge, year, artwork image, exhibit title, artist name, edition, and estimated value |
| ✍️ Reveal text | "Museum of Money" headline fades in behind the cards as you reach the end of the scroll |
| ⚡ GPU-composited animation | `will-change: transform`, `translateZ(0)`, `backfaceVisibility: hidden`, and `force3D: true` keep everything on the compositor thread |
| 📱 Responsive layout | `clamp()` fluid typography, viewport-relative sizing throughout |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | Component architecture |
| **Vite** | 7.x | Build tool & dev server |
| **GSAP** | 3.14.x | Animation engine |
| **@gsap/react** | 2.1.x | `useGSAP` hook for React integration |
| **GSAP ScrollTrigger** | (included) | Scroll-linked animation & section pinning |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **@tailwindcss/vite** | 4.x | Vite plugin for Tailwind v4 |

---

## 📁 Project Structure

```
horizontal-scroll-section-main/
├── public/                        # Static assets served by Vite
│   ├── card_burning_note.png      # Card artwork — "The Burning Note"
│   ├── card_ocean_reserve.png     # Card artwork — "Ocean Reserve"
│   ├── card_gold_standard.png     # Card artwork — "Gold Standard"
│   ├── card_invisible_hand.png    # Card artwork — "The Invisible Hand"
│   ├── card_crash_29.png          # Card artwork — "Crash of '29"
│   ├── card_green_futures.png     # Card artwork — "Green Futures"
│   └── card_diamond_ledger.png    # Card artwork — "Diamond Ledger"
│
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Root component — composes Hero + Museum sections
│   ├── HeroSection.jsx            # Full-screen intro with animated headline
│   ├── MuseumSection.jsx          # Horizontal scroll section with floating cards
│   └── index.css                  # Global styles (Tailwind import)
│
├── index.html                     # HTML shell
├── vite.config.js                 # Vite + React + Tailwind plugin config
├── package.json                   # Dependencies & scripts
└── README.md                      # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18.x`
- npm `>=9.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/horizontal-scroll-section-main.git

# 2. Navigate into the project
cd horizontal-scroll-section-main

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview the Production Build

```bash
npm run preview
```

---

## 🗂️ Component Overview

### `HeroSection.jsx`
The first thing a visitor sees — a full-screen, dark-green intro panel.

- **Entrance animation**: Three headline words (`MUSEUM`, `OF`, `MONEY`) slide up from behind a clip mask in a GSAP staggered timeline
- **Radial glow**: Soft emerald radial gradient blooms from the center
- **Grid overlay**: Subtle 60×60px line grid adds depth
- **"THE COLLECTION"** label with flanking lines animates in after the headline
- **Scroll indicator**: A looping bounce animation on the `↓` arrow cues the user to scroll

### `MuseumSection.jsx`
The main horizontal scroll experience.

| Animation | Implementation |
|---|---|
| Horizontal track movement | `gsap.to(scrollRef, { x: "-350vw" })` driven by ScrollTrigger `scrub: 0.5` |
| Per-card rotation & drift | `gsap.to(box, { rotation, y, x })` with `containerAnimation` referencing the main track |
| Reveal text | `gsap.fromTo(revealTextRef, { opacity: 0 }, { opacity: 1 })` triggered at 60–90% of the scrollable range |
| GPU compositing | `willChange: "transform"`, `transform: "translateZ(0)"`, `force3D: true` on all animated elements |

#### Card Data Structure

Each card in the `cards` array contains:

```js
{
  color: "bg-red-500",           // Tailwind background colour class
  image: "/card_burning_note.png", // Path to public artwork image
  title: "The Burning Note",    // Exhibit display name
  artist: "Viktor Ashford",     // Artist / archive name
  year: "1923",                  // Historical year
  edition: "1 of 1",            // Edition info
  value: "$4,200,000",          // Estimated value
  tag: "HYPERINFLATION",        // Category tag shown on the image
}
```

#### All 7 Cards

| # | Card | Tag | Artist | Year | Est. Value |
|---|---|---|---|---|---|
| 1 | 🔴 The Burning Note | HYPERINFLATION | Viktor Ashford | 1923 | $4,200,000 |
| 2 | 🔵 Ocean Reserve | BRETTON WOODS | M. Delacroix | 1971 | $890,000 |
| 3 | 🟡 Gold Standard | COMMODITY | House of Midas | 1944 | $3,100,000 |
| 4 | 🟣 The Invisible Hand | ECONOMICS | Adam S. Collective | 1776 | $7,750,000 |
| 5 | 🟠 Crash of '29 | BLACK TUESDAY | Wall St. Archives | 1929 | $1,500,000 |
| 6 | 🟢 Green Futures | SUSTAINABLE | Eco Vault | 2023 | $450,000 |
| 7 | 🌸 Diamond Ledger | ULTRA RARE | De Beers Est. | 1888 | $9,999,999 |

---

## ⚡ Performance Notes

This project follows several GPU compositing best practices to ensure 60fps scroll performance:

- **`will-change: transform`** is applied to both the scroll track and every card — tells the browser to promote them to independent compositor layers ahead of time
- **`transform: translateZ(0)`** forces GPU layer promotion for older browsers
- **`backface-visibility: hidden`** prevents the browser from rendering the back face of 3D-transformed elements (reduces paint)
- **`force3D: true`** on GSAP tweens ensures `matrix3d()` (GPU path) is always used instead of `matrix()` (CPU path)
- **`backdrop-filter: blur()`** is intentionally avoided on animated elements — blur forces expensive offscreen render passes every frame
- **Images** use `loading="eager"` + `decoding="async"` — decoded off the main thread before animation starts
- **`scrub: 0.5`** instead of `scrub: 1` — less interpolation work per tick, more responsive feel

---

## 🧩 Customisation

### Add a new card

1. Drop your artwork image in `public/` (e.g. `public/card_my_card.png`)
2. Add a new entry to the `cards` array in `MuseumSection.jsx`:

```js
{
  color: "bg-teal-500",
  image: "/card_my_card.png",
  title: "My New Card",
  artist: "Artist Name",
  year: "2024",
  edition: "1 of 10",
  value: "$100,000",
  tag: "CUSTOM TAG",
}
```

3. The GSAP animation loop will automatically pick it up — no other changes needed.

### Change the scroll distance

In `MuseumSection.jsx`, adjust the `x` value and the `end` ScrollTrigger property together:

```js
gsap.to(scrollRef.current, {
  x: "-350vw",   // ← increase for more cards
  scrollTrigger: {
    end: "+=5000", // ← increase proportionally
  }
});
```

### Change card rotation intensity

Adjust the `random()` ranges in the `boxes.forEach` loop:

```js
const randomRotation = gsap.utils.random(-35, 35); // ← degrees
const randomY        = gsap.utils.random(-50, 50); // ← vertical drift px
const randomXOffset  = gsap.utils.random(-100, 100); // ← horizontal drift px
```

---

## 📜 License

MIT — free to use, modify, and distribute.

---

> Built with ❤️ using React + GSAP. Inspired by modern museum & gallery websites.

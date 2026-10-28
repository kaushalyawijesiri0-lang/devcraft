# DevCraft — Frontend Repository

Welcome to the **DevCraft** frontend codebase! This repository contains the complete user interface for the DevCraft guided developer learning platform.

Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## 🏛️ Architecture Overview

To ensure all 5 team members can develop simultaneously without merge conflicts or broken styles, we follow an **Isolated Modular Architecture**:

```
devcraft/
├── public/                 # Static assets, fonts, icons
├── src/
│   ├── assets/             # Shared SVG icons and images
│   ├── components/         # 🌟 SHARED CORE (Do not duplicate)
│   │   ├── layout/         # AppShell, Sidebar, TopBar, ScrollToTop
│   │   ├── effects/        # NetworkBackground (Constellation canvas)
│   │   └── ui/             # Reusable UI tokens: Button, Panel, Card, Badge
│   ├── data/               # Navigation items & static definitions
│   │
│   ├── modules/            # 🚀 FEATURE MODULES (Assigned to each member)
│   │   ├── theory-dojo/    # Member 01: MERN curriculum, lessons & code puzzles
│   │   ├── guided/         # Member 02: Guided projects & workspace steps
│   │   ├── arena-simulator/# Member 03: Monaco code editor bug challenges & lives
│   │   ├── blogs-community/# Member 04: Articles, blogs & community chat
│   │   ├── mentorship/     # Member 05: 1-on-1 mentor booking & wallet
│   │   └── landing-dashboard/ # Landing page & learner launchpad
│   │
│   ├── pages/              # Shell pages: DashboardOverview, ComingSoon
│   ├── utils/              # Authentication helpers & formatters
│   ├── App.tsx             # Central route map
│   └── index.css           # Global Tailwind directives
├── tailwind.config.js      # Unified Navy (#0B1430) & Blue (#1F5EFF) theme tokens
└── package.json
```

---

## 🛠️ Getting Started (Local Setup)

1. Clone and switch to the `develop` branch:
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🤝 Team Contribution Workflow (Git Rules)

1. **Create your feature branch:**
   ```bash
   git checkout -b feature/<your-feature-name>
   ```
   *Example:* `git checkout -b feature/theory-dojo`

2. **Code only in your module folder:**
   * Write all your components, pages, and hooks inside `src/modules/<your-feature-name>/`.
   * Reuse shared buttons and panels from `src/components/ui/`.
   * Use theme colors defined in Tailwind: `bg-navy`, `text-brand`, `bg-primary`.

3. **Register your route in `src/App.tsx`:**
   Replace the `<ComingSoon />` placeholder for your route with your page component.

4. **Commit with clean, human messages:**
   ```bash
   git add .
   git commit -m "add theory dojo lessons and code puzzle screen"
   ```

5. **Push and open a Pull Request:**
   ```bash
   git push origin feature/<your-feature-name>
   ```
   Open a PR to merge into `develop`.

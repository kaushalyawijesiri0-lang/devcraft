# DevCraft — Unified Developer Learning Platform

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.5.4-black?style=for-the-badge&logo=framer&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Modular_SPA-1F5EFF?style=for-the-badge)

<p align="center">
  <strong>A modern, interactive, and gamified MERN-stack developer learning platform.</strong><br />
  Engineered with high-performance reactive UI patterns, modular feature isolation, and an enterprise design system.
</p>

</div>

---

## 📋 Table of Contents
1. [Executive Summary](#-executive-summary)
2. [Architectural Design Philosophy](#-architectural-design-philosophy)
3. [Technology Stack & Technical Justifications](#-technology-stack--technical-justifications)
4. [Project Directory Layout](#-project-directory-layout)
5. [Local Development & Setup](#-local-development--setup)
6. [Team Collaboration & Git Branching Standards](#-team-collaboration--git-branching-standards)
7. [Module Distribution Matrix](#-module-distribution-matrix)
8. [Quality Assurance & Verification](#-quality-assurance--verification)

---

## 🎯 Executive Summary

**DevCraft** is an interactive, full-stack educational ecosystem tailored to accelerate developer mastery in modern web development. Unlike passive video-based tutorials, DevCraft delivers an engaging, hands-on learning trajectory consisting of:

- **Launchpad (Mission Dashboard):** Central telemetry tracking active learning streaks, completed milestones, XP progression, and recommended curriculum next steps.
- **Theory Dojo:** Interactive curriculum modules pairing bite-sized theoretical foundations with immediate AST-validated code puzzles.
- **Guided Workspaces:** Step-by-step real-world project builds featuring live in-browser preview, solution hints, and contextual automated checkpoints.
- **Debug Arena:** High-stakes interactive code-debugging challenges utilizing the Monaco code editor, test suites, lives counter, and execution timers.
- **Community & Technical Blogs:** Peer-to-peer knowledge sharing, discussion channels, and markdown blog publishing.
- **Mentorship Hub:** 1-on-1 industry expert consultation bookings, code review scheduling, and simulated AI guidance.

---

## 🏛️ Architectural Design Philosophy

The DevCraft frontend follows an **Isolated Modular Single Page Application (SPA)** architecture, implementing the **Application Shell Architecture** pattern:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          AppShell Wrapper                              │
│  ┌────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │                        │  │               TopBar                 │  │
│  │                        │  │ (Section Title & User Profile Menu)  │  │
│  │                        │  └──────────────────────────────────────┘  │
│  │      Master Sidebar    │  ┌──────────────────────────────────────┐  │
│  │   (Collapsible, Global │  │        Active Route (<Outlet />)     │  │
│  │      Navigation)       │  │                                      │  │
│  │                        │  │  Launchpad / Theory Dojo / Guided /  │  │
│  │                        │  │       Debug Arena / Blogs / ...      │  │
│  │                        │  └──────────────────────────────────────┘  │
│  └────────────────────────┘                                            │
│  ────────────────────────────────────────────────────────────────────  │
│       Global Background Layer: Interactive Constellation Canvas        │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Architecture Pillars:
1. **Single Source of Truth (SSOT) Design Tokens:** Colors, spacing, and typography are tokenized via `tailwind.config.js`. Global colors utilize deep dark-mode tokens (Navy `#0B1430`, Canvas `#050A17`, Royal Blue Brand `#1F5EFF`) with zero ad-hoc styling.
2. **Persistent Global Shell:** The `AppShell` encapsulates the master collapsible `Sidebar`, clean `TopBar`, and `NetworkBackground` (HTML5 Canvas 2D interactive constellation animation). Page navigation mounts dynamically inside `<Outlet />` without re-rendering or unmounting the shell.
3. **Feature Isolation:** Feature code lives exclusively within isolated module boundaries (`src/modules/<feature-name>/`). Members develop features independently without risking merge conflicts in other team components.

---

## ⚡ Technology Stack & Technical Justifications

| Technology | Selection Rationale | Alternatives Considered & Rejected |
| :--- | :--- | :--- |
| **React 18.3** | Component-driven reusability, declarative Virtual DOM reconciliation, and seamless concurrent rendering capabilities. | **Vanilla JS:** Unmaintainable for complex interactive state (puzzles, lives).<br>**Angular:** Unnecessary enterprise overhead and steep learning curve. |
| **TypeScript 5.5** | Enforces compile-time type safety across team members, eliminates `undefined` runtime exceptions, and provides autocompletion for shared data models. | **Plain JavaScript:** Allows runtime type discrepancies to pass into production builds undetected. |
| **Vite 5.2** | Native ES modules support, sub-second Hot Module Replacement (HMR), and optimized Rollup production builds. | **Create React App (CRA):** Deprecated by the React team; slow Webpack bundling overhead. |
| **Tailwind CSS 3.4** | Utility-first compilation that tree-shakes unused classes to produce production stylesheets under 30KB. Enforces consistent design token usage. | **Bootstrap:** Cookie-cutter aesthetics and complex class overrides.<br>**Vanilla CSS:** High risk of global namespace collisions and stylesheet bloat. |
| **Framer Motion 11.5** | Declarative 60FPS hardware-accelerated animations for smooth modal transitions, tabs, and layout state shifts. | **Raw CSS Keyframes:** Cumbersome to orchestrate for enter/exit animations linked to React unmount lifecycle. |
| **Lucide React** | Ultra-lightweight, tree-shakeable SVG icon collection adhering to a unified 24px stroke grid. | **FontAwesome:** Bloated font packages that induce Flash of Unstyled Text (FOUT). |

---

## 📂 Project Directory Layout

```
devcraft/
├── public/                       # Static public assets, avatars, and project thumbnails
├── src/
│   ├── assets/                   # Shared vector graphics, SVG icons, and brand marks
│   ├── components/               # Core Shared Architecture
│   │   ├── effects/              # Canvas graphics (NetworkBackground constellation)
│   │   ├── layout/               # Application Shell: AppShell, Sidebar, TopBar, ScrollToTop
│   │   └── ui/                   # Shared Atomic UI Kit: Button, Panel, Card, Badge, ProgressBar
│   │
│   ├── data/                     # Global navigation registries and system constants
│   ├── modules/                  # 🚀 Isolated Feature Domains (Team Workspaces)
│   │   ├── theory-dojo/          # [Member 01] Lessons, curriculum index, code puzzles
│   │   ├── guided/               # [Member 02] Guided fullstack workspaces & step verifiers
│   │   ├── arena-simulator/      # [Member 03] Monaco code editor challenges, timers & lives
│   │   ├── blogs-community/      # [Member 04] Technical articles, writer studio & chat rooms
│   │   ├── mentorship/           # [Member 05] Mentor directory, booking flow & wallet
│   │   ├── landing-dashboard/    # Platform landing page & launchpad dashboard widgets
│   │   └── auth-arena/           # Authentication interfaces (Login, Register, Demo profiles)
│   │
│   ├── pages/                    # Shell-level views (LaunchpadDashboard, ComingSoon)
│   ├── types/                    # Shared TypeScript interfaces (learning, navigation, auth)
│   ├── utils/                    # Shared pure helper utilities (auth tokens, formatting, math)
│   ├── App.tsx                   # Central route controller & provider hierarchy
│   ├── index.css                 # Global Tailwind directives & font imports
│   └── index.tsx                 # DOM mounting and application bootstrap
│
├── tailwind.config.js            # Design system palette, brand tokens, and font mappings
├── vite.config.ts                # Vite build and development server configuration
├── tsconfig.json                 # TypeScript strict compiler rules and path resolutions
└── package.json                  # Project metadata, dependencies, and execution scripts
```

---

## 🚀 Local Development & Setup

### Prerequisites
- **Node.js:** `v18.0.0` or higher (LTS recommended)
- **npm:** `v9.0.0` or higher
- **Git**

### Installation

1. Clone the repository and switch to the development branch:
   ```bash
   git clone https://github.com/kaushalyawijesiri0-lang/devcraft.git
   cd devcraft
   git checkout develop
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`.

4. Execute production bundle compilation:
   ```bash
   npm run build
   ```

---

## 🤝 Team Collaboration & Git Branching Standards

To maintain high code quality and prevent merge conflicts across the 5 developers, the team strictly adheres to **Gitflow Feature-Branching**:

```
develop ────────────────────────────●────────────────────────●────────► (Main staging)
           \                       /                        /
            └── feature/theory-dojo ──┘ (PR #1)             /
             \                                             /
              └── feature/guided-workspace ───────────────┘ (PR #2)
```

### Git Rules of Engagement:
1. **Never commit directly to `develop` or `main`.** All work occurs on isolated feature branches.
2. **Branch Naming Standard:**
   - Features: `feature/<module-name>` (e.g., `feature/theory-dojo`, `feature/debug-arena`)
   - Bugfixes: `fix/<issue-description>`
   - Chores: `chore/<task-description>`
3. **Commit Message Format (Conventional Commits):**
   ```text
   feat: add interactive code puzzle validation in theory dojo
   fix: resolve mobile sidebar backdrop toggle
   docs: update team contribution guide in README
   style: refine topbar typography and padding
   ```
4. **Pull Request Protocol:**
   - Every PR must target the `develop` branch.
   - Code must pass `npm run build` locally with zero TypeScript warnings before opening a PR.
   - PR description must summarize what was added, modified, and verified.

---

## 👥 Module Distribution Matrix

| Feature Module | Primary Path | Assigned Responsibility | Deliverables |
| :--- | :--- | :--- | :--- |
| **01. Theory Dojo** | `src/modules/theory-dojo/` | Member 01 (Kaushalya) | Lesson reader, course curriculum sidebar, interactive code quiz component, XP results screen. |
| **02. Guided Workspace** | `src/modules/guided/` | Member 02 | Fullstack project catalog, step guidance panel, AST verification check, code preview. |
| **03. Debug Arena** | `src/modules/arena-simulator/` | Member 03 | Monaco code editor integration, bug challenge runners, timer countdown, hearts/lives state. |
| **04. Blogs & Community** | `src/modules/blogs-community/` | Member 04 | Article listings, rich text publishing editor, community discussion channels, member profiles. |
| **05. Mentorship & Launchpad**| `src/modules/mentorship/` & `src/modules/landing-dashboard/` | Member 05 | Mentor profiles, booking flow, learner dashboard cards, streak and activity charts. |

---

## 🧪 Quality Assurance & Verification

- **Linting & Code Style:** Enforced via ESLint with TypeScript and React Hooks plugins (`npm run lint`).
- **Type Checking:** Strict compiler assertions validated through `tsc` on build (`npm run build`).
- **Responsive Viewport Support:** Tested across mobile (<640px), tablet (640px–1024px), and desktop (1024px+) viewports.
- **Motion Accessibility:** Automatically respects `prefers-reduced-motion` settings via Framer Motion's `<MotionConfig reducedMotion="user">`.

---

<div align="center">
  <sub>Developed with pride by the DevCraft Engineering Team. Licensed under the MIT License.</sub>
</div>

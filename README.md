<div align="center">

# DevCraft

### A Guided MERN Stack Learning Platform & Developer Community

Learn concepts. Build applications. Practise debugging. Connect with mentors.

**Team 22 · DoD**  
Faculty of Information Technology · University of Moratuwa

[Overview](#overview) ·
[Features](#planned-features) ·
[Technology](#technology-direction) ·
[Roadmap](#development-roadmap) ·
[Team](#the-team) ·
[Resources](#project-resources)

</div>

---

## Overview

DevCraft is a learning platform for students and developers studying the MERN stack: **MongoDB, Express.js, React, and Node.js**.

The project brings structured lessons, guided coding, debugging challenges, community discussions, and mentorship into one learning environment. Learners will be able to apply concepts through practical activities, receive feedback, and track their progress.

Developed for **IN2901 - Software Development Project**, DevCraft is organized into five development responsibilities with shared interface conventions and integration boundaries.

> **Development status:** Module UI designs and UML/ER diagrams have been completed by the team. This repository is being prepared for implementation. Frontend development is the next planned stage; the features below describe the intended scope.

## Planned Features

| Area | Planned capabilities |
| :--- | :--- |
| **Guided Coding Workspace** | Step by step projects, a three panel coding interface, Monaco Editor, live preview, code validation, and progressive step unlocking. |
| **Theory Dojo** | Level based notes and videos, code completion puzzles, assessment feedback, learning history, and daily streaks. |
| **Debugging Simulator** | Faulty code challenges with error logs, countdown timers, three lives, and validated completion rewards. |
| **Developer Community** | Categorized technical articles, real time discussions, and connections to verified mentor profiles. |
| **Hybrid Mentorship** | AI assisted guidance, coin based usage, mentor discovery, availability, and session booking. |
| **Leaderboard & Rewards** | Experience point rankings and eligible discounts based on agreed reward policies. |

### How the learning experience connects

1. **Study** a concept through structured notes and video lessons.
2. **Practise** through programming puzzles and guided projects.
3. **Debug** faulty code in a controlled challenge environment.
4. **Get support** from community discussions, AI assistance, or human mentors.
5. **Review progress** through assessment history and qualifying activity records.

## Technology Direction

The following technologies are identified in the project proposal. Their inclusion here describes the planned architecture, not a completed integration.

| Layer | Planned technology |
| :--- | :--- |
| Frontend | React, Tailwind CSS |
| Application services | Node.js, Express.js |
| Database | MongoDB |
| Code editor | Monaco Editor |
| Real-time communication | Socket.IO |
| Payment integration | PayHere |
| Design and modelling | Figma, draw.io |
| Project coordination | Jira, GitHub |

**Selections still to be finalized:** AI provider, isolated code runtime, state management library, animation library, and media-hosting service.

Code validation will distinguish **static analysis**, which checks code structure, from **automated tests**, which check behaviour.

## Development Roadmap

| Stage | Status |
| :--- | :--- |
| Module UI designs | Completed |
| Module UML and ER diagrams | Completed |
| Repository initialization | Completed |
| Shared frontend foundation | Planned |
| Module frontend implementation | Planned |
| Backend services and persistence | Planned |
| External integrations | Planned |
| End-to-end testing and evaluation | Planned |

Completed module designs will be reviewed for consistency during integration. Implementation progress will be linked to relevant pull requests and verification evidence.

## Getting Started

This repository currently contains the initial project documentation and Git ignore configuration. The application scaffold and executable setup instructions will be added during implementation.

### Clone the repository

```bash
git clone https://github.com/kaushalyawijesiri0-lang/devcraft.git
cd devcraft
```

### Application setup

Installation commands, supported runtime versions, environment variable examples, and development scripts will be documented once the application scaffold has been added and verified.

## Planned Repository Organization

| Location | Purpose |
| :--- | :--- |
| `client/` | Frontend application, shared components, and module interfaces. |
| `server/` | APIs, authorization, business rules, and database access. |
| `docs/` | Proposals, requirements, architecture, diagrams, and reports. |
| `.github/` | Collaboration templates and automated checks. |
| `README.md` | Project overview and entry point for contributors. |

This is the intended structure. Directories will be introduced as their contents are added.

## The Team

| Member | Index number | Primary responsibility |
| :--- | :--- | :--- |
| Wijesiri K.S.K. | 244230C | Theory Dojo and overall UI/UX architectural direction |
| Dinisuru P.W.L. | 244047V | Hybrid mentorship, payments, coin usage, and discount rewards |
| Madhushan M.A. | 244118P | Debugging simulator and global leaderboard |
| Kalhari L.T. | 244096T | Technical community, articles, and real-time discussion |
| Gunasekara M.I.T. | 244068K | Guided coding workspace, code validation, and contextual interactions |

### Academic Supervision

**Supervisor:** Ms. M. N. Chandimali  
**Industry Mentor:** Mr. H. K. Gaminda Ishara — Creative Software

**Module:** IN2901 — Software Development Project  
**Programme:** BSc (Hons) in Information Technology  
**Institution:** University of Moratuwa

## Team Contribution Workflow

The proposed contribution workflow is:

1. Select an assigned Jira task and review its acceptance criteria.
2. Create a focused branch from the latest `main`.
3. Implement the change and perform the relevant checks.
4. Open a pull request describing the change and its verification.
5. Request a teammate review and address feedback before merging.

### Branch examples

```text
feat/theory-dojo-lesson-view
feat/community-article-editor
fix/workspace-preview-layout
docs/update-system-diagrams
```

### Commit examples

```text
feat: add lesson catalogue interface
fix: preserve quiz answers during navigation
docs: document local development setup
```

Keep changes focused. Coordinate modifications to shared navigation, styling, identity, and integration contracts with the relevant module owners.

## Project Resources

- [Figma workspace](https://www.figma.com/design/8Bov5OrLBYEBx2FmUiqqgK/DevCraft--DoD)
- [Jira project board](https://team22dod.atlassian.net/jira/software/projects/SCRUM/boards/1)

Access to these resources depends on the permissions configured in each service.

Proposal documents, diagram source files, and report references will be organized under `docs/` as they are added.

## Configuration and Credentials

Commit configuration examples with placeholder values so team members can reproduce the setup.

Keep actual credentials, API keys, database connection secrets, and local environment files out of version control. Environment requirements will be documented alongside the relevant application services.

---

<div align="center">

**DevCraft · Team 22 — DoD**  
IN2901 Software Development Project · University of Moratuwa

</div>

# Password Strength Checker and Security Awareness Tool

**Information Security Final Project — South East European University**
**Option B: Security Application / Educational Prototype**

A beginner-friendly, fully client-side tool that checks password strength in real time, explains weaknesses, and educates users about security risks.

## Quick Links

- Open `index.html` in any browser to run the tool
- See `report.md` for the complete academic report, annotated bibliography, presentation slides, and submission checklist

## Features

- **Real-Time Strength Meter** — colored progress bar (Weak/Medium/Strong) with score 0–100
- **Requirements Checklist** — CSS-only ✔/✘ indicators for 5 criteria (length, uppercase, lowercase, numbers, special chars)
- **Security Feedback Messages** — specific, actionable suggestions per missing requirement
- **Password Visibility Toggle** — SVG eye icon, switches input type
- **Estimated Crack Time** — educational heuristic ("instantly" → "centuries") with entropy display in bits
- **Random Password Generator** — Fisher-Yates shuffled, 16-char, guaranteed character diversity
- **Educational Tips Section** — 6 numbered cards: brute-force, credential stuffing, MFA, password managers
- **Fully Client-Side** — no data transmitted or stored; safe to test real passwords

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 — semantic, ARIA-labeled, keyboard-accessible |
| Styling | CSS3 — custom properties, flexbox/grid, responsive, CSS-only iconography |
| Logic | Vanilla JavaScript — DOM manipulation, regex validation, entropy formula |
| External | None — zero dependencies, zero network requests |

## How to Run

1. Download the project
2. Open `index.html` in any browser (Chrome, Firefox, Edge, Safari)
3. No server, no install, no `npm` required

## Project Structure

```
├── index.html          Main page (SVG icons, glass-morphism cards)
├── style.css           Design system: dark theme, responsive grid, animations
├── script.js           Password analysis, scoring, generator, entropy calculation
├── README.md           This file
└── report.md           Full academic report + annotated bibliography + slides
```

## Security Concepts Demonstrated

- **Authentication** — password as "something you know"; strength directly impacts authentication security
- **Confidentiality** — strong passwords prevent unauthorized data access
- **Risk Management** — scoring/entropy helps users assess and reduce their password risk
- **Data Minimization** — client-side architecture means zero data collection or transmission

## Scoring System

| Criterion | Points |
|---|---|
| Length >= 8 characters | +20 |
| Contains uppercase (A–Z) | +20 |
| Contains lowercase (a–z) | +20 |
| Contains number (0–9) | +20 |
| Contains special character | +20 |
| **Maximum** | **100** |

- **0–39:** Weak (red)
- **40–69:** Medium (amber)
- **70–100:** Strong (green)
# Information-Security-FinalProject

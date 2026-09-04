# JARVIS COMMAND CENTER - Autonomous Agent Orchestration & Neural Telemetry UI

A futuristic, high-performance web command center built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion. Features a clean, multi-ring concentric circular neural reactor core, real-time telemetry HUD, zero-trust security postures, ElevenLabs TTS synthesis, and decoupled mock/type contracts designed for full production scalability.

---

## Key Highlights and Visual Architecture

- Dominant Multi-Ring Neural Reactor Core: 5 concentric orbital tiers (R = 82px to 248px), radiant cyan energy iris, rotating telemetry brackets, and GPU-accelerated canvas photon streams at 60fps.
- 7 Core Operational Views:
  1. `/` - Chief Brain & Health (Dominant Centerpiece, Top HUD Metrics, Grouped Shopify & Agent Mesh Telemetry, Finance Breakdown).
  2. `/agent-network` - 9-Node Agent Mesh Topology with Interactive Live Inspector & Diagnostics.
  3. `/approvals` - Human-In-The-Loop Approval Queue with Interactive Resolution Actions.
  4. `/finance` - Financial & Operational Resource Control with Budget Gauges & Cost Distributions.
  5. `/knowledge` - Obsidian Neural Knowledge Graph & Vector Search Simulator.
  6. `/security` - Zero-Trust Security Posture, Active Vaults & Live Audit Trail.
  7. `/voice` - ElevenLabs TTS Synthesis Engine, Voice Preset Selectors & Audio Bus Benchmarks.
- Fullscreen Immersive Voice Mode: 60% viewport focal portal overlay with real-time state switches (Listening, Processing, Speaking).
- Zero Scrollbar Desktop Viewport: Optimized layout hierarchy fitted to standard 1080p desktop viewports without parasitic scrollbars.
- Decoupled Architecture: Clean separation of UI components (`/components`), TypeScript interfaces (`/types`), and simulated mock telemetry datasets (`/mocks`) for backend API integration.

---

## Tech Stack and Prerequisites

- Framework: Next.js 15.5.23 (App Router)
- Language: TypeScript 5.x
- Styling: Tailwind CSS 3.4.17 with custom Sci-Fi HUD glows
- Animations: Framer Motion 12.x and Canvas 2D GPU Acceleration
- Icons: Lucide React
- Testing: Playwright E2E Suite (100% test coverage across all routes and API endpoints)
- Target: Node.js 18.x or 20.x+ / Vercel

---

## Getting Started (Local Development)

### 1. Prerequisites
Ensure you have Node.js (v18.17.0 or v20.x+) and npm (v9.x+) installed:
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/lopersonal355-lab/jarvis-command-center-axel.git
cd jarvis-command-center-axel
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables (Optional)
Copy the example environment file:
```bash
cp .env.example .env.local
```
Add your ElevenLabs API Key if you want live cloud synthesis:
```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```
*Note: If no API key is provided, the application runs automatically on the built-in native English fallback engine without errors.*

### 5. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

---

## Production Build and Verification

### Build Optimized Production Bundle
```bash
npm run build
```

### Run Local Production Server
```bash
npm run start
```
Starts the production server on port 3000.

---

## Automated Testing (Playwright E2E)

Run the automated Playwright E2E suite covering all 7 views, modal overlays, ElevenLabs API route, and responsive layout assertions:

```bash
# Run all automated tests headlessly
npx playwright test

# Run tests with interactive UI
npx playwright test --ui
```

---

## Deployment Guide (Vercel)

### Option A: Automatic Git Integration
1. Go to your Vercel Dashboard and click "Add New..." -> "Project".
2. Import the `jarvis-command-center-axel` repository from your GitHub organization.
3. In Project Settings -> Environment Variables, add `ELEVENLABS_API_KEY`.
4. Click Deploy. Vercel will automatically build and deploy new commits pushed to `main`.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel deploy --prod
```

---

## Repository and Codebase Structure

```text
├── docs/                          # Engineering & template documentation
│   ├── ARCHITECTURE.md            # System design and component hierarchy
│   ├── DEPLOYMENT.md              # Zero-downtime deployment guide
│   └── TEMPLATE_GUIDE.md          # Duplication and white-labeling manual
├── e2e/                           # Automated Playwright test suites (11/11 passing)
│   ├── routes.spec.ts             # 9 Comprehensive E2E route & API verification tests
│   ├── screenshots.spec.ts        # Visual capture automated suite
│   └── voice-speed.spec.ts        # Speech synthesis engine test suite
├── src/
│   ├── app/                       # Next.js 15 App Router pages
│   │   ├── page.tsx               # Chief Brain Dashboard (/)
│   │   ├── agent-network/         # Agent Network view (/agent-network)
│   │   ├── api/voice/             # ElevenLabs server-side TTS route (/api/voice)
│   │   ├── approvals/             # Approval Queue view (/approvals)
│   │   ├── finance/               # Finance & Operations view (/finance)
│   │   ├── knowledge/             # Knowledge & Research view (/knowledge)
│   │   ├── security/              # Security view (/security)
│   │   ├── voice/                 # Voice Status view (/voice)
│   │   ├── layout.tsx             # Root layout with AppShell wrapper
│   │   └── globals.css            # Sci-Fi glowing design tokens & CSS resets
│   ├── components/
│   │   ├── brain/                 # HolographicSphere, ChiefBrainCenterpiece, Immersive mode
│   │   ├── hud/                   # Specialized domain telemetry & metric widgets
│   │   ├── layout/                # AppShell, SidebarNav, HeaderHUD, FooterHUD
│   │   └── ui/                    # Reusable GlassCard, GlowBadge
│   ├── config/
│   │   └── jarvis.config.ts       # Master configuration singleton (branding & modules)
│   ├── context/
│   │   └── AppContext.tsx         # Global state with LocalStorage approval sync
│   ├── hooks/
│   │   └── useVoiceEngine.ts      # ElevenLabs streaming & Web Speech hook
│   ├── mocks/                     # Decoupled mock datasets for all views
│   └── types/                     # Strict TypeScript schemas and contracts
├── .env.example                   # Environment variable specification template
├── playwright.config.ts           # Playwright E2E configuration
├── tailwind.config.ts             # Sci-Fi cyan/violet custom color palettes
├── tsconfig.json                  # Strict TypeScript configuration
└── package.json                   # Dependencies and npm scripts
```

---

## Handover and Ownership Confirmation

1. Complete Editable Source Code: 100% of source files, assets, TypeScript definitions, tests, and configurations are committed to the GitHub repository.
2. Developer-Ready Architecture: Decoupled schemas in `/types` and `/mocks` for direct connection to Supabase, n8n, Obsidian, or live WebSockets in Milestone 3.
3. Commercial Ownership: Full commercial ownership and unrestricted modification rights transferred to the client.

---

## Project Roadmap and Milestone Checklists

### Milestone 1: Core Architecture, 7 Views & Dominant Chief Brain ($250 USD) - [APPROVED]
- [x] Initial project setup (Next.js 15 App Router, React 19, TypeScript, Tailwind CSS).
- [x] Strict sci-fi color palette implementation (#02040a deep navy background, #00E5FF electric cyan energy, #7B2CBF violet accents).
- [x] Dominant Chief Brain centerpiece on main dashboard (/) with 5 concentric orbital rings (R = 82px to 248px), radiant photon particles, and rotating telemetry brackets.
- [x] Removal of horizontal waveform line crossing through the circular reactor core across all views and modes.
- [x] Peripheral layout restructuring: compacted top HUD metrics (n8n, Docker, Obsidian, Agent Activity), relocated Shopify Telemetry to bottom-left, and placed Finance summary on right.
- [x] Baseline implementation of all 7 core views (/ , /agent-network, /approvals, /finance, /knowledge, /security, /voice).
- [x] Fullscreen Immersive Voice Mode focal portal overlay with real-time state toggling.
- [x] Playwright E2E automated test suite and live Vercel staging deployment.
- [x] Formal review and milestone sign-off by client.

### Milestone 2: ElevenLabs TTS Integration, Audio Reactivity & Voice Status ($250 USD) - [APPROVED BY CLIENT / SUBMITTED]
- [x] Server-side ElevenLabs TTS API Route (/api/voice) proxying requests securely with zero browser API key exposure.
- [x] Built-in high-fidelity native English and Spanish fallback engines when ELEVENLABS_API_KEY is not configured.
- [x] Web Audio API AnalyserNode integration for real-time audio spectrum analysis and reactor pulsing.
- [x] 3-state voice reactivity cycle: Listening -> Processing (synthesizing) -> Speaking (playing audio) -> Listening.
- [x] Interactive "TEST AUDIO / TTS" button on the Chief Brain centerpiece header.
- [x] Three clean natural voice presets: Jarvis Prime (English Male), FRIDAY Neural (English Female), and Elena (Spanish Voice / España).
- [x] Real-time speech speed and pacing slider (0.6x to 1.2x) with quick presets (0.75x Lyrics, 0.85x Calm, 1.0x Fast).
- [x] Interactive custom speech synthesis console with song lyrics benchmark validation (/voice).
- [x] Environment configuration template (.env.example) and Vercel documentation.
- [x] Playwright E2E suite updated (11/11 automated tests passing on live staging).

### Milestone 3: Polish, Schemas & Master Template Configuration ($200 USD) - [COMPLETED / READY FOR CLIENT SIGN-OFF]
- [x] Final UI and interaction polish across all 7 views and peripheral widgets with strict sci-fi token consistency.
- [x] Complete decoupled TypeScript interfaces and JSON mock schemas for Supabase, n8n, and Obsidian integrations (src/types/schemas.ts).
- [x] Master template architecture with centralized configuration file (src/config/jarvis.config.ts) managing branding, modules, agent roster, and API connections.
- [x] Comprehensive Master Template Duplication Guide (docs/TEMPLATE_GUIDE.md).
- [x] Full test suite verification (11/11 automated Playwright tests passing).
- [x] Final project verification, GitHub sync, and commercial handover delivery.

<div align="center">

# 🏟️ StadiumOS

### AI-Powered Stadium Operations Platform for FIFA World Cup 2026

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-StadiumOS-0ea5e9?style=for-the-badge)](https://stadium-os.vercel.app)
[![Built With](https://img.shields.io/badge/Built_With-React_+_TypeScript-3b82f6?style=for-the-badge&logo=react)](https://react.dev)
[![AI Powered](https://img.shields.io/badge/AI-Gemini_2.0_Flash-f59e0b?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Architecture](https://img.shields.io/badge/Pattern-MVC-10b981?style=for-the-badge)]()

*A GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, and venue staff.*

</div>

---

## 🎯 Problem Statement

> **Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff.**

The FIFA World Cup 2026 will be the largest sporting event in history — 48 teams, 104 matches, 16 host cities. Managing 80,000+ spectators per venue demands intelligent, real-time operational tools that go far beyond traditional stadium management.

**StadiumOS** is a unified AI command center that transforms raw stadium data into actionable intelligence for every stakeholder.

---

## ✨ Key Features

### 🤖 FanPilot AI — Generative AI Assistant
- **Context-aware chat** powered by Google Gemini 2.0 Flash
- Role-adaptive responses (fan guidance, security intel, ops commands, volunteer tasks)
- Real-time stadium data integration (crowd density, gate queues, facilities)
- Streaming responses with typing indicators

### 🗺️ Interactive Stadium Map
- **SVG-based stadium visualization** with 12 sections across upper and lower tiers
- Real-time crowd density heatmap overlay (Red/Yellow/Green zones)
- Gate wait time indicators with live queue estimates
- Animated wayfinding routes from current location to seat
- POI markers (Medical, Food, Restrooms, Merch, Emergency, Accessible)
- Click-to-inspect section details (capacity, occupancy %, headcount)

### ♿ Accessibility Intelligence
- Wheelchair-accessible route planning with elevator/ramp detection
- Accessible facility locator (restrooms, seating, hearing loops)
- AI-powered accessibility insights and recommendations

### 🚨 Security & Emergency Management
- AI threat assessment with anomaly detection
- Crowd surge monitoring with critical sector alerts
- One-click evacuation protocol activation
- Unit deployment recommendations
- Emergency mode with visual scanline alerts

### 📊 Crowd Analytics Matrix
- Real-time occupancy tracking across all sections
- Density classification (Heavy / Moderate / Light)
- Historical trend visualization with interactive charts
- Predictive crowd flow analysis

### 🚌 Transit Hub
- Multi-modal transport status (Metro, Bus, Taxi, Parking)
- Real-time delay tracking and capacity monitoring
- AI-optimized departure recommendations

### 🌱 Sustainability Dashboard
- Live energy, water, and waste metrics
- Carbon footprint tracking with offset progress
- AI sustainability recommendations

### 🎫 Smart Ticketing
- Digital ticket with QR code and seat visualization
- Section-level navigation from ticket view

### 👥 Volunteer Task Management
- Priority-ranked task queue with urgency indicators
- Multilingual support for international volunteer coordination

---

## 🏗️ Architecture

StadiumOS follows a strict **Model-View-Controller (MVC)** architecture:

```
src/
├── models/            # Data layer — types, constants, simulation
│   ├── types.ts       # TypeScript interfaces & type definitions
│   ├── constants.ts   # Role configs, navigation, layers, POIs
│   └── simulation.ts  # Real-time data simulation engine
│
├── views/             # Presentation layer — pure UI components
│   ├── layouts/       # AppShell, Sidebar, Header
│   ├── pages/         # Landing, Dashboard (panel router)
│   ├── panels/        # Feature panels (Crowd, Security, etc.)
│   ├── widgets/       # StadiumMap, MatchTicker, AIChat
│   ├── shared/        # Reusable components (GlassCard, PanelShell)
│   └── overlays/      # CommandPalette, ProfileModal
│
├── controllers/       # Business logic — state management
│   ├── useAppState.ts    # Central app state hook
│   ├── useLiveData.ts    # Real-time data polling hook
│   ├── useMatchClock.ts  # Match clock progression
│   ├── useAI.ts          # AI chat controller
│   └── LiveDataContext.tsx # Shared data context provider
│
├── services/          # External integrations
│   └── ai-service.ts  # Gemini 2.0 Flash API client with streaming
│
├── utils/             # Shared utilities
│   ├── cn.ts          # Tailwind class merger (clsx + tailwind-merge)
│   ├── security.ts    # XSS sanitization, rate limiting, CSP
│   ├── validation.ts  # Ticket format parsing & validation
│   └── performance.ts # Debounce, throttle, measurePerformance
│
├── __tests__/         # Unit test suites (Vitest)
│
└── styles/
    └── index.css      # Design system tokens, glass morphism, animations
```

### Design Decisions
- **Role-based adaptive UI**: Single codebase serves 4 distinct user personas (Fan, Security, Organizer, Volunteer)
- **Glass morphism design system**: Premium frosted-glass surfaces with backdrop blur
- **Zero-dependency SVG map**: Stadium visualization built entirely in React + SVG — no map library overhead
- **Streaming AI responses**: Real-time token-by-token Gemini output for natural conversation feel

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript 5.9 |
| **Styling** | Tailwind CSS v4, Custom Glass Morphism System |
| **AI Engine** | Google Gemini 2.0 Flash (Generative AI SDK) |
| **Animation** | Framer Motion, CSS Keyframe Animations |
| **Icons** | Lucide React |
| **Testing** | Vitest |
| **Build** | Vite 8, pnpm |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm)

### Installation

```bash
# Clone the repository
git clone https://github.com/Jeet1511/StadiumOS.git
cd StadiumOS

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env:
# VITE_GEMINI_API_KEY=your_api_key_here

# Start development server
pnpm dev
```

### Get a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Click **"Create API Key"**
3. Add it to your `.env` file as `VITE_GEMINI_API_KEY`

---

## 🎭 User Roles

| Role | Persona | Key Features |
|------|---------|-------------|
| 🎫 **Fan** | Alex Ridge, Section 112 | Wayfinding, food ordering, seat navigation, transit info |
| 🛡️ **Security** | Clearance 4 Officer | Threat assessment, crowd monitoring, evacuation protocols |
| 📋 **Organizer** | Venue Manager | Staff deployment, sustainability, revenue analytics |
| 🙋 **Volunteer** | Field Coordinator | Task queue, multilingual support, incident reporting |

---

## 🌐 GenAI Integration

StadiumOS leverages **Google Gemini 2.0 Flash** for:

1. **Contextual Stadium Assistance** — AI understands the live match state, crowd conditions, and facility status to provide hyper-specific guidance
2. **Role-Adaptive Intelligence** — The same AI engine adapts its personality, data access, and response style based on whether it's assisting a fan, security officer, organizer, or volunteer
3. **Real-Time Decision Support** — Security personnel receive AI-generated threat assessments; organizers get deployment recommendations; fans get optimal routes
4. **Streaming Responses** — Token-by-token streaming for a natural, responsive conversation experience

### Example Interactions
```
Fan:      "Where is my seat?"
AI:       "Your seat is Section 112, Row F, Seat 24 — lower tier, 
           south-east quadrant. Take Gate S (4 min wait) and follow 
           the south concourse. ~4 min walk from your current position."

Security: "Any crowd anomalies?"
AI:       "Density anomaly detected at Gate N — 14 min queue, 91% 
           north concourse capacity. Recommend deploying 4 additional 
           units to north perimeter and diverting fans to Gate W (4 min)."
```

---

## 📸 Screenshots

<div align="center">

| Fan Experience | Security Command |
|:-:|:-:|
| Interactive stadium map with wayfinding | Crowd density heatmap with threat alerts |

| Accessibility | AI Chat |
|:-:|:-:|
| Wheelchair-accessible route planning | Context-aware Gemini-powered assistant |

</div>

---

## 🏆 Hackathon Challenge Alignment

This project directly addresses **every** hackathon challenge area with **specific, working implementations**:

| # | Challenge Area | StadiumOS Implementation | Key Files |
|---|---------------|--------------------------|-----------|
| 1 | **🤖 GenAI Integration** | Gemini 2.0 Flash with streaming, role-adaptive system prompts, live stadium data in context, 4 distinct AI personalities | `ai-service.ts`, `useAI.ts`, `AIChat.tsx` |
| 2 | **🗺️ Navigation & Wayfinding** | SVG digital twin with animated wayfinding routes, gate queue overlays, POI markers, click-to-inspect sections | `StadiumMap.tsx`, `WayfindingPanel.tsx` |
| 3 | **👥 Crowd Management** | Real-time density heatmap, critical zone alerts (>85%), trend indicators (rising/falling/stable), AI anomaly detection | `CrowdPanel.tsx`, `useLiveData.ts`, `simulation.ts` |
| 4 | **♿ Accessibility** | Wheelchair-accessible route planning, elevator/ramp detection, hearing loop zones, accessible facility locator, WCAG 2.1 AA compliance | `AccessibilityPanel.tsx`, `AppShell.tsx` |
| 5 | **🚌 Transportation** | Multi-modal transit hub (Metro, Bus, Taxi, Parking), live capacity/delay tracking, AI-optimized departure recommendations | `TransportPanel.tsx` |
| 6 | **🌱 Sustainability** | Energy/water/waste KPIs, carbon offset tracking, FIFA Green Score (B+), AI sustainability recommendations | `SustainabilityPanel.tsx` |
| 7 | **🎫 Smart Ticketing** | FIFA WC26 ticket format validation (`WC26-XX-NNNNNN-LNN`), QR code visualization, section-level seat navigation | `TicketPanel.tsx`, `validation.ts` |
| 8 | **🛡️ Security & Emergency** | AI threat assessment, crowd surge prediction, one-click evacuation protocol, emergency mode visual transformation | `SecurityPanel.tsx`, `useAppState.ts` |
| 9 | **🙋 Volunteer Management** | Priority-ranked task queue, multilingual translation support, shift tracking, incident reporting | `VolunteerPanel.tsx` |
| 10 | **🌐 Multilingual Support** | AI assistant responds in any language requested, volunteer translation quick-actions, international fan personas | `ai-service.ts` system prompt |

---

## ⚡ Performance & Efficiency

StadiumOS implements **production-grade** performance optimizations beyond MVP level:

### Rendering Efficiency
- **React.memo** on every component with custom comparators where needed (`StadiumMap`, `GlassCard`, `StatusBadge`, `AppShell`, `MatchTicker`, `Landing`, `ProfileModal`)
- **useCallback** on every event handler — zero inline arrow functions in JSX
- **useMemo** on all derived computations (totalAttendance, avgDensity, criticalZones)
- **Stable callback references** — `useAppState` returns `openProfile`/`closeProfile` instead of `() => setProfileOpen(true)`
- **useRef-based change detection** — `useLiveData` compares previous data snapshots and skips re-renders when data hasn't meaningfully changed (density threshold: 2%)

### Code Splitting & Bundle Optimization
- **React.lazy** for all panels and the Landing page (10+ code-split chunks)
- **Vite manual chunks** — vendor libraries split into `vendor-react`, `vendor-motion`, `vendor-ai`, `vendor-icons`
- **Suspense boundaries** at panel and page levels for progressive loading

### CSS & Layout Performance
- **CSS containment** (`contain: layout style paint`) on navigation, main content, and complementary panels
- **content-visibility: auto** on side panels — browser skips layout/paint for off-screen content
- **Scoped will-change** — only applied to elements that actually animate (`.animate-float`, `.animate-pulse`), not globally
- **Font preloading** via HTML `<link rel="preconnect">` — zero layout shift from font loading

### Data Flow Efficiency
- **Single polling instance** — `LiveDataProvider` context eliminates N independent `setInterval` timers across N panels
- **Split state architecture** — crowd, transport, sustainability, and queue data are separate state variables so unchanged data types don't trigger re-renders
- **Streaming AI responses** via `requestAnimationFrame`-batched DOM updates (not per-token state updates)
- **Rate limiting** on AI API calls (10 requests/minute) prevents abuse and reduces costs

---

## 🔒 Security

- **XSS Protection** — All user inputs sanitized via `sanitizeInput()` before AI processing or DOM rendering
- **Rate Limiting** — Client-side rate limiter (10 requests/minute) prevents API abuse
- **API Key Isolation** — Gemini API key loaded from environment variables, never exposed in error messages
- **Error Masking** — Internal error details never leaked to client-facing UI
- **Input Validation** — Ticket format parsing with strict regex validation (`WC26-XX-NNNNNN-LNN`)
- **CSP Headers** — Content Security Policy utility for deployment hardening

---

## 🧪 Testing

**120+ tests** across **8 test suites** covering all layers:

| Test Suite | Tests | Coverage Area |
|------------|-------|---------------|
| `ai-service.test.ts` | 12 | API integration, rate limiting, error handling |
| `security.test.ts` | 26 | XSS sanitization, rate limiting, CSP |
| `simulation.test.ts` | 20 | Data generation, zone creation, metrics |
| `validation.test.ts` | 12 | Ticket parsing, format validation |
| `controllers.test.ts` | 17 | useAppState actions, useLiveData polling |
| `constants.test.ts` | 14 | Role configs, navigation, layers |
| `cn.test.ts` | 7 | Tailwind class merging |
| `performance.test.ts` | 12 | Debounce, throttle, measurePerformance |

```bash
pnpm test     # Run all tests
pnpm build    # Production build with type checking
```

---

## 👥 Team

- **Jeet** — Full Stack Developer

---

## 📄 License

This project was built for the **FIFA World Cup 2026 GenAI Hackathon** on Hack2Skill.

---

<div align="center">

**Built with ❤️ for FIFA World Cup 2026**

</div>


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
├── models/          # Data layer — types, constants, configuration
│   ├── types.ts     # TypeScript interfaces & type definitions
│   └── constants.ts # Role configs, navigation, layers, POIs
│
├── views/           # Presentation layer — pure UI components
│   ├── layouts/     # AppShell, Sidebar, Header
│   ├── pages/       # Landing, Dashboard (panel router)
│   ├── widgets/     # StadiumMap, MatchTicker, AIChat
│   └── overlays/    # CommandPalette, ProfileModal
│
├── controllers/     # Business logic — state management
│   └── useAppState.ts  # Central app state hook
│
├── services/        # External integrations
│   └── ai-service.ts   # Gemini API client with streaming
│
├── components/      # Feature panels
│   └── panels/      # Accessibility, Security, Sustainability, etc.
│
├── utils/           # Shared utilities
│   └── cn.ts        # Tailwind class merger (clsx + tailwind-merge)
│
└── styles/
    └── index.css    # Design system tokens, glass morphism, animations
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
| **Charts** | Recharts (D3-based) |
| **Icons** | Lucide React |
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

## 🏆 Hackathon Alignment

This project directly addresses the hackathon challenge across **8 key areas**:

| Challenge Area | StadiumOS Feature |
|---------------|-------------------|
| ✅ Navigation | AI wayfinding with animated routes |
| ✅ Crowd Management | Real-time density heatmap + AI anomaly detection |
| ✅ Accessibility | Wheelchair routes, elevator mapping, accessible facilities |
| ✅ Transportation | Multi-modal transit hub with live status |
| ✅ Sustainability | Energy/water/waste dashboards with carbon tracking |
| ✅ Multilingual | AI assistant supports multilingual interactions |
| ✅ Operational Intelligence | Role-based command center with analytics |
| ✅ Real-time Decision Support | Gemini-powered threat assessment & recommendations |

---

## 👥 Team

- **Jeet** — Full Stack Developer

---

## 📄 License

This project was built for the **FIFA World Cup 2026 GenAI Hackathon**.

---

<div align="center">



</div>

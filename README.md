# Filmpire

<div align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

**A cinematic movie discovery app powered by The Movie Database API.**

[Live Demo](https://filmpire-beta.vercel.app) · [Report Bug](https://github.com/brandonperfetti/filmpire/issues)

</div>

---

## Overview

**Filmpire** is a full-featured movie and TV discovery application built with React, TypeScript, and Redux Toolkit. It connects to the [TMDB API](https://www.themoviedatabase.org/documentation/api) to surface popular films, actor profiles, crew details, and curated movie collections.

The app features advanced browsing with genre/category filtering, full movie detail pages (cast, crew, trailers), actor and crew deep-dives, a user approval/watchlist system, and an AI-powered voice assistant via the Alan AI SDK.

---

## Features

- 🎬 **Movie Discovery** — Browse popular, top-rated, upcoming, and now-playing films
- 🔍 **Search** — Full-text search across the TMDB catalog
- 🎭 **Movie Detail Pages** — Overview, cast/crew, trailers, similar films, and metadata
- 👤 **Actor Profiles** — Biography, filmography, and known-for movies
- 🎥 **Crew Profiles** — Director and crew member filmographies
- ✅ **Watchlist / Approved** — Mark films as approved and browse your personal list
- 🎙️ **Voice Assistant** — Alan AI integration for voice-controlled navigation and search
- 🌙 **Dark / Light Mode** — Tailwind-powered theme system
- 📱 **Responsive Design** — Mobile-optimized layout

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://reactjs.org/) | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management |
| [React Router DOM](https://reactrouter.com/) | Client-side navigation |
| [Axios](https://axios-http.com/) | HTTP client for TMDB API |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible component library |
| [Radix UI](https://www.radix-ui.com/) | Headless component primitives |
| [Embla Carousel](https://www.embla-carousel.com/) | Carousel/slider component |
| [Alan AI SDK](https://alan.app/) | Voice assistant integration |
| [Vite](https://vitejs.dev/) | Fast build tooling |
| [TMDB API](https://developers.themoviedb.org/3) | Movie and actor data |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- A [TMDB API key](https://www.themoviedb.org/settings/api) (free)
- An [Alan AI](https://alan.app/) project key (optional, for voice features)

### Installation

```bash
git clone https://github.com/brandonperfetti/filmpire.git
cd filmpire
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_ALAN_SDK_KEY=your_alan_sdk_key  # Optional
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
filmpire/
├── src/
│   ├── app/              # Redux store configuration
│   ├── components/
│   │   ├── shared/       # Navbar, sidebar, footer
│   │   └── ui/           # shadcn/ui base components
│   ├── features/         # Redux slices (auth, movies)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Route-level page components
│   │   ├── Movies/       # Home/browse page
│   │   ├── MovieInfo/    # Movie detail page
│   │   ├── ActorInfo/    # Actor profile page
│   │   ├── CrewInfo/     # Crew member profile page
│   │   ├── Profile/      # User watchlist/approved page
│   │   └── Approved/     # Approved films list
│   ├── services/         # TMDB API service layer
│   ├── context/          # Theme and app context
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

---

## Deployment

Deploy to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com). Set `VITE_TMDB_API_KEY` in your platform's environment variable settings.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/brandonperfetti/filmpire)

---

## License

MIT © [Brandon Perfetti](https://brandonperfetti.com)

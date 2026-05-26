# Hoops Elite — Basketball Club Website

A modern, premium basketball sports club website inspired by [AxiomThemes Hoops](https://hoops.axiomthemes.com/?storefront=envato-elements). Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and ShadCN-style UI components.

![Hoops Elite](https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=400&fit=crop)

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — scroll & hover animations
- **ShadCN UI** — Button, Card, Badge, Input, Skeleton
- **Lucide Icons**

## Features

- Dark premium NBA-inspired aesthetic with orange/red gradients
- Glassmorphism cards and subtle glow effects
- Fully responsive mobile-first layout
- Sticky transparent navbar with animated mobile menu
- Dynamic routes for players (`/players/[slug]`) and news (`/news/[slug]`)
- Mock JSON data with dummy API routes
- SEO-optimized metadata per page
- Loading skeletons and lazy image loading
- Smooth scroll animations via Framer Motion

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/teams` | Club teams |
| `/players` | Player roster |
| `/players/[slug]` | Player detail |
| `/schedule` | Match schedule |
| `/standings` | League standings |
| `/shop` | Merchandise shop |
| `/news` | News blog |
| `/news/[slug]` | Article detail |
| `/about` | About the club |
| `/contact` | Contact form |

## Project Structure

```
src/
├── app/                    # App Router pages & API routes
│   ├── api/               # Dummy REST endpoints
│   ├── players/[slug]/
│   ├── news/[slug]/
│   └── ...
├── components/
│   ├── cards/             # HeroBanner, MatchCard, PlayerCard, etc.
│   ├── layout/            # Navbar, Footer, PageLayout
│   ├── sections/          # Homepage sections, CTA, Stats
│   ├── shared/            # SectionTitle, LazyImage
│   └── ui/                # ShadCN components
├── data/                  # Mock JSON files
├── lib/                   # Utils, animations, data helpers
└── types/                 # TypeScript interfaces
```

## Installation

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd edmar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables (optional)

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## API Routes (Mock Data)

| Endpoint | Query Params | Description |
|----------|--------------|-------------|
| `GET /api/players` | `featured`, `teamId` | Player roster |
| `GET /api/matches` | `status` | Match schedule |
| `GET /api/news` | `category`, `limit` | News articles |
| `GET /api/products` | `category` | Shop products |
| `GET /api/standings` | — | League table |

Example:

```bash
curl http://localhost:3000/api/players?featured=true
```

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment (Vercel)

### Option 1: Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project** → import your repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Set `NEXT_PUBLIC_SITE_URL` to your production URL in Project Settings → Environment Variables

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Production deployment
vercel --prod
```

### Build Settings (auto-detected)

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

## Customization

- **Colors**: Edit CSS variables in `src/app/globals.css` and `tailwind.config.ts`
- **Mock data**: Update JSON files in `src/data/`
- **Animations**: Modify presets in `src/lib/animations.ts`
- **Fonts**: Change Google fonts in `src/app/layout.tsx`

## License

MIT

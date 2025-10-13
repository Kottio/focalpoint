# FocalPoint

> A community-driven platform for photographers and explorers to discover, share, and explore remarkable photography locations around the world.

## Overview

FocalPoint is a full-stack web application that combines geolocation, interactive mapping, and social features to help photographers discover the perfect spots for their next shoot. Users can explore curated locations on an interactive map, filter by categories and tags, view detailed spot information with community-submitted photos, and contribute their own discoveries.

## Key Features

- **Interactive Map Interface**: Explore photography spots on a dynamic Mapbox-powered map with real-time filtering
- **Smart Filtering System**: Filter locations by categories (landscape, urban, architecture, etc.) and custom tags
- **Spot Management**: Detailed view of each location including description, photos, and community engagement
- **Image Upload**: Integrated Cloudinary support for high-quality photo uploads
- **Community Voting**: Upvote/downvote system to highlight the best spots
- **Responsive Design**: Optimized experiences for both desktop and mobile devices with custom drawer navigation
- **Real-time Bounds Search**: Dynamic spot loading based on current map viewport

## Tech Stack

### Frontend
- **Next.js 15** (App Router) - React framework with server-side rendering
- **React 19** - UI component library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Mapbox GL** - Interactive mapping
- **Vaul** - Mobile drawer component

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database

### Infrastructure & Services
- **Cloudinary** - Image hosting and optimization
- **Vercel** (deployment ready) - Hosting platform

## Database Schema

The application uses a relational database structure with the following core models:

- **Users**: User profiles and authentication
- **Spots**: Geolocated photography locations (latitude/longitude with Decimal precision)
- **Categories**: Spot classification system
- **Tags**: Flexible tagging for enhanced filtering
- **Photos**: Image storage with Cloudinary integration
- **Votes**: Community voting system (upvote/downvote)
- **SpotTags**: Many-to-many relationship between spots and tags

## Project Structure

```
focal-point/
├── app/
│   ├── page.tsx              # Landing page with auth
│   ├── map/                  # Interactive map view
│   ├── spots/                # Spot detail pages
│   ├── api/
│   │   ├── spots/           # Spot CRUD operations
│   │   └── upload/          # Image upload handling
│   └── globals.css
├── components/
│   ├── map.tsx              # Mapbox map component
│   ├── spotList.tsx         # Spot list sidebar
│   ├── spotDetails.tsx      # Spot detail panel
│   ├── filter.tsx           # Filtering interface
│   ├── mainDrawer.tsx       # Mobile drawer navigation
│   └── drawers/             # Additional drawer components
├── hooks/
│   ├── useSpots.ts          # Spots data fetching
│   ├── useSpotDetails.ts    # Individual spot details
│   └── useIsMobile.ts       # Responsive utilities
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding
├── types/                    # TypeScript type definitions
└── utils/                    # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Mapbox account (free tier available)
- Cloudinary account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd focal-point
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/focalpointdb"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Commands

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with initial data
```

## Key Technical Highlights

### Performance Optimizations
- **Turbopack**: Fast refresh and optimized builds
- **Dynamic Imports**: Code splitting for optimal bundle size
- **Image Optimization**: Next.js Image component with Cloudinary CDN
- **Viewport-based Loading**: Only fetch spots within current map bounds

### Type Safety
- Full TypeScript implementation across frontend and backend
- Prisma-generated types for database operations
- Custom type definitions for complex data structures

### Responsive Design
- Mobile-first approach with custom drawer navigation
- Desktop layout with sidebar and detail panels
- Adaptive filtering interface for different screen sizes

## Roadmap

- [ ] User authentication and authorization
- [ ] User profiles and spot submissions
- [ ] Advanced search and filtering
- [ ] Photo galleries and lightbox
- [ ] Social features (comments, favorites)
- [ ] Export and sharing capabilities
- [ ] Progressive Web App (PWA) support

## Contributing

This project is currently in development. Contributions, issues, and feature requests are welcome.

## License

This project is private and proprietary.

---

**Built with passion by photographers, for photographers.**

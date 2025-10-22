# MapShot - Photography Spot Discovery Platform

## Full Project Analysis & Description

---

## 🎯 Project Overview

**MapShot** is a modern, full-stack web application that enables photographers to discover, share, and explore photography spots around the world. Built with cutting-edge technologies and modern design principles, it demonstrates advanced capabilities in full-stack development, authentication, real-time data handling, and responsive UI/UX design.

**Live URL:** [Your deployed URL]
**GitHub:** https://github.com/Kottio/focalpoint
**Developer:** Thomas Cottiaux - Data Consultant & Full-Stack Developer

---

## 📊 Technical Stack

### **Frontend**

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (100% type-safe)
- **Styling:** Tailwind CSS with custom design system
- **UI Components:**
  - Vaul (Advanced drawer/modal system)
  - Lucide React (Icon library)
  - Framer Motion (Animations)
- **Maps:** Mapbox GL JS (Interactive maps)
- **State Management:** React Hooks (useState, useEffect, custom hooks)
- **Image Optimization:** Next.js Image component

### **Backend**

- **Runtime:** Node.js
- **API:** Next.js API Routes (serverless functions)
- **Authentication:** Better Auth v1.3.27
  - Email OTP (passwordless authentication)
  - Database sessions (not JWT)
  - Custom field mapping
  - Safari-compatible session handling
- **Email Service:** Resend API (transactional emails)

### **Database**

- **Database:** PostgreSQL (Vercel Postgres)
- **ORM:** Prisma (type-safe database client)
- **Schema:**
  - Users, Sessions, Spots, Photos, Tags, Categories
  - Custom fields for user profiles
  - Relations with cascade operations
  - String-based IDs (CUID)

### **Deployment & DevOps**

- **Hosting:** Vercel (production deployment)
- **Domain:** Custom domain (kottio.dev)
- **Environment:** Production-ready with environment variables
- **CI/CD:** Automated deployments via Vercel

---

## 🏗️ Architecture & Design Patterns

### **Application Architecture**

```
├── App Router Structure (Next.js 15)
│   ├── /app/page.tsx (Landing page)
│   ├── /app/map/page.tsx (Main application)
│   ├── /app/auth/signin/page.tsx (Authentication)
│   └── /app/api/* (API routes)
├── Component Architecture
│   ├── /components/* (Reusable UI components)
│   ├── /components/drawers/* (Modal system)
│   └── /hooks/* (Custom React hooks)
├── Database Layer
│   ├── Prisma schema
│   ├── Better Auth adapter
│   └── Type-safe queries
└── Authentication Layer
    ├── Better Auth configuration
    ├── Email OTP flow
    └── Session management
```

### **Key Design Patterns**

1. **Component Composition:** Modular, reusable components
2. **Custom Hooks:** Encapsulated business logic (`useSpots`, `useCatandTags`, `useIsMobile`)
3. **Server Components + Client Components:** Optimal rendering strategy
4. **API Route Handlers:** RESTful API design
5. **Type Safety:** End-to-end TypeScript for reliability
6. **Responsive Design:** Mobile-first approach with adaptive layouts

---

## 🎨 User Experience & Interface

### **Landing Page**

- Split-screen image carousel with 11 curated photography images
- Smooth animations with Framer Motion
- Professional branding with logo and tagline
- Social media integration (LinkedIn, GitHub, Portfolio)
- Clean, modern aesthetic with gradient overlays

### **Authentication Flow**

- **Passwordless Authentication:** Email OTP (6-digit code)
- **Security:** 60-second expiration, 3 attempts max, rate limiting
- **UX:** Two-step process (email → OTP verification)
- **Safari Compatibility:** Special handling for Safari's strict cookie policies
- **Loading States:** Branded loading screen with pulse animation

### **Main Application (Map View)**

- **Interactive Map:** Mapbox GL JS with custom markers
- **Bottom Navigation:** Tab-based navigation (Discover, Profile, Create)
- **Drawer System:** Multi-level drawers for content hierarchy
  - Main Drawer: Spot list with 3 snap points (peek, medium, full)
  - Detail Drawer: Google Maps-style spot details
  - Creation Drawer: Spot creation form
- **Responsive Design:** Separate mobile/desktop layouts

### **Spot Discovery**

- **List View:** Card-based layout with photos, categories, tags, likes
- **Photo-First Design:** Large hero images in spot details
- **Horizontal Photo Carousel:** Swipeable photo galleries
- **Filter System:** Category and tag filtering
- **Search:** Real-time spot discovery

### **Spot Details (Google Maps Style)**

- **Hero Photo Carousel:** Horizontal swipe gallery
- **Information Hierarchy:** Title, category, stats, tags, description
- **Photo Grid:** 3-column thumbnail grid
- **User Attribution:** Photographer credits
- **Engagement:** Like counts, photo counts

### **Profile Management**

- **User Profile:** Avatar, username, bio, email
- **Edit Profile:** Drawer-based profile editing
- **Sign Out:** Secure session termination
- **Menu Items:** Saved locations, Your spots, Settings

### **Spot Creation**

- **Location Picker:** Map-based location selection
- **Form Fields:** Title, description, category, tags (collapsible), photos
- **Photo Upload:** Multi-photo upload (max 5)
- **Category Selection:** Visual category picker with color coding
- **Tag System:** Multi-select tag system
- **Validation:** Client-side and server-side validation
- **Fixed Button:** Create button stays at bottom (keyboard-friendly)

---

## 🔐 Authentication & Security

### **Better Auth Implementation**

- **Email OTP Plugin:** Passwordless authentication
- **Database Sessions:** Secure, server-side session storage
- **Custom User Fields:** username, bio, avatarUrl, fullName
- **Field Mapping:** Better Auth `name` maps to database `fullName`
- **Type Inference:** Automatic TypeScript type inference with `inferAdditionalFields`
- **Rate Limiting:** 3 attempts per 5-minute window
- **Session Expiry:** 30-day sessions with sliding window refresh

### **Security Features**

- Email verification required
- OTP expiration (60 seconds)
- Attempt limits (3 max)
- Protected routes with middleware
- Session validation on every request
- CSRF protection via Better Auth
- Secure cookie handling (httpOnly, sameSite)

### **Safari Compatibility**

- Custom cookie configuration for Safari
- `crossSubDomainCookies` enabled
- Full page reload after authentication
- 500ms delay for cookie setting
- `window.location.href` for guaranteed redirect

---

## 📱 Mobile Optimization

### **Responsive Design**

- **Mobile-First Approach:** Optimized for touch interfaces
- **Custom Hook:** `useIsMobile()` for conditional rendering
- **Drawer System:** Native-like mobile drawer experience
- **Touch Gestures:** Swipe navigation, snap points
- **Bottom Navigation:** Thumb-friendly navigation bar
- **Keyboard Handling:** Fixed buttons don't move with keyboard

### **Performance Optimizations**

- **Image Optimization:** Next.js Image component with priority loading
- **Lazy Loading:** On-demand component loading
- **Code Splitting:** Automatic route-based splitting
- **Scroll Performance:** `overscrollBehavior: 'contain'` for smooth scrolling
- **Touch Performance:** `WebkitOverflowScrolling: 'touch'`

---

## 🗃️ Database Schema

### **Core Models**

```prisma
// User Model
- id: String (CUID)
- email: String (unique)
- emailVerified: Boolean
- username: String (unique, optional)
- fullName: String (optional)
- bio: String (optional)
- avatarUrl: String (optional)
- Relations: spots, photos, votes, sessions

// Spot Model
- id: String (CUID)
- title: String
- description: String
- latitude: Float
- longitude: Float
- category: String
- upvotes: Int
- userId: String
- Relations: photos, tags, votes

// Photo Model
- id: String (CUID)
- title: String
- url: String (different sizes: small, medium, original)
- likes: Int
- spotId: String
- userId: String

// Tag Model
- id: Int (auto-increment)
- name: String (unique)
- color: String (hex color)
- Relations: spots (many-to-many)

// Vote Model
- Track user upvotes on spots
```

### **Better Auth Tables**

- Session (token-based sessions)
- Account (OAuth accounts - future)
- Verification (OTP codes with expiration)

---

## 🎯 Key Features & Functionality

### **1. Spot Discovery**

- Browse photography spots on interactive map
- Filter by category (Landscape, Architecture, Urban, Nature, etc.)
- Filter by tags (Golden Hour, Blue Hour, Sunrise, etc.)
- Real-time map bounds filtering
- Photo previews in list view

### **2. Spot Details**

- Google Maps-style detail view
- Photo gallery with horizontal scroll
- Category and tag information
- User attribution
- Like counts and engagement metrics
- Description and "About" section

### **3. Spot Creation**

- Click map to select location
- Multi-step form with validation
- Category selection with visual icons
- Collapsible tag selection
- Multiple photo upload (max 5)
- Real-time validation feedback

### **4. User Profiles**

- Profile customization (username, bio)
- Anonymous mode (email only)
- Profile completion tracking
- Session management
- Sign out functionality

### **5. Authentication**

- Email OTP login (passwordless)
- 6-digit OTP codes
- 60-second expiration
- Automatic session refresh
- Protected routes

---

## 🚀 Technical Achievements

### **1. Advanced Drawer System**

- **Multi-level nested drawers** using Vaul
- **Snap points:** Peek, medium, full views
- **Dismissible control:** Prevent accidental closes
- **Scroll management:** `data-vaul-no-drag` for inner scrolling
- **Safari compatibility:** Fixed positioning above bottom menu
- **Smooth animations:** Native-like drawer experience

### **2. Session Management**

- **Database sessions** (not JWT) for better security
- **Custom field inference** with TypeScript
- **Safari cookie handling** with special configuration
- **Session persistence** across page reloads
- **Automatic refresh** with sliding window

### **3. Map Integration**

- **Mapbox GL JS** integration
- **Custom markers** with category colors
- **Map bounds filtering** for performance
- **Click-to-create** spot functionality
- **Real-time marker updates**

### **4. Type Safety**

- **100% TypeScript** coverage
- **Prisma generated types** for database
- **Better Auth type inference** for session
- **Custom type definitions** for API responses
- **Type-safe API routes**

### **5. Performance**

- **Image optimization** with Next.js Image
- **Code splitting** with dynamic imports
- **Database indexing** on foreign keys
- **Efficient queries** with Prisma
- **Client-side caching** where appropriate

---

## 📈 Development Metrics

### **Project Stats**

- **Total Lines of Code:** ~4,200 lines (excluding generated code)
- **Components:** 15+ reusable components
- **API Routes:** 5+ endpoints
- **Database Models:** 7 core models
- **Custom Hooks:** 5+ custom React hooks
- **Pages:** 3 main pages (landing, auth, map)

### **Top Files by Complexity**

1. `/app/map/page.tsx` - 251 lines (main application)
2. `/components/filter.tsx` - 401 lines (filter system)
3. `/app/api/spots/route.ts` - 259 lines (spots API)
4. `/components/spotList.tsx` - 252 lines (spot list)
5. `/prisma/seed.ts` - 239 lines (database seeding)

---

## 🎓 Learning & Problem Solving

### **Challenges Overcome**

#### **1. Database Schema Migration**

- **Challenge:** Better Auth expected String IDs, existing schema used Int
- **Solution:** Converted entire schema to String IDs (CUID)
- **Learning:** Schema design decisions have cascading effects

#### **2. Better Auth Field Mapping**

- **Challenge:** Better Auth `name` field vs custom `fullName` field
- **Solution:** Field mapping with `fields: { name: "fullName" }`
- **Learning:** Framework integration requires understanding conventions

#### **3. TypeScript Type Inference**

- **Challenge:** Custom user fields not appearing in session types
- **Solution:** `inferAdditionalFields<typeof auth>()` plugin
- **Learning:** Type inference in distributed systems requires explicit configuration

#### **4. Safari Session Issues**

- **Challenge:** Session not persisting in Safari after OTP verification
- **Solution:** `window.location.href` + 500ms delay + cookie config
- **Learning:** Browser-specific behaviors require targeted solutions

#### **5. Mobile Scroll Conflicts**

- **Challenge:** Drawer capturing scroll events from lists
- **Solution:** `data-vaul-no-drag` + `overscrollBehavior: 'contain'`
- **Learning:** Mobile touch interactions require careful event handling

#### **6. Keyboard Blocking Content**

- **Challenge:** Mobile keyboard covering input fields and buttons
- **Solution:** Fixed button positioning + scrollable content area
- **Learning:** Mobile UX requires accounting for on-screen keyboard

---

## 💡 Technical Decisions & Rationale

### **Why Next.js?**

- Server-side rendering for SEO
- API routes for backend logic
- Image optimization out of the box
- Excellent TypeScript support
- Vercel deployment integration

### **Why Better Auth over NextAuth?**

- Modern, lightweight alternative
- Better TypeScript support
- Cleaner API design
- Easier customization
- Database sessions by default

### **Why Prisma?**

- Type-safe database queries
- Excellent TypeScript integration
- Migration system
- Visual database management
- Generated types

### **Why Vaul for Drawers?**

- Native-like mobile experience
- Snap points support
- Nested drawers
- Smooth animations
- React 18+ compatible

### **Why Mapbox?**

- Superior map styling
- Better performance than Google Maps
- Custom marker support
- Generous free tier
- Modern API

---

## 🔮 Future Enhancements

### **Planned Features**

1. **Google OAuth** - Alternative login method
2. **Saved Locations** - Bookmark favorite spots
3. **User Spots** - View your created spots
4. **Comments System** - Spot discussions
5. **Photo Voting** - Like individual photos
6. **Advanced Search** - Text search, radius search
7. **User Profiles** - Public profile pages
8. **Spot Collections** - Curated spot lists
9. **Weather Integration** - Best shooting times
10. **Social Sharing** - Share spots on social media

### **Technical Improvements**

1. **Redis Caching** - Cache spot queries
2. **Image CDN** - Cloudinary integration
3. **Progressive Web App** - Offline support
4. **Push Notifications** - New spots in area
5. **Analytics** - User behavior tracking
6. **A/B Testing** - Feature optimization
7. **Error Tracking** - Sentry integration
8. **Performance Monitoring** - Real user metrics

---

## 📝 Content Ideas for Posts/Videos

### **Technical Deep Dives**

1. "Building a Modern Authentication System with Better Auth"
2. "Migrating from Int to String IDs in Production"
3. "Solving Safari Cookie Issues in Web Apps"
4. "Building Instagram-Style Drawers with Vaul"
5. "Type-Safe Full-Stack Development with Next.js & Prisma"

### **Architecture & Design**

1. "Full-Stack Architecture for Photography Apps"
2. "Designing Mobile-First Web Applications"
3. "Google Maps-Style UI Components in React"
4. "Building a Location-Based Discovery Platform"

### **Code Walkthroughs**

1. "Step-by-Step: Passwordless Authentication Flow"
2. "Custom React Hooks for Better Code Organization"
3. "Multi-Level Drawer System Implementation"
4. "Image Upload & Optimization Pipeline"

### **Problem Solving**

1. "5 Challenges I Faced Building MapShot (And How I Solved Them)"
2. "Browser Compatibility: Fixing Safari-Specific Issues"
3. "Mobile UX Challenges: Keyboard, Scrolling, Touch Gestures"

### **Project Showcase**

1. "MapShot: From Idea to Deployment in [X] Weeks"
2. "Tech Stack Breakdown: Why I Chose Each Technology"
3. "Code Metrics: 4,200 Lines of TypeScript"

---

## 🎬 Video Content Suggestions

### **YouTube/LinkedIn Videos**

1. **"Building MapShot: Full Project Walkthrough"** (10-15 min)
2. **"Authentication Best Practices: Better Auth Tutorial"** (8-10 min)
3. **"Mobile-First Design: Building Drawer Systems"** (6-8 min)
4. **"TypeScript Tips: End-to-End Type Safety"** (5-7 min)

### **Short-Form Content (TikTok/Instagram/LinkedIn)**

1. "This is how I built passwordless auth in 60 seconds"
2. "The Safari cookie bug that took me hours to fix"
3. "Building Google Maps UI in React"
4. "4,200 lines of TypeScript = MapShot"

---

## 📞 Professional Positioning

### **Elevator Pitch**

"I'm Thomas Cottiaux, a data consultant and full-stack developer specializing in modern web applications. I recently built MapShot, a photography spot discovery platform using Next.js 15, TypeScript, and PostgreSQL. The project demonstrates advanced authentication, mobile-first design, and complex state management. From database schema design to Safari-specific cookie handling, I solved real-world challenges while delivering a production-ready application."

### **Key Differentiators**

1. **Full-Stack Expertise:** Frontend, backend, database, deployment
2. **Problem Solver:** Overcame Safari issues, type inference, mobile UX
3. **Modern Stack:** Latest technologies (Next.js 15, Better Auth, Prisma)
4. **Production Ready:** Deployed, domain-configured, production-grade
5. **Detail Oriented:** Handled edge cases, browser compatibility, mobile optimization

### **Target Clients**

- Startups needing MVP development
- Companies requiring authentication systems
- Businesses building location-based apps
- Teams needing mobile-first web applications
- Projects requiring TypeScript expertise

---

## 🔗 Resources & Links

- **Live Demo:** mapshot-pi.vercel.app
- **GitHub:** https://github.com/Kottio/focalpoint
- **Portfolio:** https://www.kottio.dev
- **LinkedIn:** https://www.linkedin.com/in/thomas-cottiaux-data-consultant
- **Tech Blog:** [Your blog if applicable]

---

## 📄 License & Credits

**Developer:** Thomas Cottiaux
**Year:** 2025
**Technologies:** Next.js, TypeScript, Better Auth, Prisma, PostgreSQL, Mapbox, Vercel
**Status:** Production Ready

---

_This document serves as a comprehensive reference for creating content, explaining the project to clients, and showcasing technical capabilities._

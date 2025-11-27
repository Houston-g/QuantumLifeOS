# LifeOS - Quantum Archive

## Overview

LifeOS is a private, on-device life operating system designed to archive and manage life events with a focus on security and user experience. The application presents itself as a "post-quantum encrypted" personal archive system that allows users to record, search, and view various life events (thoughts, locations, biometrics, finances, documents, media) through a modern, cyberpunk-themed interface.

The application is built as a full-stack TypeScript application with a React frontend and Express backend, featuring a PostgreSQL database for persistent storage. The design emphasizes a futuristic aesthetic with custom fonts (Space Grotesk for display, JetBrains Mono for code/data, Inter for UI) and a dark-themed interface with cyan/teal accent colors suggesting quantum/technological themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (instead of React Router)
- TailwindCSS v4 with custom theming for styling

**UI Component Library:**
- Shadcn/ui components (Radix UI primitives) configured with "new-york" style
- Extensive component library including dialogs, forms, cards, navigation, and data visualization
- Custom components built with class-variance-authority for variant management
- Framer Motion for animations and transitions

**State Management:**
- TanStack Query (React Query) for server state management and data fetching
- Custom hooks pattern for encapsulating data access logic
- No global state library (Redux/Zustand) - relies on React Query cache and local component state

**Key Design Decisions:**
- Component-first architecture with clear separation between UI components, pages, and business logic
- Custom path aliases (@/, @shared/, @assets/) for clean imports
- Type-safe API layer with shared schema definitions between client and server

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- ESBuild for production bundling with selective dependency bundling (allowlist approach)
- Custom middleware for request logging with timestamps and duration tracking

**API Design:**
- RESTful API endpoints under `/api` prefix
- Endpoints for event CRUD operations, search, and metrics
- JSON-based request/response format
- Error handling with appropriate HTTP status codes

**Development vs Production:**
- Vite dev server integration in development mode with HMR support
- Static file serving in production from pre-built dist directory
- Conditional plugin loading based on NODE_ENV and REPL_ID

**Key Design Decisions:**
- Single server file pattern with route registration
- Separation of concerns: routes, storage layer, static serving, and Vite integration in separate modules
- Custom build script that handles both client and server compilation

### Data Storage

**Database:**
- PostgreSQL via Neon serverless driver
- Drizzle ORM for type-safe database operations
- WebSocket support for database connections

**Schema Design:**
- Users table with UUID primary keys, username/password authentication
- Events table with serial IDs, polymorphic event types, JSONB metadata column
- System metrics table for tracking storage and daily event counts
- Timestamps using PostgreSQL's defaultNow()

**Storage Layer Pattern:**
- Interface-based storage abstraction (IStorage)
- DbStorage implementation using Drizzle ORM
- Centralized database configuration in db/index.ts
- Schema definitions shared between client and server via @shared module

**Key Design Decisions:**
- JSONB metadata field allows flexible event data without schema migrations
- Type-safe operations through Drizzle-Zod schema integration
- Storage interface enables potential future implementations (in-memory, different databases)

### External Dependencies

**Database Services:**
- Neon Serverless PostgreSQL (@neondatabase/serverless) - cloud PostgreSQL with WebSocket support
- Drizzle ORM for database operations and migrations
- Drizzle-Kit for schema management

**UI/Component Libraries:**
- Radix UI - complete suite of unstyled, accessible UI primitives
- Lucide React - icon library
- Framer Motion - animation library
- Embla Carousel - carousel/slider functionality
- CMDK - command palette component

**Form Handling:**
- React Hook Form - form state management
- @hookform/resolvers - validation resolver
- Zod - schema validation and TypeScript type generation

**Development Tools:**
- Replit-specific plugins for Vite (cartographer, dev-banner, runtime-error-modal)
- Custom meta-images plugin for OpenGraph tag management on Replit deployments

**Utility Libraries:**
- date-fns - date formatting and manipulation
- clsx & tailwind-merge - CSS class name utilities
- class-variance-authority - component variant management
- nanoid - unique ID generation

**Build & Development:**
- TypeScript with strict mode enabled
- PostCSS with Autoprefixer for CSS processing
- ESBuild for server bundling
- Vite for client bundling and dev server

**Session Management:**
- express-session (referenced in build allowlist) for session handling
- connect-pg-simple for PostgreSQL session store

**Notable Excluded Dependencies:**
- No authentication library currently implemented (passport referenced in allowlist but not in use)
- No email service active (nodemailer in allowlist)
- No payment processing (stripe in allowlist)
- No AI integration active (openai, @google/generative-ai in allowlist)
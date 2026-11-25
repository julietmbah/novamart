# NovaMart

### Shop Smarter. Live Better.

NovaMart is a modern, mobile-first, full-stack e-commerce
application designed to provide a simple, secure and enjoyable
online shopping experience.

The project combines a premium user interface with a maintainable
full-stack architecture, with the goal of evolving into a
real-world e-commerce business.

## Project Status

Currently under active development.

## Features

### Implemented

- Responsive e-commerce landing page
- Professional navigation bar
- Animated hero image carousel
- Light and dark mode switching
- Persistent theme preferences
- Product search and category filtering
- Product price sorting
- Product preview dialogs
- Responsive product and category cards
- Mobile-friendly navigation
- Custom branding and favicon
- Accessible user interface

### Upcoming Features

- Customer registration and authentication
- Product listing and individual product pages
- Shopping cart and quantity management
- Guest checkout
- Secure Paystack payment integration
- Payment verification and webhooks
- Customer order management
- Protected administrator dashboard
- Product and inventory management
- Supabase database integration

## Technology Stack

| Technology | Purpose | Status |
|---|---|---|
| Next.js | Full-stack framework | Integrated |
| React | User interface | Integrated |
| TypeScript | Type-safe development | Integrated |
| Tailwind CSS | Responsive styling | Integrated |
| Lucide React | Icons | Integrated |
| Manrope | Heading typography | Integrated |
| Inter | Body typography | Integrated |
| Supabase | Database and authentication | Planned |
| Zod | Input validation | Planned |
| Paystack | Payment processing | Planned |
| Vercel | Production deployment | Planned |
| Git and GitHub | Version control | Integrated |

## Architecture

NovaMart uses the Next.js App Router and a modular
monolithic architecture.

Frontend and backend functionality will exist within
a single Next.js application, with clearly separated
responsibilities and reusable components.

The architecture is designed to support future expansion
without requiring an unnecessary complete rewrite.

## Brand Identity

NovaMart features a premium Ocean Teal design system
with consistent light and dark themes.

| Colour | Hex Code |
|---|---|
| Ocean Teal | #0F766E |
| Warm Ivory | #F9FAF7 |
| Charcoal | #20312F |
| Soft Seafoam | #E4F3EF |
| Soft Coral | #F28B70 |
| Dark Background | #101F1D |
| Dark Primary | #2DD4BF |

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/julietmbah/novamart.git
```

Navigate into the project:

```bash
cd novamart
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application at:

http://localhost:3001

## Code Quality

Run ESLint:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npx tsc --noEmit
```

Create a production build:

```bash
npm run build
```

## Git Branch Strategy

| Branch | Purpose |
|---|---|
| main | Stable production code |
| staging | Pre-production testing |
| dev | Development integration |
| feature/* | Individual feature development |

All new features are developed on dedicated feature
branches before being tested and merged into dev.

## Security

NovaMart is being developed with security in mind.

Planned security implementations include:

- Secure server-side authentication and authorization
- Database Row Level Security
- Server-side input validation
- Protected environment variables
- Secure payment initialization and verification
- Authenticated payment webhooks
- Protection of customer information
- User-friendly error handling

Sensitive credentials must never be committed to GitHub.

## Development Roadmap

- [x] Project initialization
- [x] Git and GitHub configuration
- [x] Project foundation
- [x] Brand identity and typography
- [x] Responsive landing page
- [x] Light and dark mode
- [x] Animated hero carousel
- [ ] Registration and sign-in pages
- [ ] Shopping functionality
- [ ] Supabase integration
- [ ] Administrator dashboard
- [ ] Paystack integration
- [ ] Final security and functionality testing
- [ ] Production deployment

## Demonstration Products

The current product images, descriptions and prices
are illustrative and are used for development purposes.

## Repository

https://github.com/julietmbah/novamart

---

NovaMart — Shop Smarter. Live Better.
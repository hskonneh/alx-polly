# ALX Polly - Polling Application

A modern Next.js polling application built with TypeScript, Tailwind CSS, and comprehensive testing setup.

## 🚀 Features

- **Next.js 15.5.2** with App Router
- **React 19.1.0** with TypeScript
- **Tailwind CSS v4** for styling
- **Jest & Testing Library** for comprehensive testing
- **User Authentication** (login/register pages)
- **Poll Creation & Management** with dynamic forms
- **Voting System** with real-time results
- **QR Code Sharing** for easy poll distribution
- **Responsive Design** with mobile-first approach
- **Modern Development Tools** with hot reloading

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## �️ Supabase (optional but recommended)

This project is designed to work with Supabase for authentication and data storage.
To use Supabase locally:

1. Create a free project at https://app.supabase.com/
2. From the project settings, copy the `anon` public key and the project URL.
3. Add them to your `.env.local` using the variables below.

Required environment variables for Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIU...
```

If you don't provide Supabase keys the app will still run, but pages
that depend on Supabase (auth, polls) will return empty data or redirect.

## �🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alx-polly
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

Windows PowerShell note:

If you're using PowerShell on Windows and `cp` is not available, run:

```powershell
Copy-Item env.example -Destination .env.local
# then open .env.local in your editor and paste your Supabase values
```

## 🏃‍♂️ Development

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Build for Production
```bash
npm run build
npm start
```

## 🧪 Testing

The application includes comprehensive tests:

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API endpoint testing
- **Test Coverage**: Jest coverage reporting

### Test Structure
```
__tests__/
├── page.test.tsx      # Main page component tests
└── api.test.ts        # API endpoint tests
```

## 🔧 API Endpoints

### Health Check
- **GET** `/api/health`
- Returns application status and metadata

### Polls
- **GET** `/api/polls` - List all polls
- **POST** `/api/polls` - Create a new poll
- **GET** `/api/polls/[id]` - Get specific poll
- **PUT** `/api/polls/[id]` - Update poll
- **DELETE** `/api/polls/[id]` - Delete poll
- **POST** `/api/polls/[id]/vote` - Vote on a poll

## 📁 Project Structure

```
alx-polly/
├── app/                    # Next.js App Router (server + client pages)
│   ├── api/               # API route handlers (route.ts files)
│   │   ├── health/        # Health check endpoint (simple uptime/status)
│   │   └── polls/         # Poll-related API handlers (list/create/update/vote)
│   ├── auth/              # Authentication pages (register/login/forgot)
│   │   ├── login/         # Login UI and form (client + server action)
│   │   └── register/      # Registration UI and form
│   ├── polls/             # Poll UI pages and nested routes
│   │   ├── [id]/          # Per-poll pages (dynamic route segment)
│   │   │   ├── results/   # Results view for a specific poll
│   │   │   └── share/     # Share view that shows QR code / embed options
│   │   ├── new/           # Page to create a new poll
│   │   └── page.tsx       # Polls listing page
│   ├── components/        # Reusable React components
│   │   ├── ui/            # UI primitives (Button, Input) using shadcn/ui
│   │   ├── Navigation.tsx # Top navigation bar component
│   │   ├── PollForm.tsx   # Form component used to create polls
│   │   ├── VoteResult.tsx # Small component to show result rows
│   │   └── QRCodeCard.tsx # Renders QR codes for poll links
│   ├── globals.css        # Global styles / Tailwind base imports
│   ├── layout.tsx         # Root layout (head, providers, global UI)
│   └── page.tsx           # Home page (landing / CTA)
├── lib/                   # Server & client helpers, supabase wiring
│   ├── supabase-server.ts  # Server-side Supabase client factory (cookies aware)
│   ├── supabase.ts        # Browser/client Supabase client factory
│   ├── auth.ts            # Auth helpers (getCurrentUser, requireAuth, getSession)
│   ├── utils.ts           # Small utilities (cn class merging helper)
│   └── types.ts           # TypeScript interfaces (Poll, PollOption, Vote, etc.)
├── __tests__/             # Unit & integration tests (Jest + RTL)
├── public/                # Static assets (icons, images)
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest setup helpers (mocking, matchers)
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies, scripts, and test commands
├── tsconfig.json          # TypeScript project config
└── env.example            # Example environment variables to copy into .env.local
```

## 📌 Annotated file/folder reference

Below are short descriptions for the most important files and helpers so
contributors can quickly understand responsibilities and integration points.

- `app/api/health/route.ts` — Minimal route used by health checks and CI.
- `app/api/polls/route.ts` — Handler exposing poll listing and creation (server-side).
- `app/api/polls/[id]/route.ts` — Handler for operations on a specific poll (read/update/delete).
- `app/api/polls/[id]/vote/route.ts` — Handler to record a vote for an option.

- `app/polls/page.tsx` — Server Component that lists polls and links to details.
- `app/polls/[id]/page.tsx` — Poll detail page showing question, options, and voting UI.
- `app/polls/[id]/results/page.tsx` — Server Component rendering results and charts.
- `app/polls/[id]/share/page.tsx` — Renders QR code and share links for a poll.

- `lib/supabase-server.ts` — Create a Supabase client for server-side Next.js code. This
   function wires Next's cookie store into Supabase so auth and sessions work in Server Components.
- `lib/supabase.ts` — Browser-side Supabase client for client components and code that runs in the browser.
- `lib/auth.ts` — Helper functions used across pages to get the current user, require auth (redirect),
   and fetch the current session. Designed to be used from Server Components and Route Handlers.
- `lib/utils.ts` — Centralized small utilities. `cn(...inputs)` composes and merges Tailwind classes.
- `lib/types.ts` — Shared TypeScript types/interfaces for Poll, PollOption, Vote, etc.

- `app/components/PollResultChart.tsx` — Client component that wraps Chart.js. It accepts `question`,
   `options`, and `totalVotes` and renders a bar chart. Important: it destroys and recreates the chart
   instance on prop changes to avoid memory leaks.
- `app/components/QRCodeCard.tsx` — Renders a QR code for a poll link (uses project qr-code helper).

## ⚙️ Core Functions (what they do)

- `createServerSupabaseClient()` (`lib/supabase-server.ts`)
   - Purpose: returns a Supabase client configured for server-side use in Next.js.
   - Key behavior: reads and attempts to write cookies via Next's cookie store; write operations
      are best-effort and wrapped in try/catch to avoid failing server renders.

- `createClient()` (`lib/supabase.ts`)
   - Purpose: returns a browser Supabase client for client-side hooks and real-time subscriptions.

- `getCurrentUser()` (`lib/auth.ts`)
   - Purpose: fetches the currently authenticated Supabase user; returns `null` on error or when not authenticated.

- `requireAuth()` (`lib/auth.ts`)
   - Purpose: guard helper for server-side pages that redirects unauthenticated visitors to `/auth/login`.

- `getSession()` (`lib/auth.ts`)
   - Purpose: returns the current Supabase session (or `null` when not available).

## 🔍 Notes for contributors

- Follow the project's conventions: server data fetching happens in Server Components; use Next.js Server Actions
   for mutations where possible and prefer Supabase calls from server helpers to keep secrets server-only.
- When adding routes, maintain tests in `__tests__/` and ensure both unit and integration tests cover core behavior.


## 🌍 Environment Variables

Copy `env.example` to `.env.local` and configure:

```env
# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=ALX Polly
NEXT_PUBLIC_APP_VERSION=1.0.0

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Security (replace with actual values in production)
# JWT_SECRET=your-jwt-secret-here
# COOKIE_SECRET=your-cookie-secret-here

# Database (if needed in future)
# DATABASE_URL=postgresql://username:password@localhost:5432/database

# External Services (if needed in future)
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
# EMAIL_SERVICE_API_KEY=your-email-service-key
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Set environment variables in your hosting platform

## 🔒 Security Considerations

- All external links use `rel="noopener noreferrer"`
- Environment variables for sensitive data
- Input validation on API endpoints
- HTTPS enforcement in production
- User authentication (to be implemented)

## 📈 Performance
## 🧭 Troubleshooting

- If pages that use Supabase return empty lists or errors, verify your
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` values.
- On Windows, file/folder names containing square brackets (Next.js dynamic
   routes like `app/polls/[id]`) can be blocked by some tools; if you hit
   issues opening these files, rename to `app/polls/_id` and update route
   imports accordingly (document the change in your PR).
- If you see `params is a Promise` errors in server components, unwrap
   params by awaiting them or use the patterns in the project's
   `copilot-instructions.md`.


- Optimized images with Next.js Image component
- Font optimization with `next/font`
- Static generation where possible
- Minimal bundle size with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the test files for usage examples
- Open an issue in the repository

## 🎯 Upcoming Features

- [ ] User authentication with JWT
- [ ] Database integration (PostgreSQL)
- [ ] Real-time voting updates
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Social media integration

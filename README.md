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

## 🛠️ Installation

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
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── health/        # Health check endpoint
│   │   └── polls/         # Poll-related endpoints
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── polls/             # Poll pages
│   │   ├── [id]/          # Dynamic poll pages
│   │   │   ├── results/   # Poll results
│   │   │   └── share/     # Poll sharing
│   │   ├── new/           # Create new poll
│   │   └── page.tsx       # Polls listing
│   ├── components/        # Reusable components
│   │   ├── ui/            # UI components (Button, etc.)
│   │   ├── Navigation.tsx # Main navigation
│   │   ├── PollForm.tsx   # Poll creation form
│   │   ├── VoteResult.tsx # Vote results display
│   │   └── QRCodeCard.tsx # QR code sharing
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility functions
│   ├── utils.ts           # Utility functions
│   └── types.ts           # TypeScript types
├── __tests__/             # Test files
├── public/                # Static assets
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest setup
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── env.example            # Environment variables template
```

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

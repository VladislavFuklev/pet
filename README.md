# Finance Tracker

Personal finance management application built with Next.js 16, featuring transaction tracking, budget management, analytics, recurring transactions, and CSV import capabilities.

## 🚀 Features

- **Authentication** - Secure sign up/login with NextAuth.js v5
- **Transaction Management** - Track income and expenses with categories
- **Budget Tracking** - Set budgets per category with progress monitoring
- **Analytics Dashboard** - Visualize spending patterns with interactive charts
- **Recurring Transactions** - Automate regular income/expenses
- **CSV Import** - Import transactions from bank statements
- **Notifications** - Budget alerts and spending summaries
- **Dark Mode** - Full dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or Vercel Postgres)

## 🔧 Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd pet
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for local)

4. **Set up the database**

For local PostgreSQL:

```bash
# Start PostgreSQL (if using Docker)
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# Run migrations
npx prisma migrate dev
```

For Vercel Postgres:

- Create a Postgres database in your Vercel dashboard
- Copy the connection string to `DATABASE_URL` in `.env.local`
- Run migrations: `npx prisma migrate deploy`

5. **Seed the database (optional)**

```bash
npm run seed
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

Run tests:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🚢 Deployment to Vercel

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Set up environment variables** in Vercel dashboard:

   - `DATABASE_URL` (use Vercel Postgres)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `CRON_SECRET` (for recurring transactions)

4. **Run database migrations**

```bash
vercel env pull .env.production
npx prisma migrate deploy
```

## 📁 Project Structure

```
pet/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/       # Main dashboard
│   │   ├── transactions/    # Transaction management
│   │   ├── budgets/         # Budget tracking
│   │   ├── reports/         # Analytics & reports
│   │   ├── recurring/       # Recurring transactions
│   │   ├── import/          # CSV import
│   │   └── settings/        # User settings
│   └── api/                 # API routes
│       ├── auth/            # NextAuth handlers
│       └── cron/            # Cron jobs (Vercel)
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components
│   ├── forms/               # Form components
│   ├── charts/              # Chart components
│   └── transactions/        # Transaction-specific
├── lib/                     # Utilities and helpers
│   ├── actions/             # Server Actions
│   ├── validations/         # Zod schemas
│   ├── utils/               # Helper functions
│   └── constants/           # App constants
├── prisma/                  # Database schema & migrations
├── types/                   # TypeScript types
└── config/                  # App configuration
```

## 🗄️ Database Schema

Main entities:

- **User** - User accounts and authentication
- **Category** - Income/expense categories
- **Transaction** - Financial transactions
- **Budget** - Budget allocations
- **RecurringTransaction** - Recurring transaction templates
- **NotificationSettings** - User notification preferences

See `prisma/schema.prisma` for detailed schema.

## 🔐 Authentication

The app uses NextAuth.js v5 with:

- Credentials provider (email/password)
- JWT sessions
- Protected routes via middleware
- Automatic session management

## 📊 Key Features Implementation

### Transaction Management

- Create, read, update, delete transactions
- Filter by date range, category, type
- Search functionality
- Soft delete for audit trail

### Budget Tracking

- Set monthly/quarterly/yearly budgets
- Real-time progress tracking
- Alert thresholds (50%, 80%, 100%)
- Overspending warnings

### Analytics

- Interactive charts (Recharts)
- Spending by category
- Monthly trends
- Income vs expenses comparison

### CSV Import

- Parse CSV files from banks
- Column mapping interface
- Duplicate detection
- Bulk import with validation

### Recurring Transactions

- Set up recurring income/expenses
- Multiple frequencies (daily, weekly, monthly, yearly)
- Automatic generation via Vercel Cron

## 🧩 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Charts library

---

Built with ❤️ using Next.js 16

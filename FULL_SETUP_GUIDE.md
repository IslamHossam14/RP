# Complete Setup Guide - Right Place Academy

This guide covers the complete setup of both frontend and backend for Right Place Academy.

## Project Structure

```
├── app/                          # Next.js frontend
│   ├── page.tsx                 # Home page
│   ├── login/                   # Login page (multi-step)
│   ├── register/                # Registration page
│   ├── dashboard/               # User dashboard
│   └── admin/super-admin/       # Super admin dashboard
├── backend/                      # Express backend
│   ├── src/
│   │   ├── services/            # Business logic
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API endpoints
│   │   └── middleware/          # Auth, error handling
│   ├── prisma/                  # Database schema & seed
│   └── README.md                # Backend setup
├── contexts/                     # React contexts
│   └── AuthContext.tsx          # Auth provider
└── components/                   # React components
```

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

## Part 1: Frontend Setup

### Step 1.1: Install Dependencies

```bash
# From project root
npm install
```

### Step 1.2: Configure Environment

```bash
# Create .env.local from example
cp .env.example .env.local
```

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Step 1.3: Start Development Server

```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Part 2: Backend Setup

### Step 2.1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2.2: Configure Environment

```bash
cp .env.example .env
```

Update `.env`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/right_place_academy"

# JWT
JWT_SECRET="your-secret-key-here-at-least-32-chars"

# Server
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### Step 2.3: Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed sample data
npm run prisma:seed
```

### Step 2.4: Start Backend Server

```bash
npm run dev
```

Backend API will be available at `http://localhost:3001`

## Part 3: Authentication Testing

### Super Admin Account

After running the seed script, you have a super admin account:

- **Email:** `admin@gmail.com`
- **Password:** `admin123`

### Test Authentication Flow

#### 1. Go to Frontend
```
Open http://localhost:3000 in your browser
```

#### 2. Click "تسجيل دخول" (Login)
```
You'll be redirected to /login
```

#### 3. Enter Email
```
Email: admin@gmail.com
Click: التالي (Next)
```

#### 4. Enter Password
```
Password: admin123
Click: تسجيل الدخول (Login)
```

#### 5. Auto-Redirect
```
You should be redirected to /admin/super-admin
This is the super admin dashboard
```

### Test with Another User

#### 1. Create New User
- Click "تسجيل دخول" on homepage
- Enter new email (e.g., `user@example.com`)
- Click "التالي"
- Click "انشاء حساب"
- Fill registration form
- Click "إنشاء حساب"

#### 2. Login as New User
- You'll be redirected to `/dashboard`
- This is the regular user dashboard

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/check-email` | Check if email exists |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/auth/change-password` | Change password |

### All Endpoints
See `backend/INTEGRATION_GUIDE.md` for complete API documentation.

## Swagger Documentation

Once backend is running, access API documentation:

```
http://localhost:3001/api-docs
```

## Troubleshooting

### Backend Connection Failed

**Problem:** Frontend shows "Error checking email"

**Solution:**
1. Ensure backend is running on `http://localhost:3001`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for CORS errors
4. Verify `CORS_ORIGIN` in backend `.env`

### Database Connection Error

**Problem:** "Error connecting to database"

**Solution:**
1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` format in `.env`
3. Verify database exists
4. Run migrations: `npm run prisma:migrate`

### Super Admin Not Found

**Problem:** Can't login with `admin@gmail.com`

**Solution:**
1. Run seed script: `npm run prisma:seed`
2. Check database has users
3. Verify email is exactly `admin@gmail.com`

### Password Hash Issues

**Problem:** Passwords not being validated correctly

**Solution:**
1. Ensure bcryptjs is installed: `npm install bcryptjs`
2. Check password is being hashed before storage
3. Verify salt rounds are set to 10

## Development Workflow

### Making Changes to Backend

1. Edit files in `backend/src`
2. Server auto-reloads with nodemon
3. Test with Swagger UI or cURL
4. Check console for errors

### Making Changes to Frontend

1. Edit files in `app/` or `components/`
2. Hot reload updates in browser
3. Check browser console for errors

### Adding New API Endpoints

1. Create route in `backend/src/routes/`
2. Create service in `backend/src/services/`
3. Create controller in `backend/src/controllers/`
4. Add to `src/app.ts`
5. Test with cURL or Swagger UI

## Database Viewing

### Using Prisma Studio

```bash
cd backend
npm run prisma:studio
```

Opens interactive database explorer at `http://localhost:5555`

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Enable HTTPS
- [ ] Set proper `CORS_ORIGIN`
- [ ] Configure email verification
- [ ] Add rate limiting
- [ ] Enable database backups
- [ ] Setup error logging
- [ ] Configure CDN for assets
- [ ] Use environment variables for secrets

## Additional Resources

- **Frontend Docs:** See `AUTH_FLOW_SUMMARY.md`
- **Backend Docs:** See `backend/README.md`
- **Auth Guide:** See `backend/AUTHENTICATION_GUIDE.md`
- **Integration Guide:** See `backend/INTEGRATION_GUIDE.md`

## Support

For issues or questions:

1. Check troubleshooting section
2. Review console logs
3. Check API response in browser DevTools
4. Run seed script again if database issues
5. Restart both servers

---

**You're all set! 🎉**

The complete authentication system is ready. Both frontend and backend are fully integrated and ready for development.

### Quick Commands

```bash
# Frontend
npm run dev                 # Start frontend
npm run build              # Build for production

# Backend
cd backend
npm run dev               # Start backend
npm run build             # Build for production
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Seed data
npm run prisma:studio     # Open database UI
```

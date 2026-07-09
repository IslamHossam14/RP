# Quick Reference - Backend & Frontend Integration

## Start Everything

```bash
# Terminal 1: Start Backend
cd backend
npm run prisma:seed  # First time only
npm run dev         # http://localhost:3001

# Terminal 2: Start Frontend
npm run dev         # http://localhost:3000
```

## Super Admin Login

```
URL: http://localhost:3000
Email: admin@gmail.com
Password: admin123
```

After login → Auto-redirect to `/admin/super-admin`

## API Endpoints

| Action | Method | Endpoint | Body |
|--------|--------|----------|------|
| Check Email | POST | `/api/auth/check-email` | `{email}` |
| Login | POST | `/api/auth/login` | `{email, password}` |
| Register | POST | `/api/auth/register` | `{name, email, phone, password, specialization}` |
| Get Profile | GET | `/api/auth/profile` | - |
| Update Profile | PUT | `/api/auth/profile` | `{...}` |

## Frontend Structure

```
app/
├── page.tsx                    # Homepage
├── login/page.tsx             # Login (multi-step)
├── register/page.tsx          # Registration
├── dashboard/page.tsx         # User dashboard
└── admin/super-admin/         # Super admin dashboard

contexts/
└── AuthContext.tsx            # Auth provider

components/
├── Navbar.tsx                 # Navigation + auth
├── DashboardSidebar.tsx       # Admin sidebar
└── ... other components
```

## Backend Structure

```
backend/src/
├── services/                  # Business logic
├── controllers/               # Request handlers
├── routes/                    # API endpoints
├── middleware/                # Auth, errors
├── validators/                # Input validation
└── utils/                     # Helpers

backend/prisma/
├── schema.prisma              # Database design
└── seed.ts                    # Sample data
```

## Key Files to Modify

### Add New API Endpoint

1. **Create route** → `backend/src/routes/example.routes.ts`
2. **Create service** → `backend/src/services/example.service.ts`
3. **Create controller** → `backend/src/controllers/example.controller.ts`
4. **Register in app** → `backend/src/app.ts`

### Add Protected Route

1. **Create page** → `app/example/page.tsx`
2. **Add auth check:**
   ```typescript
   const { user, isLoading } = useAuth()
   
   if (!isLoading && !user) {
     router.push('/login')
     return null
   }
   ```
3. **Add role check if needed:**
   ```typescript
   if (user?.role !== 'super_admin') {
     router.push('/login')
     return null
   }
   ```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Database Commands

```bash
cd backend

# View database UI
npm run prisma:studio

# Run migrations
npm run prisma:migrate

# Seed data
npm run prisma:seed

# Reset database
npx prisma db push --force-reset
```

## Testing with cURL

```bash
# Check email
curl -X POST http://localhost:3001/api/auth/check-email \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"admin123"}'

# Get profile (with token)
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Common Errors

### "Cannot find module '@/'"
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Backend connection refused
```
1. Ensure backend running: npm run dev (in backend/)
2. Check NEXT_PUBLIC_API_URL in .env.local
3. Check CORS_ORIGIN in backend .env
```

### Database connection error
```
1. Ensure PostgreSQL running
2. Check DATABASE_URL format
3. Run: npm run prisma:migrate
```

### Super admin not found
```
1. Run: npm run prisma:seed
2. Check email: admin@gmail.com
3. Check password: admin123
```

## Test Login Credentials

| Email | Password | Role |
|-------|----------|------|
| `admin@gmail.com` | `admin123` | Super Admin |
| `ahmed@example.com` | `Student123` | Student |
| `fatima@example.com` | `Student123` | Student |

Or create new account via registration flow

## Documentation Files

- **FULL_SETUP_GUIDE.md** - Complete setup from scratch
- **BACKEND_FRONTEND_INTEGRATION.md** - Integration details
- **backend/AUTHENTICATION_GUIDE.md** - Auth API docs
- **backend/INTEGRATION_GUIDE.md** - All API endpoints
- **backend/README.md** - Backend setup
- **AUTH_FLOW_SUMMARY.md** - Frontend flow

## Frontend Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Homepage |
| `/login` | Public | Multi-step login |
| `/register` | Public | Registration |
| `/dashboard` | Protected | User dashboard |
| `/admin/super-admin` | Super Admin Only | Admin dashboard |
| `/courses` | Public | Browse courses |
| `/consultations` | Public | Browse consultations |

## Backend Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `POST /api/auth/check-email` | Public | Check email exists |
| `POST /api/auth/login` | Public | Login |
| `POST /api/auth/register` | Public | Register |
| `GET /api/auth/profile` | Protected | Get profile |
| `PUT /api/auth/profile` | Protected | Update profile |
| `POST /api/courses` | Protected | Create course |
| `GET /api/courses` | Public | Get courses |

## Development Tips

### Debug Frontend Auth
```typescript
// Add to component
console.log("[v0] User:", useAuth().user)
console.log("[v0] Token:", localStorage.getItem('accessToken'))
```

### Debug Backend API
```bash
# Watch logs
npm run dev

# Or check Swagger UI
http://localhost:3001/api-docs
```

### Test Protected Route
```bash
# Get token from login response
TOKEN="eyJhbGc..."

# Use in requests
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/auth/profile
```

## Performance Tips

1. **Frontend:**
   - Enable React.StrictMode for debugging
   - Use React DevTools for profiling
   - Check Network tab for API calls

2. **Backend:**
   - Monitor logs for errors
   - Use Prisma Studio to view data
   - Check database query performance

## Next: What to Build

1. Courses CRUD endpoints
2. Registration system
3. Payment processing
4. Consultations booking
5. Studio services
6. Events management
7. Admin dashboard features
8. User profile management

---

**Ready to build! 🚀**

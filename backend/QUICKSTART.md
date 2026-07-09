# Quick Start Guide - Right Place Academy Backend

Get the backend running in 5 minutes!

## Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

## 1. Install Dependencies

```bash
cd backend
npm install
```

**Takes ~30 seconds**

## 2. Configure Database

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and set your PostgreSQL URL:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/right_place_db
JWT_SECRET=your_jwt_secret_key_change_me
PORT=3001
NODE_ENV=development
```

## 3. Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed with sample data
npm run prisma:seed
```

**Takes ~1 minute**

## 4. Start Development Server

```bash
npm run dev
```

**Server starts at:** `http://localhost:3001`

## 5. Access Documentation

Open Swagger UI: `http://localhost:3001/api-docs`

---

## 🎯 Common Tasks

### Test Registration

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "966501234567",
    "password": "Password123",
    "specialization": "تطوير ويب"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Get Courses

```bash
curl http://localhost:3001/api/courses
```

### List Endpoints

Visit: `http://localhost:3001/api-docs`

---

## 🔧 Build for Production

```bash
# Compile TypeScript
npm run build

# Start production server
npm start
```

---

## 📚 Documentation

- **README.md** - Full setup guide
- **INTEGRATION_GUIDE.md** - Frontend integration
- **BACKEND_SUMMARY.md** - Features overview
- **COMPLETE_OVERVIEW.md** - Detailed architecture
- **API Docs** - http://localhost:3001/api-docs

---

## ⚡ Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/courses | List courses |
| POST | /api/registrations | Enroll in course |
| POST | /api/payments | Create payment |
| POST | /api/events/:id/register | Register for event |
| POST | /api/contact | Send message |

**All endpoints need Bearer token except register/login/contact**

```bash
Authorization: Bearer <your_jwt_token>
```

---

## 🚀 That's It!

Your backend is now running and ready for frontend integration.

Next steps:
1. Read INTEGRATION_GUIDE.md for frontend connection
2. Test endpoints using Swagger docs
3. Start integrating with frontend

---

## 💡 Useful Commands

```bash
# Development
npm run dev              # Start with auto-reload

# Production
npm run build            # Compile
npm start               # Run production build

# Database
npm run prisma:migrate  # Run new migrations
npm run prisma:studio   # Open Prisma GUI
npm run prisma:seed     # Add sample data

# Troubleshooting
npm run prisma:generate # Regenerate Prisma client
```

---

## 📝 Example: Complete User Flow

### 1. Register
```bash
POST /api/auth/register
```

### 2. Get Courses
```bash
GET /api/courses
```

### 3. Enroll in Course
```bash
POST /api/registrations
Authorization: Bearer <token>
Body: { "courseId": "course_id" }
```

### 4. Create Payment
```bash
POST /api/payments
Authorization: Bearer <token>
Body: { "courseId": "course_id", "paymentMethod": "credit_card" }
```

### 5. Complete Payment
```bash
POST /api/payments/{id}/complete
Authorization: Bearer <token>
Body: { "transactionId": "txn_123" }
```

---

## 🎉 You're Ready!

Backend is running. Now integrate with frontend!

See **INTEGRATION_GUIDE.md** for code examples.

---

## ❓ Need Help?

1. Check logs in terminal
2. Visit http://localhost:3001/api-docs
3. Read full README.md
4. Check INTEGRATION_GUIDE.md

**That's all! Happy coding! 🚀**

# Backend Authentication Guide

## Overview

This guide explains the authentication system for Right Place Academy backend. The system supports multi-step login and role-based access control.

## Super Admin Account

**Email:** `admin@gmail.com`
**Password:** `admin123`
**Role:** `SUPER_ADMIN`

This account is automatically created when you run the seed script.

## Authentication Endpoints

### 1. Check Email (Multi-step Login)

**Endpoint:** `POST /api/auth/check-email`

**Purpose:** Verify if an email is registered in the system.

**Request:**
```json
{
  "email": "admin@gmail.com"
}
```

**Response (Email Exists):**
```json
{
  "success": true,
  "data": {
    "exists": true,
    "message": "Email is registered",
    "role": "SUPER_ADMIN"
  }
}
```

**Response (Email Not Exists):**
```json
{
  "success": true,
  "data": {
    "exists": false,
    "message": "Email is not registered, you can create an account"
  }
}
```

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Purpose:** Authenticate user with email and password.

**Request:**
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "admin@gmail.com",
      "password": "admin123",
      "name": "Super Admin",
      "phone": "966501234567",
      "avatar": null,
      "role": "SUPER_ADMIN",
      "specialization": "Administration",
      "bio": null,
      "status": "ACTIVE",
      "emailVerified": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Response (Invalid Credentials):**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid credentials",
  "statusCode": 401
}
```

### 3. Register

**Endpoint:** `POST /api/auth/register`

**Purpose:** Create a new user account.

**Request:**
```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "966501234567",
  "password": "SecurePassword123",
  "specialization": "تطوير ويب"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "ahmed@example.com",
      "name": "أحمد محمد",
      "role": "STUDENT",
      ...
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

## User Roles

| Role | Access Level | Dashboard |
|------|------------|-----------|
| `SUPER_ADMIN` | Full system access | `/admin/super-admin` |
| `ADMIN` | Admin management | `/admin/dashboard` |
| `INSTRUCTOR` | Course management | `/instructor/dashboard` |
| `STUDENT` | User dashboard | `/dashboard` |

## Password Hashing

All passwords are hashed using bcryptjs with 10 rounds:

```typescript
const hashedPassword = await hashPassword(password);
```

## JWT Tokens

### Access Token
- **Expiry:** 24 hours
- **Used for:** API authentication
- **Header:** `Authorization: Bearer <token>`

### Refresh Token
- **Expiry:** 7 days
- **Used for:** Obtaining new access tokens
- **Storage:** Secure httpOnly cookies (recommended)

## Authentication Flow

```
1. User enters email
   ↓
2. Frontend calls /api/auth/check-email
   ↓
   ├─ Email exists → Ask for password
   └─ Email not exists → Offer registration
   ↓
3. Frontend calls /api/auth/login or /api/auth/register
   ↓
4. Backend returns user data + tokens
   ↓
5. Frontend stores tokens and redirects based on role
   ├─ SUPER_ADMIN → /admin/super-admin
   └─ Others → /dashboard
```

## Protected Routes

All protected routes require the `Authorization` header with a valid JWT token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Example Protected Endpoints
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

## Error Handling

### Common Error Responses

**400 - Bad Request:**
```json
{
  "success": false,
  "error": "Validation error",
  "message": "Email is required",
  "statusCode": 400
}
```

**401 - Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid credentials",
  "statusCode": 401
}
```

**409 - Conflict:**
```json
{
  "success": false,
  "error": "Conflict",
  "message": "Email already registered",
  "statusCode": 409
}
```

## Setting Up the Backend

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL URL
```

### 3. Setup Database
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 4. Start Server
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## Testing Authentication

### Using cURL

**Check Email:**
```bash
curl -X POST http://localhost:3001/api/auth/check-email \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com"}'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"admin123"}'
```

**Register:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"أحمد",
    "email":"ahmed@example.com",
    "phone":"966501234567",
    "password":"SecurePass123",
    "specialization":"تطوير ويب"
  }'
```

## Frontend Integration

The frontend connects to these endpoints through the `AuthContext`:

```typescript
// Check if email exists
const { exists, role } = await checkEmail(email);

// Login
await login(email, password);

// Register
await register({
  email,
  password,
  name,
  phone,
  specialization,
});

// Logout
logout();
```

## Security Considerations

1. **Password Storage:** All passwords are hashed with bcryptjs
2. **Token Storage:** Access tokens in localStorage, refresh tokens in httpOnly cookies
3. **CORS:** Configured for frontend domain only
4. **Input Validation:** All inputs validated with Zod schemas
5. **Error Messages:** Sanitized to prevent information disclosure
6. **Rate Limiting:** Recommended for production (not implemented)

## Database Schema

### User Table
```
- id (UUID)
- name (String)
- email (String, unique)
- phone (String)
- password (String, hashed)
- role (ENUM: SUPER_ADMIN, ADMIN, INSTRUCTOR, STUDENT)
- specialization (String)
- avatar (String)
- bio (String)
- status (ENUM: ACTIVE, PENDING, SUSPENDED)
- emailVerified (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## Troubleshooting

### Super Admin Not Working
1. Check if user with email `admin@gmail.com` exists in database
2. Verify password hash for `admin123`
3. Run seed script again: `npm run prisma:seed`

### Login Fails with "Invalid credentials"
1. Verify email exists in database
2. Check password is correct
3. Ensure user status is `ACTIVE`

### Tokens Not Being Returned
1. Check if login endpoint is working
2. Verify JWT secret is set in `.env`
3. Check server logs for errors

## Next Steps

1. Add email verification
2. Add password reset functionality
3. Add 2FA for super admin
4. Add OAuth integration (Google, GitHub)
5. Implement rate limiting
6. Add refresh token rotation

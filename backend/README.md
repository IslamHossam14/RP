# Right Place Academy Backend API

A comprehensive, production-ready backend for an educational platform built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Features

### Core Features
- ✅ User Authentication & Authorization (JWT)
- ✅ Course Management (CRUD operations)
- ✅ User Registrations for Courses
- ✅ Payment Processing & Management
- ✅ Consultation Booking System
- ✅ Studio Production Services
- ✅ Event Management & Registration
- ✅ Contact & Inquiry Management
- ✅ Admin Dashboard APIs
- ✅ Role-Based Access Control (RBAC)

### Technical Features
- ✅ TypeScript for type safety
- ✅ Express.js for REST API
- ✅ Prisma ORM for database operations
- ✅ PostgreSQL database
- ✅ JWT Authentication
- ✅ Password hashing with bcryptjs
- ✅ Zod for validation
- ✅ Error handling & middleware
- ✅ Swagger/OpenAPI documentation
- ✅ Pagination, filtering, and search
- ✅ CORS enabled
- ✅ Helmet for security
- ✅ Rate limiting ready

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Setup Steps

1. **Clone and install dependencies**
```bash
cd backend
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your database URL and other configurations:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/right_place_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
PORT=3001
NODE_ENV=development
```

3. **Setup Database**
```bash
# Generate Prisma client
npm run prisma:generate

# Create database and run migrations
npm run prisma:migrate

# Seed initial data (optional)
npm run prisma:seed
```

4. **Start Development Server**
```bash
npm run dev
```

The API will be available at `http://localhost:3001`
Swagger docs available at `http://localhost:3001/api-docs`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Courses
- `GET /api/courses` - List all courses (paginated)
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/featured` - Get featured courses
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)
- `PATCH /api/courses/:id/status` - Update course status (Admin)
- `GET /api/courses/:id/stats` - Get course statistics (Admin)

### Registrations
- `GET /api/registrations` - Get all registrations (Admin)
- `GET /api/registrations/user/my` - Get user's registrations
- `GET /api/registrations/:id` - Get registration details
- `POST /api/registrations` - Create registration
- `PATCH /api/registrations/:id/status` - Update status (Admin)
- `PATCH /api/registrations/:id/complete` - Complete registration (Admin)
- `DELETE /api/registrations/:id` - Delete registration (Admin)
- `GET /api/registrations/stats/all` - Get statistics (Admin)

### Payments
- `GET /api/payments` - Get all payments (Admin)
- `GET /api/payments/user/my` - Get user's payments
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments` - Create payment
- `PATCH /api/payments/:id/status` - Update payment status (Admin)
- `POST /api/payments/:id/complete` - Complete payment
- `POST /api/payments/:id/refund` - Refund payment (Admin)
- `GET /api/payments/stats/all` - Get payment statistics (Admin)

### Consultations
- `GET /api/consultations` - List consultations
- `GET /api/consultations/:id` - Get consultation details
- `POST /api/consultations` - Create consultation (Admin)
- `POST /api/consultations/:id/book` - Book consultation
- `GET /api/consultations/user/bookings` - Get user's bookings
- `GET /api/consultations/admin/bookings` - Get all bookings (Admin)
- `PATCH /api/consultations/booking/:id/status` - Update booking status (Admin)
- `POST /api/consultations/booking/:id/cancel` - Cancel booking

### Studio Services
- `GET /api/studio/services` - List services
- `GET /api/studio/services/:id` - Get service details
- `POST /api/studio/services` - Create service (Admin)
- `PUT /api/studio/services/:id` - Update service (Admin)
- `GET /api/studio/requests` - Get all requests (Admin)
- `GET /api/studio/requests/user/my` - Get user's requests
- `GET /api/studio/requests/:id` - Get request details
- `POST /api/studio/requests` - Create request
- `PATCH /api/studio/requests/:id/status` - Update request status (Admin)

### Events
- `GET /api/events` - List events
- `GET /api/events/upcoming/featured` - Get upcoming events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `POST /api/events/:id/register` - Register for event
- `GET /api/events/user/registrations` - Get user's registrations
- `GET /api/events/admin/registrations` - Get all registrations (Admin)
- `PATCH /api/events/registration/:id/status` - Update registration status (Admin)
- `GET /api/events/:id/stats` - Get event statistics (Admin)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (Admin)
- `GET /api/contact/:id` - Get message details (Admin)
- `PATCH /api/contact/:id/status` - Update message status (Admin)
- `DELETE /api/contact/:id` - Delete message (Admin)
- `GET /api/contact/stats/all` - Get statistics (Admin)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

## User Roles

- **STUDENT** - Can enroll in courses, book consultations, register for events
- **INSTRUCTOR** - Can manage own courses and consultations
- **ADMIN** - Full access to all resources except payments
- **SUPER_ADMIN** - Complete access to all resources including payments

## Database Schema

The database includes the following main tables:
- `User` - User accounts and profiles
- `Course` - Educational courses and diplomas
- `Registration` - Course enrollments
- `Payment` - Payment records
- `Consultation` - Consultation services
- `ConsultationBooking` - Consultation bookings
- `StudioService` - Studio services
- `StudioRequest` - Service requests
- `Event` - Events and workshops
- `EventRegistration` - Event registrations
- `Contact` - Contact messages

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validators/      # Input validation schemas
│   ├── app.ts           # Express app setup
│   └── index.ts         # Entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── uploads/             # File upload directory
├── .env.example         # Environment template
├── README.md            # This file
└── package.json         # Dependencies
```

## Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (GUI for database)
npm run prisma:studio

# Seed database with initial data
npm run prisma:seed
```

## Environment Variables

Required environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | Required |
| JWT_SECRET | Secret key for JWT signing | Required |
| JWT_EXPIRY | JWT token expiration | 7d |
| REFRESH_TOKEN_SECRET | Refresh token secret | Required |
| REFRESH_TOKEN_EXPIRY | Refresh token expiration | 30d |
| PORT | Server port | 3001 |
| NODE_ENV | Environment (development/production) | development |
| CORS_ORIGIN | CORS allowed origins | * |
| ADMIN_EMAIL | Default admin email | admin@rightplace.com |
| ADMIN_PASSWORD | Default admin password | AdminPassword123 |

## Security Considerations

- All passwords are hashed with bcryptjs (salt rounds: 10)
- JWT tokens have expiration times
- CORS is configured for specific origins
- Helmet provides HTTP security headers
- Input validation with Zod
- SQL injection prevention via Prisma
- CSRF protection ready
- Rate limiting ready (add middleware as needed)

## Error Handling

API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Paginated responses include pagination info:

```json
{
  "success": true,
  "message": "Success message",
  "data": [],
  "pagination": {
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10,
    "hasMore": true
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Deployment

### Using Vercel with PostgreSQL:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Using Docker:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Troubleshooting

### Database Connection Error
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check network connectivity

### JWT Errors
- Ensure JWT_SECRET is set
- Verify token format (Bearer <token>)
- Check token expiration

### CORS Issues
- Update CORS_ORIGIN environment variable
- Check frontend URL configuration

## Support

For issues, questions, or contributions, please contact the development team.

## License

All rights reserved. © Right Place Academy 2024

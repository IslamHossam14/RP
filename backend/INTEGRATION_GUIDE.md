# Frontend Integration Guide

## Complete Guide to Integrate Right Place Academy Backend with Frontend

### Table of Contents
1. [Getting Started](#getting-started)
2. [API Base URL](#api-base-url)
3. [Authentication Flow](#authentication-flow)
4. [Integration Examples](#integration-examples)
5. [Error Handling](#error-handling)

---

## Getting Started

The backend API is now ready to integrate with your Next.js frontend. All endpoints are documented and follow RESTful standards.

### Quick Links
- **API Documentation**: `http://localhost:3001/api-docs` (Swagger UI)
- **Base URL**: `http://localhost:3001/api`
- **Health Check**: `http://localhost:3001/health`

---

## API Base URL

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
```

Add to your `.env` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Authentication Flow

### 1. User Registration

**Endpoint**: `POST /api/auth/register`

```javascript
async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      specialization: userData.specialization,
    }),
  });

  if (!response.ok) throw new Error('Registration failed');
  
  const data = await response.json();
  // Save tokens
  localStorage.setItem('accessToken', data.data.accessToken);
  localStorage.setItem('refreshToken', data.data.refreshToken);
  
  return data.data.user;
}
```

### 2. User Login

**Endpoint**: `POST /api/auth/login`

```javascript
async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Login failed');
  
  const data = await response.json();
  localStorage.setItem('accessToken', data.data.accessToken);
  localStorage.setItem('refreshToken', data.data.refreshToken);
  
  return data.data;
}
```

### 3. API Request Helper

```javascript
async function apiCall(url, options = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (response.status === 401) {
    // Token expired - redirect to login
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    return;
  }
  
  return response.json();
}
```

---

## Integration Examples

### Courses Page

```javascript
'use client';

import { useEffect, useState } from 'react';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchCourses = async () => {
    try {
      const response = await apiCall(
        `${process.env.NEXT_PUBLIC_API_URL}/courses?page=${page}&pageSize=10`
      );
      
      if (response.success) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {courses.map(course => (
            <div key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: ${course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### User Registration Integration

```javascript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    specialization: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            specialization: formData.specialization,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      // Save tokens
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
```

### Course Registration

```javascript
async function enrollInCourse(courseId) {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/registrations`,
    {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    }
  );

  if (response.success) {
    // Show success message
    alert('Successfully enrolled in course!');
    // Redirect to payment or next step
  } else {
    alert('Enrollment failed: ' + response.message);
  }
}
```

### Payment Processing

```javascript
async function processPayment(courseId) {
  // Step 1: Create payment record
  const paymentResponse = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/payments`,
    {
      method: 'POST',
      body: JSON.stringify({
        courseId,
        paymentMethod: 'credit_card',
      }),
    }
  );

  if (!paymentResponse.success) {
    alert('Payment initialization failed');
    return;
  }

  const payment = paymentResponse.data;

  // Step 2: Integrate with payment gateway (Stripe, Fawry, etc.)
  // ... payment gateway integration code ...

  // Step 3: Complete payment on backend
  const completeResponse = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/payments/${payment.id}/complete`,
    {
      method: 'POST',
      body: JSON.stringify({
        transactionId: 'TRANSACTION_ID_FROM_GATEWAY',
      }),
    }
  );

  return completeResponse;
}
```

### Get User Profile

```javascript
async function getUserProfile() {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`
  );

  if (response.success) {
    return response.data;
  }
  throw new Error(response.message);
}
```

### Update User Profile

```javascript
async function updateProfile(updates) {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
    {
      method: 'PUT',
      body: JSON.stringify(updates),
    }
  );

  return response;
}
```

### Get User Registrations

```javascript
async function getUserCourses() {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/registrations/user/my?page=1&pageSize=10`
  );

  return response.data;
}
```

### Book Consultation

```javascript
async function bookConsultation(consultationId, date, time) {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/consultations/${consultationId}/book`,
    {
      method: 'POST',
      body: JSON.stringify({
        date: new Date(date).toISOString(),
        time,
      }),
    }
  );

  return response;
}
```

### Request Studio Service

```javascript
async function requestStudioService(serviceId, details) {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/studio/requests`,
    {
      method: 'POST',
      body: JSON.stringify({
        serviceId,
        title: details.title,
        description: details.description,
        budget: details.budget,
        deadline: details.deadline,
      }),
    }
  );

  return response;
}
```

### Register for Event

```javascript
async function registerForEvent(eventId, attendeeCount = 1) {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/register`,
    {
      method: 'POST',
      body: JSON.stringify({ attendeeCount }),
    }
  );

  return response;
}
```

### Send Contact Message

```javascript
async function sendContactMessage(contactData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contact`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        subject: contactData.subject,
        message: contactData.message,
      }),
    }
  );

  return response.json();
}
```

---

## Error Handling

### Standard Error Response

```javascript
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Handling Middleware

```javascript
async function handleApiError(response) {
  const data = await response.json();

  switch (response.status) {
    case 400:
      throw new Error(`Validation Error: ${data.message}`);
    case 401:
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      break;
    case 403:
      throw new Error('You do not have permission for this action');
    case 404:
      throw new Error('Resource not found');
    case 409:
      throw new Error(`Conflict: ${data.message}`);
    default:
      throw new Error(data.message || 'An error occurred');
  }
}
```

---

## Admin Features

### Get All Users (Admin Only)

```javascript
async function getAllUsers(page = 1, search = '') {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&pageSize=10&search=${search}`
  );

  return response;
}
```

### Get All Payments (Admin Only)

```javascript
async function getAllPayments() {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/payments`
  );

  return response;
}
```

### Get Payment Stats (Admin Only)

```javascript
async function getPaymentStats() {
  const response = await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/payments/stats/all`
  );

  return response.data;
}
```

---

## Next Steps

1. Implement authentication context/state management (Redux, Context API, or Zustand)
2. Add error boundaries for better error handling
3. Implement loading states and skeleton screens
4. Add form validation on the frontend
5. Integrate payment gateway
6. Set up analytics tracking
7. Add push notifications for important events
8. Implement caching strategies with SWR or React Query

---

## Support

For API documentation, visit: `http://localhost:3001/api-docs`

For questions or issues, please refer to the main README.md file.

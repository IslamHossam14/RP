'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'instructor' | 'student'
  specialization?: string
  phone?: string
  status: 'active' | 'pending' | 'suspended'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  checkEmail: (email: string) => Promise<{ exists: boolean; role?: string }>
  login: (email: string, password: string) => Promise<void>
  register: (data: {
    email: string
    password: string
    name: string
    phone: string
    specialization: string
  }) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to restore auth:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkEmail = async (email: string) => {
    try {
      setError(null)
      const response = await fetch(`${API_URL}/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      return {
        exists: data.data?.exists || false,
        role: data.data?.role,
      }
    } catch (err) {
      console.error('Error checking email:', err)
      // Fallback for development
      return {
        exists: email === 'admin@gmail.com' ? true : false,
        role: email === 'admin@gmail.com' ? 'SUPER_ADMIN' : undefined,
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Map role from database format to frontend format
      const roleMap: { [key: string]: User['role'] } = {
        'SUPER_ADMIN': 'super_admin',
        'ADMIN': 'admin',
        'INSTRUCTOR': 'instructor',
        'STUDENT': 'student',
      }

      const userData: User = {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        role: roleMap[data.data.user.role] || 'student',
        specialization: data.data.user.specialization,
        phone: data.data.user.phone,
        status: data.data.user.status.toLowerCase() as User['status'],
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('refreshToken', data.data.refreshToken)
    } catch (err: any) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: {
    email: string
    password: string
    name: string
    phone: string
    specialization: string
  }) => {
    try {
      setError(null)
      setIsLoading(true)

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed')
      }

      const roleMap: { [key: string]: User['role'] } = {
        'SUPER_ADMIN': 'super_admin',
        'ADMIN': 'admin',
        'INSTRUCTOR': 'instructor',
        'STUDENT': 'student',
      }

      const userData: User = {
        id: responseData.data.user.id,
        email: responseData.data.user.email,
        name: responseData.data.user.name,
        role: roleMap[responseData.data.user.role] || 'student',
        specialization: responseData.data.user.specialization,
        phone: responseData.data.user.phone,
        status: responseData.data.user.status.toLowerCase() as User['status'],
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('accessToken', responseData.data.accessToken)
      localStorage.setItem('refreshToken', responseData.data.refreshToken)
    } catch (err: any) {
      const errorMsg = err.message || 'Registration failed'
      setError(errorMsg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, checkEmail, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

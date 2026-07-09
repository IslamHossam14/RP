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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const login = async (email: string, password: string) => {
    // Determine role based on email
    const isSuperAdmin = email === 'admin@gmail.com'
    
    // Create mock user (in real app, this would be an API call)
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role: isSuperAdmin ? 'super_admin' : 'student',
      status: 'active',
    }

    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const register = async (data: {
    email: string
    password: string
    name: string
    phone: string
    specialization: string
  }) => {
    const isSuperAdmin = data.email === 'admin@gmail.com'
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      phone: data.phone,
      specialization: data.specialization,
      role: isSuperAdmin ? 'super_admin' : 'student',
      status: 'active',
    }

    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, checkAuth }}>
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

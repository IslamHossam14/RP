'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface User {
  id: string
  fullName: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    fullName: string
    phone: string
    email: string
    password: string
  }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    // محاكاة عملية تسجيل الدخول
    if (email && password) {
      setUser({
        id: '1',
        fullName: 'أحمد محمد',
        email,
        phone: '01234567890',
      })
    }
  }, [])

  const register = useCallback(async (userData: {
    fullName: string
    phone: string
    email: string
    password: string
  }) => {
    // محاكاة عملية التسجيل
    setUser({
      id: '1',
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

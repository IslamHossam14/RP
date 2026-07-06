'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  fullName: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => void
  register: (userData: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // تحميل بيانات المستخدم من localStorage عند تحميل التطبيق
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدم:', error)
      }
    }
  }, [])

  const login = (email: string, password: string) => {
    // محاكاة تسجيل الدخول
    const newUser: User = {
      id: Date.now().toString(),
      email,
      fullName: email.split('@')[0],
    }
    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const register = (userData: any) => {
    // محاكاة التسجيل الجديد
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      fullName: userData.fullName,
    }
    setUser(newUser)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth يجب أن يكون داخل AuthProvider')
  }
  return context
}

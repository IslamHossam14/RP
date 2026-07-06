'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { X, Lock, User, Phone, Mail } from 'lucide-react'
import { specializations } from '@/data/specializations'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register } = useAuth()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [registerData, setRegisterData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
  })

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!loginData.email || !loginData.password) {
      setErrors({
        email: !loginData.email ? 'البريد الإلكتروني مطلوب' : '',
        password: !loginData.password ? 'كلمة المرور مطلوبة' : '',
      })
      return
    }

    setLoading(true)
    try {
      await login(loginData.email, loginData.password)
      setLoginData({ email: '', password: '' })
      onClose()
    } catch (error) {
      setErrors({ submit: 'فشل تسجيل الدخول' })
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}

    if (!registerData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب'
    }

    if (!registerData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^\d{10,}$/.test(registerData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح'
    }

    if (!registerData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!registerData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    } else if (registerData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة'
    }

    if (!registerData.specialization) {
      newErrors.specialization = 'اختر تخصصاً'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await register(registerData)
      setRegisterData({
        fullName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        specialization: '',
      })
      onClose()
    } catch (error) {
      setErrors({ submit: 'فشل إنشاء الحساب' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#133A63]">
            {isLoginMode ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoginMode ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    بريد Gmail
                  </div>
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    كلمة المرور
                  </div>
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">أو</span>
                </div>
              </div>

              <p className="text-center text-slate-600">
                ليس لديك حساب؟{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(false)
                    setErrors({})
                  }}
                  className="text-[#B88424] font-semibold hover:underline"
                >
                  إنشاء حساب جديد
                </button>
              </p>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    الاسم الكامل
                  </div>
                </label>
                <input
                  type="text"
                  value={registerData.fullName}
                  onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    رقم الهاتف
                  </div>
                </label>
                <input
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  placeholder="أدخل رقم الهاتف"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    بريد Gmail
                  </div>
                </label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    كلمة المرور
                  </div>
                </label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="أدخل كلمة مرور قوية"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  placeholder="أعد إدخال كلمة المرور"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  التخصص
                </label>
                <select
                  value={registerData.specialization}
                  onChange={(e) => setRegisterData({ ...registerData, specialization: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all bg-white"
                >
                  <option value="">اختر تخصصاً</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                {errors.specialization && (
                  <p className="text-red-600 text-sm mt-1">{errors.specialization}</p>
                )}
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
              </button>

              <p className="text-center text-slate-600">
                لديك حساب بالفعل؟{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(true)
                    setErrors({})
                  }}
                  className="text-[#B88424] font-semibold hover:underline"
                >
                  تسجيل الدخول
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

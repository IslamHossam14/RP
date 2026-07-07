'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/context/AuthContext'
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [callbackUrl, setCallbackUrl] = useState<string>('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // تحميل callbackUrl من URL parameters
  useEffect(() => {
    const callback = searchParams.get('callbackUrl')
    if (callback) {
      setCallbackUrl(callback)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // استدعاء دالة تسجيل الدخول من Auth Context
      login(formData.email, formData.password)
      setSubmitted(true)
      console.log('[v0] تم تسجيل الدخول بنجاح')

      // إعادة التوجيه بعد 1 ثانية
      setTimeout(() => {
        if (callbackUrl) {
          router.push(callbackUrl)
        } else {
          router.push('/')
        }
      }, 1000)
    }
  }

  return (
    <>
      {/* Simple Modal Login Form */}
      <div className="min-h-screen bg-gradient-to-br from-[#133A63] to-[#0A1F36] flex items-center justify-center px-4 py-8">
        <div className="card shadow-2xl max-w-md w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#133A63] text-center">تسجيل الدخول</h2>
            <p className="text-center text-slate-500 text-sm mt-2">استمتع بخدماتنا المتميزة</p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold text-center text-sm">
                تم تسجيل الدخول بنجاح! جاري التوجيه...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    البريد الإلكتروني
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    كلمة المرور
                  </div>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg font-semibold"
              >
                تسجيل الدخول
              </button>

              {/* Register Link */}
              <p className="text-center text-slate-600">
                ليس لديك حساب؟{' '}
                <Link
                  href={callbackUrl ? `/register?callbackUrl=${encodeURIComponent(callbackUrl)}` : '/register'}
                  className="text-[#B88424] font-semibold hover:underline"
                >
                  إنشاء حساب جديد
                </Link>
              </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <LoginForm />
    </Suspense>
  )
}

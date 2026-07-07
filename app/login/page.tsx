'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      setSubmitted(true)
      console.log('Login submitted:', formData)
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">تسجيل الدخول</h1>
          <p className="text-lg text-slate-200">
            يجب تسجيل الدخول أولاً قبل طلب الخدمة
          </p>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-20">
        <div className="container-custom max-w-md">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-lg">
            {/* Lock Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-[#B88424] bg-opacity-15 flex items-center justify-center">
                <Lock className="w-10 h-10 text-[#B88424]" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-3xl font-bold text-[#133A63] mb-4 text-balance">
              تسجيل الدخول
            </h2>
            
            {/* Subtitle */}
            <p className="text-center text-slate-600 mb-8 text-sm leading-relaxed">
              يجب تسجيل الدخول أولاً قبل طلب الخدمة
            </p>

            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  تم تسجيل الدخول بنجاح!
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-right text-sm font-semibold text-[#133A63] mb-3">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all text-right"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2 text-right">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-right text-sm font-semibold text-[#133A63] mb-3">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="•••••••"
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all text-right"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-2 text-right">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#133A63] hover:bg-[#0A1F36] text-white font-bold py-3 rounded-2xl transition-colors duration-200 mt-8"
              >
                تسجيل الدخول
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-slate-600 mt-6 text-sm">
              ليس لديك حساب؟{' '}
              <Link
                href="/register"
                className="text-[#B88424] font-bold hover:underline"
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Lock, Mail, User, Phone } from 'lucide-react'

export default function ConsultationLoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const validateLoginForm = () => {
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

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = isLogin ? validateLoginForm() : validateRegisterForm()

    if (isValid) {
      // محاكاة حفظ البيانات في localStorage
      const userData = {
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem('consultationUser', JSON.stringify(userData))

      // الانتقال إلى صفحة الحجز
      router.push('/consultations/booking')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </h1>
          <p className="text-lg text-slate-200">
            {isLogin
              ? 'سجل دخولك لحجز استشارة متخصصة'
              : 'أنشئ حسابك الآن للبدء في حجز الاستشارات'}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container-custom max-w-2xl">
          <div className="card shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Form */}
              {isLogin ? (
                <>
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
                      placeholder="example@email.com"
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
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                    />
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#133A63] mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        الاسم الكامل
                      </div>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-[#133A63] mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        رقم الهاتف
                      </div>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01xxxxxxxxx"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

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
                      placeholder="example@email.com"
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
                      placeholder="أدخل كلمة مرور قوية"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                    />
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-[#133A63] mb-2">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="أعد إدخال كلمة المرور"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn-primary w-full py-3 text-lg font-semibold">
                {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
              </button>

              {/* Toggle Button */}
              <p className="text-center text-slate-600">
                {isLogin ? 'ليس لديك حساب؟ ' : 'هل لديك حساب؟ '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setFormData({
                      email: '',
                      password: '',
                      fullName: '',
                      phone: '',
                      confirmPassword: '',
                    })
                    setErrors({})
                  }}
                  className="text-[#B88424] font-semibold hover:underline"
                >
                  {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

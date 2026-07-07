'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { specializations } from '@/data/specializations'
import { useAuth } from '@/context/AuthContext'
import { Lock, User, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { register } = useAuth()
  const [callbackUrl, setCallbackUrl] = useState<string>('')
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    futureInterests: [] as string[],
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      futureInterests: prev.futureInterests.includes(interest)
        ? prev.futureInterests.filter((i) => i !== interest)
        : [...prev.futureInterests, interest],
    }))
  }

  const validateForm = () => {
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

    if (!formData.specialization) {
      newErrors.specialization = 'اختر تخصصاً'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // استدعاء دالة التسجيل من Auth Context
      register(formData)
      setSubmitted(true)
      console.log('تم التسجيل بنجاح:', formData)
      
      // إعادة التوجيه بعد 1.5 ثانية
      setTimeout(() => {
        if (callbackUrl) {
          router.push(callbackUrl)
        } else {
          router.push('/')
        }
      }, 1500)
    }
  }

  return (
    <>
      {/* Simple Modal Registration Form */}
      <div className="min-h-screen bg-gradient-to-br from-[#133A63] to-[#0A1F36] flex items-center justify-center px-4 py-8">
        <div className="card shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#133A63] text-center">إنشاء حساب جديد</h2>
            <p className="text-center text-slate-500 text-sm mt-2">انضم إلى مجتمعنا الآن</p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold text-center text-sm">
                تم التسجيل بنجاح! شكراً لانضمامك إلينا
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Phone Number */}
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
                  placeholder="أدخل رقم الهاتف (10 أرقام على الأقل)"
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
                    بريد Gmail
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

              {/* Specialization */}
              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-2">
                  التخصص
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
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
                  <p className="text-red-600 text-sm mt-1">
                    {errors.specialization}
                  </p>
                )}
              </div>

              {/* Future Interests */}
              <div>
                <label className="block text-sm font-semibold text-[#133A63] mb-3">
                  الاهتمامات المستقبلية (اختياري)
                </label>
                <div className="space-y-3">
                  {specializations.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-3 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.futureInterests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="w-5 h-5 rounded border-slate-300 text-[#B88424] focus:ring-[#B88424]"
                      />
                      <span className="text-slate-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg font-semibold"
              >
                التسجيل الآن
              </button>

              {/* Login Link */}
              <p className="text-center text-slate-600">
                هل لديك حساب بالفعل؟{' '}
                <Link
                  href={callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : '/login'}
                  className="text-[#B88424] font-semibold hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <RegisterForm />
    </Suspense>
  )
}

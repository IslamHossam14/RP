'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, ArrowLeft, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login, checkEmail } = useAuth()
  const [step, setStep] = useState<'email' | 'password' | 'create'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('البريد الإلكتروني غير صحيح')
        setLoading(false)
        return
      }

      // Check if email exists in backend
      const { exists } = await checkEmail(email)

      if (exists) {
        setStep('password')
      } else {
        setStep('create')
      }
    } catch (err) {
      setError('حدث خطأ عند التحقق من البريد الإلكتروني')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!password) {
        setError('كلمة المرور مطلوبة')
        setLoading(false)
        return
      }

      await login(email, password)
      
      // Redirect based on role - will be handled by useEffect in auth context
      // Check stored user role and redirect appropriately
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        if (user.role === 'super_admin') {
          router.push('/admin/super-admin')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.message || 'خطأ في تسجيل الدخول')
      setLoading(false)
    }
  }

  const handleCreateAccount = () => {
    // Redirect to register page with pre-filled email
    router.push(`/register?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#133A63] mb-4">
              <span className="text-2xl font-black text-white">RP</span>
            </div>
            <h1 className="text-3xl font-bold text-[#133A63] mb-2">Right Place</h1>
            <p className="text-slate-600">منصة التعليم المتقدمة</p>
          </div>

          {/* Card */}
          <div className="card shadow-lg border border-slate-200">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-semibold text-center">{error}</p>
              </div>
            )}

            {/* Email Step */}
            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#133A63] mb-2">
                    تسجيل الدخول
                  </h2>
                  <p className="text-slate-600 text-sm">
                    أدخل بريدك الإلكتروني للمتابعة
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#133A63] mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      البريد الإلكتروني
                    </div>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary font-bold disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">أم</span>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="w-full btn-outline py-3 text-lg font-semibold text-center"
                >
                  إنشاء حساب جديد
                </Link>
              </form>
            )}

            {/* Password Step */}
            {step === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#133A63] mb-2">
                    أدخل كلمة المرور
                  </h2>
                  <p className="text-slate-600 text-sm">
                    للبريد: <span className="font-semibold">{email}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#133A63] mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      كلمة المرور
                    </div>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                    placeholder="أدخل كلمة المرور"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('email')
                    setPassword('')
                    setError('')
                  }}
                  className="w-full text-center text-[#B88424] font-semibold hover:text-[#133A63] transition-colors"
                >
                  استخدم بريد إلكتروني مختلف
                </button>
              </form>
            )}

            {/* Create Account Step */}
            {step === 'create' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#133A63] mb-2">
                    البريد الإلكتروني جديد
                  </h2>
                  <p className="text-slate-600 text-sm mb-4">
                    لا يوجد حساب بهذا البريد الإلكتروني
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm font-semibold">
                    {email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="w-full btn-primary py-3 text-lg font-semibold"
                >
                  إنشاء حساب جديد
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('email')
                    setEmail('')
                    setError('')
                  }}
                  className="w-full text-center text-[#B88424] font-semibold hover:text-[#133A63] transition-colors"
                >
                  استخدم بريد إلكتروني مختلف
                </button>
              </div>
            )}
          </div>

          {/* Footer Text */}
          <p className="text-center text-slate-600 text-sm mt-6">
            بالتسجيل، أنت توافق على{' '}
            <Link href="#" className="text-[#B88424] font-semibold hover:underline">
              شروط الاستخدام
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import { BookOpen, Award, FileText, BarChart3, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, logout } = useAuth()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B88424] animate-pulse mb-4"></div>
          <p className="text-[#133A63] font-semibold">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-20">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                مرحباً {user.name}
              </h1>
              <p className="text-lg text-slate-200">
                أهلاً بك في لوحة التحكم الخاصة بك
              </p>
            </div>
            <div className="text-right hidden md:block">
              <div className="inline-block bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <p className="text-sm text-slate-300 mb-2">البريد الإلكتروني</p>
                <p className="font-bold text-lg">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: 'الدورات المسجلة',
                value: '3',
                icon: BookOpen,
                color: 'blue',
              },
              {
                label: 'الشهادات المحصول عليها',
                value: '1',
                icon: Award,
                color: 'green',
              },
              {
                label: 'التقدم الإجمالي',
                value: '65%',
                icon: BarChart3,
                color: 'purple',
              },
              {
                label: 'المدفوعات',
                value: '2 مكتملة',
                icon: FileText,
                color: 'gold',
              },
            ].map((stat, index) => {
              const Icon = stat.icon
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600',
                gold: 'bg-yellow-100 text-yellow-600',
              }
              return (
                <div key={index} className="card">
                  <div className={`w-12 h-12 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-[#475569] text-sm font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-[#133A63]">
                    {stat.value}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#133A63] mb-8">الإجراءات السريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'استكشف الدورات',
                description: 'تصفح جميع الدورات المتاحة والالتحق بما يناسبك',
                href: '/courses',
                color: 'bg-blue-50 border-blue-200',
              },
              {
                title: 'طلب استشارة',
                description: 'احجز موعداً مع متخصصينا للاستشارة المجانية',
                href: '/consultations',
                color: 'bg-green-50 border-green-200',
              },
              {
                title: 'شهاداتي',
                description: 'اعرض جميع الشهادات التي حصلت عليها',
                href: '#',
                color: 'bg-purple-50 border-purple-200',
              },
            ].map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`card border ${action.color} hover:shadow-lg transition-all`}
              >
                <h3 className="text-xl font-bold text-[#133A63] mb-3">
                  {action.title}
                </h3>
                <p className="text-[#475569] text-sm mb-4">
                  {action.description}
                </p>
                <span className="text-[#B88424] font-semibold text-sm hover:gap-2">
                  ابدأ الآن ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* User Info Card */}
      <section className="py-16">
        <div className="container-custom">
          <div className="card border border-slate-200">
            <div className="flex items-center justify-between flex-col md:flex-row gap-6">
              <div>
                <h3 className="text-2xl font-bold text-[#133A63] mb-3">
                  معلومات الحساب
                </h3>
                <div className="space-y-2 text-[#475569]">
                  <p>
                    <span className="font-semibold">الاسم:</span> {user.name}
                  </p>
                  <p>
                    <span className="font-semibold">البريد الإلكتروني:</span>{' '}
                    {user.email}
                  </p>
                  <p>
                    <span className="font-semibold">الحالة:</span>{' '}
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      نشط
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2 md:self-end"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

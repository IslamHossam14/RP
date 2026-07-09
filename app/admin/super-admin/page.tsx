'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/DashboardSidebar'
import StatCard from '@/components/StatCard'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import { BarChart3, Users, BookOpen, Award, CreditCard, FileText, Lock, TrendingUp, AlertCircle } from 'lucide-react'
import { mockUsers } from '@/data/mock-users'
import { mockPayments } from '@/data/mock-payments'
import { mockRegistrations } from '@/data/mock-registrations'
import { courses } from '@/data/courses'

export default function SuperAdminDashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // Redirect if not super admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'super_admin')) {
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

  if (!user || user.role !== 'super_admin') {
    return null
  }
  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter(u => u.status === 'active').length
  const totalPayments = mockPayments.reduce((sum, p) => sum + p.amount, 0)
  const completedPayments = mockPayments.filter(p => p.status === 'completed').length
  const totalCourses = courses.length
  const pendingRegistrations = mockRegistrations.filter(r => r.status === 'pending').length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex">
        <DashboardSidebar userRole="super_admin" />
        
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#B88424] to-[#D4A373] flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-[#133A63]">
                  لوحة تحكم السوبر أدمن
                </h1>
                <p className="text-[#475569] font-semibold mt-1">
                  مرحباً بك يا {user.name}، لديك حق الوصول الكامل
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="إجمالي المستخدمين"
              value={totalUsers}
              icon={Users}
              color="blue"
              trend="+12%"
            />
            <StatCard
              label="المستخدمين النشطين"
              value={activeUsers}
              icon={Users}
              color="green"
              trend="+8%"
            />
            <StatCard
              label="الدورات المتاحة"
              value={totalCourses}
              icon={BookOpen}
              color="purple"
              trend="+3%"
            />
            <StatCard
              label="إجمالي الإيرادات"
              value={`${totalPayments} ريال`}
              icon={TrendingUp}
              color="gold"
              trend="+25%"
            />
          </div>

          {/* Second Row Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              label="المدفوعات المكتملة"
              value={completedPayments}
              icon={CreditCard}
              color="green"
            />
            <StatCard
              label="التسجيلات المعلقة"
              value={pendingRegistrations}
              icon={AlertCircle}
              color="orange"
            />
            <StatCard
              label="مديري الأكاديمية"
              value={mockUsers.filter(u => u.role === 'admin').length}
              icon={Lock}
              color="blue"
            />
            <StatCard
              label="إجمالي المدفوعات"
              value={mockPayments.length}
              icon={BarChart3}
              color="green"
            />
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Users */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#133A63] flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#B88424]" />
                  أحدث المستخدمين
                </h2>
                <a href="#" className="text-[#B88424] font-semibold text-sm hover:underline">
                  عرض الكل
                </a>
              </div>
              <div className="space-y-4">
                {mockUsers.slice(0, 5).map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="font-semibold text-[#133A63]">{u.name}</p>
                      <p className="text-sm text-slate-600">{u.email}</p>
                    </div>
                    <span className="badge badge-info text-xs">
                      {u.role === 'student' && 'طالب'}
                      {u.role === 'instructor' && 'مدرب'}
                      {u.role === 'admin' && 'مدير'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Payments */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#133A63] flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#B88424]" />
                  آخر المدفوعات
                </h2>
                <a href="#" className="text-[#B88424] font-semibold text-sm hover:underline">
                  عرض الكل
                </a>
              </div>
              <div className="space-y-4">
                {mockPayments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="font-semibold text-[#133A63]">{payment.userName}</p>
                      <p className="text-sm text-slate-600">{payment.paymentDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#B88424]">{payment.amount} ريال</p>
                      <span className={`badge text-xs ${
                        payment.status === 'completed'
                          ? 'badge-success'
                          : payment.status === 'pending'
                          ? 'badge-warning'
                          : 'badge-danger'
                      }`}>
                        {payment.status === 'completed' && 'مكتمل'}
                        {payment.status === 'pending' && 'معلق'}
                        {payment.status === 'failed' && 'فشل'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* All Registrations */}
            <div className="dashboard-card">
              <h2 className="text-2xl font-bold text-[#133A63] mb-6">التسجيلات الكاملة</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="table-header">
                    <tr>
                      <th>المستخدم</th>
                      <th>الدورة</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRegistrations.slice(0, 6).map((reg) => (
                      <tr key={reg.id}>
                        <td className="table-body font-semibold">{reg.userName}</td>
                        <td className="table-body text-xs">{reg.courseTitle}</td>
                        <td className="table-body">
                          <span className={`badge text-xs ${
                            reg.status === 'approved'
                              ? 'badge-success'
                              : reg.status === 'pending'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}>
                            {reg.status === 'approved' && 'معتمد'}
                            {reg.status === 'pending' && 'معلق'}
                            {reg.status === 'rejected' && 'مرفوض'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Courses Overview */}
            <div className="dashboard-card">
              <h2 className="text-2xl font-bold text-[#133A63] mb-6">الدورات المتاحة</h2>
              <div className="space-y-3">
                {courses.slice(0, 6).map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="font-semibold text-[#133A63] text-sm">{course.title}</p>
                      <p className="text-xs text-slate-600">{course.category}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-bold text-[#B88424]">{course.price} ريال</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Alert */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">تنبيه أمان</h3>
              <p className="text-sm text-blue-800">
                أنت موصول كمسؤول سوبر، لديك وصول كامل إلى جميع بيانات النظام. تأكد من سلامة حسابك.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

'use client'

import DashboardSidebar from '@/components/DashboardSidebar'
import StatCard from '@/components/StatCard'
import Navbar from '@/components/Navbar'
import { BarChart3, Users, BookOpen, Award, CreditCard, FileText } from 'lucide-react'
import { mockUsers } from '@/data/mock-users'
import { mockPayments } from '@/data/mock-payments'
import { mockRegistrations } from '@/data/mock-registrations'
import { courses } from '@/data/courses'

export default function SuperAdminDashboard() {
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
        <DashboardSidebar userRole="super-admin" />
        
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[#133A63] mb-2">
              لوحة التحكم
            </h1>
            <p className="text-[#475569] font-semibold">
              مرحباً بك في لوحة التحكم الرئيسية للمدير العام
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <StatCard
              label="إجمالي المستخدمين"
              value={totalUsers}
              icon={Users}
              color="blue"
            />
            <StatCard
              label="المستخدمين النشطين"
              value={activeUsers}
              icon={Users}
              color="green"
            />
            <StatCard
              label="إجمالي الكورسات"
              value={totalCourses}
              icon={BookOpen}
              color="blue"
            />
            <StatCard
              label="عمليات الدفع المكتملة"
              value={completedPayments}
              icon={CreditCard}
              color="gold"
            />
            <StatCard
              label="إجمالي الإيرادات"
              value={`${totalPayments.toLocaleString('ar-SA')} ر.س`}
              icon={CreditCard}
              color="gold"
            />
            <StatCard
              label="التسجيلات المعلقة"
              value={pendingRegistrations}
              icon={FileText}
              color="red"
            />
          </div>

          {/* Recent Payments */}
          <div className="dashboard-card mb-8">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              آخر عمليات الدفع
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th>المستخدم</th>
                    <th>البريد الإلكتروني</th>
                    <th>المبلغ</th>
                    <th>الدورة</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayments.slice(0, 5).map((payment) => (
                    <tr key={payment.id}>
                      <td className="table-body font-semibold text-[#133A63]">
                        {payment.userName}
                      </td>
                      <td className="table-body">{payment.userEmail}</td>
                      <td className="table-body font-bold text-[#B88424]">
                        {payment.amount.toLocaleString('ar-SA')} ر.س
                      </td>
                      <td className="table-body">{payment.courseTitle}</td>
                      <td className="table-body">{payment.paymentDate}</td>
                      <td className="table-body">
                        <span
                          className={`badge ${
                            payment.status === 'completed'
                              ? 'badge-success'
                              : 'badge-warning'
                          }`}
                        >
                          {payment.status === 'completed' ? 'مكتمل' : 'معلق'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Registrations */}
          <div className="dashboard-card">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              التسجيلات المعلقة
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th>المستخدم</th>
                    <th>البريد الإلكتروني</th>
                    <th>رقم الجوال</th>
                    <th>التخصص</th>
                    <th>التاريخ</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRegistrations
                    .filter(r => r.status === 'pending')
                    .map((reg) => (
                      <tr key={reg.id}>
                        <td className="table-body font-semibold text-[#133A63]">
                          {reg.userName}
                        </td>
                        <td className="table-body">{reg.email}</td>
                        <td className="table-body">{reg.phone}</td>
                        <td className="table-body">{reg.specialization}</td>
                        <td className="table-body">{reg.registrationDate}</td>
                        <td className="table-body">
                          <button className="btn-primary text-xs py-1 px-3">
                            الموافقة
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

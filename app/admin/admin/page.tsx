'use client'

import DashboardSidebar from '@/components/DashboardSidebar'
import StatCard from '@/components/StatCard'
import Navbar from '@/components/Navbar'
import { BarChart3, Users, BookOpen, Award, FileText } from 'lucide-react'
import { mockUsers } from '@/data/mock-users'
import { mockRegistrations } from '@/data/mock-registrations'
import { courses } from '@/data/courses'

export default function AdminDashboard() {
  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter(u => u.status === 'active').length
  const totalCourses = courses.length
  const pendingRegistrations = mockRegistrations.filter(r => r.status === 'pending').length
  const approvedRegistrations = mockRegistrations.filter(r => r.status === 'approved').length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex">
        <DashboardSidebar userRole="admin" />
        
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[#133A63] mb-2">
              لوحة التحكم
            </h1>
            <p className="text-[#475569] font-semibold">
              مرحباً بك في لوحة التحكم الإدارية
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
              label="التسجيلات المعتمدة"
              value={approvedRegistrations}
              icon={FileText}
              color="green"
            />
            <StatCard
              label="التسجيلات المعلقة"
              value={pendingRegistrations}
              icon={FileText}
              color="red"
            />
          </div>

          {/* Users Overview */}
          <div className="dashboard-card mb-8">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              المستخدمين
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th>الاسم</th>
                    <th>البريد الإلكتروني</th>
                    <th>الدور</th>
                    <th>التخصص</th>
                    <th>تاريخ التسجيل</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.slice(0, 5).map((user) => (
                    <tr key={user.id}>
                      <td className="table-body font-semibold text-[#133A63]">
                        {user.name}
                      </td>
                      <td className="table-body">{user.email}</td>
                      <td className="table-body">
                        <span className="badge badge-info">
                          {user.role === 'student' && 'طالب'}
                          {user.role === 'instructor' && 'مدرب'}
                          {user.role === 'admin' && 'مدير'}
                        </span>
                      </td>
                      <td className="table-body text-sm">{user.specialization}</td>
                      <td className="table-body">{user.registrationDate}</td>
                      <td className="table-body">
                        <span
                          className={`badge ${
                            user.status === 'active'
                              ? 'badge-success'
                              : 'badge-warning'
                          }`}
                        >
                          {user.status === 'active' ? 'نشط' : 'معلق'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Registrations Overview */}
          <div className="dashboard-card">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              التسجيلات الأخيرة
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th>المستخدم</th>
                    <th>البريد الإلكتروني</th>
                    <th>التخصص</th>
                    <th>الدورة</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRegistrations.map((reg) => (
                    <tr key={reg.id}>
                      <td className="table-body font-semibold text-[#133A63]">
                        {reg.userName}
                      </td>
                      <td className="table-body">{reg.email}</td>
                      <td className="table-body text-sm">{reg.specialization}</td>
                      <td className="table-body text-sm">{reg.courseTitle}</td>
                      <td className="table-body">{reg.registrationDate}</td>
                      <td className="table-body">
                        <span
                          className={`badge ${
                            reg.status === 'approved'
                              ? 'badge-success'
                              : reg.status === 'pending'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
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
        </main>
      </div>
    </div>
  )
}

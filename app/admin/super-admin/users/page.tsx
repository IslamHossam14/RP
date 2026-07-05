'use client'

import DashboardSidebar from '@/components/DashboardSidebar'
import StatCard from '@/components/StatCard'
import Navbar from '@/components/Navbar'
import { Users, Trash2, Edit2, Plus } from 'lucide-react'
import { mockUsers } from '@/data/mock-users'
import { useState } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [showForm, setShowForm] = useState(false)

  const studentCount = users.filter(u => u.role === 'student').length
  const instructorCount = users.filter(u => u.role === 'instructor').length
  const activeCount = users.filter(u => u.status === 'active').length

  const handleDeleteUser = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المستخدم؟')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex">
        <DashboardSidebar userRole="super-admin" />
        
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#133A63] mb-2">
                إدارة المستخدمين
              </h1>
              <p className="text-[#475569] font-semibold">
                عرض وإدارة جميع مستخدمي النظام
              </p>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              مستخدم جديد
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              label="إجمالي المستخدمين"
              value={users.length}
              icon={Users}
              color="blue"
            />
            <StatCard
              label="الطلاب"
              value={studentCount}
              icon={Users}
              color="blue"
            />
            <StatCard
              label="المدربون"
              value={instructorCount}
              icon={Users}
              color="gold"
            />
            <StatCard
              label="المستخدمين النشطين"
              value={activeCount}
              icon={Users}
              color="green"
            />
          </div>

          {/* Users Table */}
          <div className="dashboard-card">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              قائمة المستخدمين
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th>الاسم</th>
                    <th>البريد الإلكتروني</th>
                    <th>رقم الجوال</th>
                    <th>الدور</th>
                    <th>التخصص</th>
                    <th>تاريخ التسجيل</th>
                    <th>الحالة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="table-body font-semibold text-[#133A63]">
                        {user.name}
                      </td>
                      <td className="table-body">{user.email}</td>
                      <td className="table-body">{user.phone}</td>
                      <td className="table-body">
                        <span className="badge badge-info">
                          {user.role === 'student' && 'طالب'}
                          {user.role === 'instructor' && 'مدرب'}
                          {user.role === 'admin' && 'مدير'}
                          {user.role === 'super-admin' && 'مدير عام'}
                        </span>
                      </td>
                      <td className="table-body text-sm">{user.specialization}</td>
                      <td className="table-body">{user.registrationDate}</td>
                      <td className="table-body">
                        <span
                          className={`badge ${
                            user.status === 'active'
                              ? 'badge-success'
                              : user.status === 'pending'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
                          {user.status === 'active' && 'نشط'}
                          {user.status === 'pending' && 'معلق'}
                          {user.status === 'inactive' && 'غير نشط'}
                        </span>
                      </td>
                      <td className="table-body">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-[#133A63] hover:bg-[#E0E7FF] rounded-lg transition">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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

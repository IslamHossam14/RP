'use client'

import DashboardSidebar from '@/components/DashboardSidebar'
import StatCard from '@/components/StatCard'
import Navbar from '@/components/Navbar'
import { BookOpen, Users, Award, TrendingUp, Plus } from 'lucide-react'
import { courses } from '@/data/courses'
import Link from 'next/link'

export default function InstructorDashboard() {
  // Mock data for instructor
  const instructorCourses = courses.filter(c => c.id % 2 === 0).slice(0, 3)
  const totalStudents = instructorCourses.length * 15
  const totalEnrolled = instructorCourses.reduce((sum) => sum + 45, 0)
  const averageRating = 4.8

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex">
        <DashboardSidebar userRole="instructor" />
        
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#133A63] mb-2">
                لوحة المدرب
              </h1>
              <p className="text-[#475569] font-semibold">
                إدارة كورساتك ودبلوماتك
              </p>
            </div>
            <Link 
              href="/admin/instructor/upload-course"
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              رفع كورس جديد
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              label="عدد الكورسات"
              value={instructorCourses.length}
              icon={BookOpen}
              color="blue"
            />
            <StatCard
              label="عدد الطلاب"
              value={totalStudents}
              icon={Users}
              color="green"
            />
            <StatCard
              label="إجمالي المسجلين"
              value={totalEnrolled}
              icon={TrendingUp}
              color="gold"
            />
            <StatCard
              label="متوسط التقييم"
              value={averageRating}
              icon={Award}
              color="gold"
            />
          </div>

          {/* My Courses */}
          <div className="dashboard-card mb-8">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              كورساتي
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorCourses.map((course) => (
                <div key={course.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <span className="badge badge-info text-xs">
                      {course.category === 'diploma' ? 'دبلوم' : 'كورس'}
                    </span>
                    <span className="text-sm font-bold text-[#B88424]">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#133A63] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-[#475569] text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                    <div>
                      <p className="text-xs text-[#475569]">المسجلين</p>
                      <p className="text-xl font-bold text-[#133A63]">45</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#475569]">التقييم</p>
                      <p className="text-xl font-bold text-[#B88424]">4.8/5</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-outline flex-1 text-sm py-2 px-3">
                      تعديل
                    </button>
                    <button className="btn-secondary flex-1 text-sm py-2 px-3">
                      عرض الطلاب
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div className="dashboard-card">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              أداء الكورسات
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th>اسم الكورس</th>
                    <th>المسجلين</th>
                    <th>اكملوا الكورس</th>
                    <th>التقييم</th>
                    <th>تاريخ الإنشاء</th>
                  </tr>
                </thead>
                <tbody>
                  {instructorCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="table-body font-semibold text-[#133A63]">
                        {course.title}
                      </td>
                      <td className="table-body">45</td>
                      <td className="table-body">38</td>
                      <td className="table-body">
                        <span className="badge badge-success">4.8/5</span>
                      </td>
                      <td className="table-body">2024-01-15</td>
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

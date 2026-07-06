'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CourseCard from '@/components/CourseCard'
import { courses } from '@/data/courses'

export default function CoursesPage() {
  const diplomas = courses.filter((c) => c.category === 'diploma')
  const regularCourses = courses.filter((c) => c.category === 'course')

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الدورات والدبلومات</h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            اكتشف مجموعة واسعة من الدورات والدبلومات المتخصصة المصممة لرفع مهاراتك
          </p>
        </div>
      </section>

      {/* Diplomas Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">الدبلومات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {diplomas.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">الكورسات المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-[#133A63] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">كيفية الاختيار؟</h2>
            <div className="space-y-6">
              <div className="text-right">
                <h3 className="text-xl font-bold mb-2 text-[#B88424]">الدبلومات</h3>
                <p className="text-slate-300">
                  برامج متكاملة ومكثفة تغطي تخصصاً كاملاً وتمنح شهادة معتمدة بعد الانتهاء
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold mb-2 text-[#B88424]">الكورسات</h3>
                <p className="text-slate-300">
                  دورات قصيرة متخصصة تركز على مهارات محددة وتناسب الأشخاص ذوي الأوقات المحدودة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

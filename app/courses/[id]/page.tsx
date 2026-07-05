'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { courses } from '@/data/courses'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle, Users, BarChart3, Clock, Lock } from 'lucide-react'
import Link from 'next/link'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const course = courses.find((c) => c.id === params.id)
  const [purchased, setPurchased] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-[#133A63] mb-4">الدورة غير موجودة</h1>
          <Link href="/courses" className="btn-primary">
            العودة إلى الدورات
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handlePayment = () => {
    if (!isLoggedIn) {
      router.push('/register')
      return
    }
    // محاكاة عملية الدفع
    setPurchased(true)
  }

  const categoryLabel = course.category === 'diploma' ? 'دبلوم' : 'كورس'

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Video Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-12">
        <div className="container-custom">
          <div className="mb-6">
            <span className="text-xs font-bold px-4 py-2 rounded-full bg-[#B88424] text-white shadow-lg">
              {categoryLabel}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">{course.title}</h1>

          {/* Video Player */}
          <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl mb-8">
            <div className="relative pb-[56.25%]">
              {purchased ? (
                <video
                  className="absolute inset-0 w-full h-full"
                  controls
                  poster="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                  <div className="text-center">
                    <Lock className="w-16 h-16 text-[#B88424] mx-auto mb-4" />
                    <p className="text-white text-xl font-bold mb-4">الفيديو مُقفل</p>
                    <p className="text-slate-300 mb-6">يجب عليك شراء الكورس للوصول إلى الفيديو</p>
                    <button
                      onClick={handlePayment}
                      className="btn-primary"
                    >
                      تابع عملية الدفع لفتح الفيديو
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course Meta Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: 'المدة', value: course.duration },
              { icon: BarChart3, label: 'المستوى', value: course.level },
              { icon: Users, label: 'الطلاب', value: '245 طالب' },
              { icon: CheckCircle, label: 'شهادة معتمدة', value: 'نعم' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-20"
                >
                  <Icon className="w-6 h-6 mb-2 text-[#B88424]" />
                  <p className="text-xs text-slate-800 opacity-80 mb-1">{item.label}</p>
                  <p className="font-semibold text-lg">{item.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="card mb-8">
              <h2 className="text-3xl font-bold text-[#133A63] mb-4">وصف الدورة</h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">{course.description}</p>
              <p className="text-slate-600 leading-relaxed text-base">
                هذه الدورة شاملة وتم تصميمها لإعطاؤك المهارات والمعرفة اللازمة لتحقيق النجاح في مجالك. ستتعلم
                من محترفين لديهم سنوات من الخبرة العملية.
              </p>
            </div>

            {/* Course Content */}
            <div className="card mb-8">
              <h2 className="text-3xl font-bold text-[#133A63] mb-6">محتوى الدورة</h2>
              <div className="space-y-4">
                {course.content.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#B88424] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#133A63] text-lg mb-1">{item}</h3>
                      <p className="text-slate-600 text-sm">محتوى تفصيلي عن هذا الموضوع</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="card">
              <h2 className="text-3xl font-bold text-[#133A63] mb-6">المتطلبات</h2>
              <ul className="space-y-3">
                {[
                  'لا توجد متطلبات سابقة - مناسبة للمبتدئين والمتقدمين',
                  'جهاز كمبيوتر أو جهاز لوحي متصل بالإنترنت',
                  'رغبة قوية للتعلم والتطور',
                  'القدرة على تخصيص 5-10 ساعات أسبوعياً للدراسة',
                ].map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#B88424] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-28 shadow-xl">
              {purchased ? (
                <>
                  <div className="text-center mb-6 p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-bold text-green-700 text-lg mb-2">تم الدفع بنجاح!</h3>
                    <p className="text-green-600 text-sm">يمكنك الآن الوصول إلى جميع محتويات الدورة</p>
                  </div>
                  <button className="w-full btn-primary mb-4">
                    ابدأ التعلم الآن
                  </button>
                  <button className="w-full btn-outline">
                    شاهد الجدول الزمني
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-6 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                    <Lock className="w-6 h-6 text-[#133A63] mx-auto mb-3" />
                    <p className="text-center text-sm text-[#133A63] font-semibold">
                      يجب إكمال عملية الدفع للوصول إلى المحتوى الكامل
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-2">السعر</p>
                    <p className="text-4xl font-black text-[#133A63] mb-1">
                      {course.price.toLocaleString('ar-SA')}
                      <span className="text-base text-slate-600 font-semibold mr-2">جنية</span>
                    </p>
                    <p className="text-sm text-slate-500">سعر شامل بدون رسوم إضافية</p>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full btn-primary mb-4"
                  >
                    تابع عملية الدفع
                  </button>

                  <div className="space-y-3 pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#B88424]" />
                      <span className="text-slate-700">شهادة معتمدة عند الانتهاء</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#B88424]" />
                      <span className="text-slate-700">دعم من المدرسين</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#B88424]" />
                      <span className="text-slate-700">محتوى مدى الحياة</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#B88424]" />
                      <span className="text-slate-700">ضمان استرجاع المال</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Instructor Info */}
            <div className="card mt-6">
              <h3 className="font-bold text-[#133A63] mb-4 text-lg">المدرس</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B88424] to-[#133A63] flex items-center justify-center text-white font-bold text-2xl">
                  أ
                </div>
                <div>
                  <h4 className="font-bold text-[#133A63]">أحمد محمد</h4>
                  <p className="text-sm text-slate-600">خبير متخصص - 15 سنة خبرة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

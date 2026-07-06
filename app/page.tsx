'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CourseCard from '@/components/CourseCard'
import { courses } from '@/data/courses'
import Link from 'next/link'
import {
  BookOpen,
  Award,
  Users,
  Zap,
  ArrowLeft,
} from 'lucide-react'

export default function Home() {
  const featuredCourses = courses.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen md:h-[700px] flex items-center justify-center overflow-hidden bg-[#133A63] ">
        {/* Ambient decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B88424] rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B88424] rounded-full opacity-5 blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container-custom relative z-10 text-center text-white py-16 md:py-32">
          <h1 className="text-5xl md:text-7xl text-white font-black mb-8 text-balance leading-tight tracking-tight">
            Right Place
          </h1>
          <p className="text-lg md:text-2xl text-white mb-12 max-w-4xl mx-auto text-balance leading-relaxed font-medium opacity-95">
            منصة تعليمية متكاملة توفر برامج تدريبية احترافية ودورات متخصصة معتمده
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/courses" className="btn-secondary">
              استكشف الدورات
            </Link>
            <Link href="/register" className="btn-outline text-white border-white hover:bg-white hover:text-[#133A63]">
              ابدأ الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title font-bold ">لماذا Right Place ؟</h2>
            <p className="text-xl text-[#133A63] font-semibold max-w-2xl mx-auto">نحن نوفر أفضل الخدمات التعليمية والاستشارية لتحقيق أحلامك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'برامج متنوعة',
                description: 'دورات ودبلومات في تخصصات متعددة',
              },
              {
                icon: Award,
                title: 'شهادات معتمدة',
                description: 'شهادات مهنية معترف بها عالمياً',
              },
              {
                icon: Users,
                title: 'معلمون متميزون',
                description: 'فريق تدريسي من ذوي الخبرة',
              },
              {
                icon: Zap,
                title: 'محتوى حديث',
                description: 'مناهج معاصرة ومحدثة باستمرار',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card text-center group">
                  <div className="feature-icon mx-auto mb-5 group-hover:shadow-xl group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-[#133A63] group-hover:text-[#B88424] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">أقسام التدريب المهني</h2>
            <p className="text-xl text-[#133A63] font-semibold max-w-2xl mx-auto">برامج متخصصة ومعتمدة لتطوير مهاراتك المهنية</p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
            {[
              { title: 'البكالوريوس', duration: '4 سنوات', icon: Award },
              { title: 'الدبلومة', duration: '2 سنة', icon: Award },
              { title: 'الماجستير', duration: 'سنتان', icon: Award },
              { title: 'الدكتوراه', duration: '3 سنوات', icon: Award },
            ].map((program, index) => (
              <div key={index} className="card group border-2 border-transparent hover:border-[#B88424]">
                <div className="w-14 h-14 rounded-xl bg-[#B88424] flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:scale-110 transition-all">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#133A63] mb-2 group-hover:text-[#B88424] transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{program.duration}</p>
                <Link href="/training" className="inline-flex items-center gap-2 text-[#B88424] font-semibold text-sm hover:gap-3 transition-all group-hover:translate-x-1">
                  اعرف المزيد
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div>
              <h2 className="section-title mb-2">الدورات المتميزة</h2>
              <p className="text-xl text-[#133A63] font-semibold mt-4">اختر من أفضل الدورات المتخصصة لتطوير مهاراتك</p>
            </div>
            <Link href="/courses" className="btn-secondary hidden md:inline-flex">
              عرض جميع الدورات
            </Link>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 ">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link href="/courses" className="btn-secondary">
              عرض جميع الدورات
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#133A63] text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">خدماتنا الإضافية</h2>
            <p className="text-xl text-white font-semibold">خدمات متكاملة لدعم رحلتك التعليمية</p>
          </div>

          <div className="rt grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'الاستشارات المتخصصة',
                description: 'استشارات نفسية وقانونية من متخصصين معتمدين',
                href: '/consultations',
              },
              {
                title: 'استوديو الإنتاج',
                description: 'تصوير محتوى، بودكاست، وتسجيل صوتي ومرئي ',
                href: '/studio',
              },
              {
                title: 'المؤتمرات والفعاليات',
                description: 'تنظيم مؤتمرات و حفلات تعليمية متميزة',
                href: '/events',
              },
            ].map((service, index) => (
                <div key={index} className="bg-white bg-opacity-10 rounded-2xl p-8 hover:bg-opacity-20 transition-all border border-white border-opacity-20 hover:border-[#B88424] hover:border-opacity-50 group flex flex-col justify-between min-h-[200px]">
                  <h3 className="text-2xl font-bold mb-4 text-slate-700  transition-colors">{service.title}</h3>
                  <p className="text-slate-700 text-base leading-relaxed font-medium mb-5">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="text-[#133A63] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all group-hover:translate-x-2 group-hover:text-[#B88424] mt-auto"
                  >
                    تعرف أكثر
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#133A63] mb-6">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="text-xl text-[#133A63] font-semibold mb-12 max-w-3xl mx-auto leading-relaxed">
            انضم إلى آلاف الطلاب الذين غيّروا مسارهم المهني من خلال برامجنا التعليمية والمتميزة
          </p>
          <Link href="/register" className="btn-primary text-lg py-4 px-10 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl">
            تسجيل جديد
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

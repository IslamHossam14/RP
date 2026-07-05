'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Video,
  Mic2,
  Music,
  Film,
  Radio,
  MonitorPlay,
  Grid3x3,
} from 'lucide-react'

export default function StudioPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handlePackageSelect = () => {
    if (!isLoggedIn) {
      router.push('/register')
      return
    }
    // سيتم التحويل لبوابة الدفع لاحقاً
    alert('سيتم التحويل لبوابة الدفع')
  }

  const services = [
    {
      icon: Film,
      title: 'تصوير المحتوى',
      description: 'تصوير احترافي للمحتوى التعليمي والإعلاني بأحدث المعدات',
      features: [
        'كاميرات احترافية 4K',
        'إضاءة متقدمة',
        'مونتاج احترافي',
        'مؤثرات بصرية',
      ],
    },
    {
      icon: Mic2,
      title: 'التسجيل الصوتي',
      description: 'تسجيل صوتي عالي الجودة مع معدات احترافية متخصصة',
      features: [
        'ميكروفونات احترافية',
        'كبينة عزل صوت',
        'معالجة صوتية متقدمة',
        'سماعات مراقبة',
      ],
    },
    {
      icon: Radio,
      title: 'البودكاست',
      description: 'إنتاج كامل للبودكاست من التسجيل إلى النشر',
      features: [
        'استوديو متخصص',
        'معدات احترافية',
        'خدمات التحرير',
        'توزيع على المنصات',
      ],
    },
    {
      icon: MonitorPlay,
      title: 'الحفلات والمسرح',
      description: 'إضاءة واحترافية للحفلات والعروض المسرحية',
      features: [
        'حلول إضاءة متقدمة',
        'أنظمة صوت احترافية',
        'تصوير مباشر',
        'معدات عرض حديثة',
      ],
    },
    {
      icon: Video,
      title: 'المحتوى المرئي',
      description: 'إنتاج فيديوهات عالية الجودة بمختلف الأنواع',
      features: [
        'فيديوهات ترويجية',
        'فيديوهات تعليمية',
        'شرح الرسوم',
        'تصوير حفلات',
      ],
    },
    {
      icon: Music,
      title: 'الموسيقى والمؤثرات',
      description: 'إنتاج وتحرير موسيقي مع مكتبة ضخمة من المؤثرات',
      features: [
        'مكتبة موسيقية ضخمة',
        'إنتاج موسيقي',
        'مؤثرات صوتية',
        'ترتيب موسيقي',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">استوديو الإنتاج</h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            استوديو متكامل لإنتاج محتوى احترافي بأعلى معايير الجودة العالمية
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">خدماتنا</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="card hover:shadow-lg transition-shadow">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#133A63] to-[#0A1F36] w-fit mb-4">
                    <Icon className="w-6 h-6 text-[#B88424]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#133A63] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 pb-4 border-b border-slate-200">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B88424] mt-1.5 flex-shrink-0"></div>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <Link href="/studio/request-service" className="block text-center text-[#B88424] font-semibold text-sm hover:text-[#133A63] transition-colors bg-blue-50 rounded-lg py-2">
                      اطلب الخدمة
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">المعدات والتقنيات</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#133A63] mb-4">
                معدات التصوير
              </h3>
              {[
                'كاميرات 4K احترافية (Sony, Canon)',
                'عدسات متنوعة (Prime و Zoom)',
                'أنظمة جيمبال وStabilization',
                'معدات إضاءة LED متقدمة',
                'Reflectors والـ Diffusers',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B88424] mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#133A63] mb-4">
                معدات الصوت
              </h3>
              {[
                'ميكروفونات احترافية (Neumann, Sennheiser)',
                'معدات خلط صوت متقدمة',
                'كابينات عزل صوت معزولة',
                'سماعات مراقبة احترافية',
                'معالجات صوتية رقمية',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B88424] mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">أعمالنا السابقة</h2>

          {/* Portfolio Items by Service */}
          {services.map((service, serviceIndex) => {
            const Icon = service.icon
            const serviceWorks = [
              {
                title: `مثال من ${service.title}`,
                type: service.title,
                thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
              },
              {
                title: `مشروع آخر - ${service.title}`,
                type: service.title,
                thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
              },
              {
                title: `عمل حديث - ${service.title}`,
                type: service.title,
                thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
              },
            ]

            return (
              <div key={serviceIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-7 h-7 text-[#B88424]" />
                  <h3 className="text-2xl font-bold text-[#133A63]">
                    {service.title}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                  {serviceWorks.map((work, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                    >
                      <img
                        src={work.thumbnail}
                        alt={work.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <p className="text-xs font-semibold text-[#B88424] mb-1">{work.type}</p>
                          <p className="font-bold text-sm">{work.title}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40">
                        <Video className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          <div className="text-center">
            <Link href="/studio/portfolio" className="btn-secondary">
              عرض المزيد من الأعمال
              <Grid3x3 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">باقات الأسعار</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'الباقة الأساسية',
                price: '2000',
                description: 'مشروع بسيط',
                services: [
                  'تصوير لمدة 4 ساعات',
                  'مونتاج بسيط',
                  'نسخة نهائية واحدة',
                ],
              },
              {
                name: 'الباقة المتقدمة',
                price: '5000',
                description: 'مشروع متوسط',
                services: [
                  'تصوير لمدة 8 ساعات',
                  'مونتاج احترافي',
                  'مؤثرات بصرية',
                  'نسختان نهائيتان',
                ],
                featured: true,
              },
              {
                name: 'الباقة الاحترافية',
                price: 'حسب الطلب',
                description: 'مشروع متكامل',
                services: [
                  'تصوير غير محدود',
                  'إنتاج متكامل',
                  'مؤثرات وموسيقى احترافية',
                  'دعم فني كامل',
                ],
              },
            ].map((package_, index) => (
              <div
                key={index}
                className={`card ${
                  package_.featured ? 'border-2 border-[#B88424] shadow-lg' : ''
                }`}
              >
                {package_.featured && (
                  <div className="bg-[#B88424] text-white py-1 px-3 rounded-full inline-block text-xs font-bold mb-3">
                    الأكثر طلباً
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#133A63] mb-2">
                  {package_.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{package_.description}</p>
                <p className="text-3xl font-bold text-[#B88424] mb-4">
                  {package_.price}
                  <span className="text-sm text-slate-600 mr-2">ريال</span>
                </p>

                <ul className="space-y-2 mb-6 pb-6 border-b border-slate-200">
                  {package_.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B88424] mt-1.5 flex-shrink-0"></div>
                      {service}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={handlePackageSelect}
                  className={`w-full ${package_.featured ? 'btn-primary' : 'btn-outline'}`}
                >
                  اختر الباقة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#133A63] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">هل لديك مشروع في الذهن؟</h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            تواصل معنا اليوم لمناقشة متطلبات مشروعك والحصول على عرض سعر مخصص
          </p>
          <Link href="/contact" className="btn-secondary">
            تواصل معنا
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

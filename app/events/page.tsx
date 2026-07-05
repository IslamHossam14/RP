import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react'

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'مؤتمر التعليم الرقمي 2024',
      date: '15 سبتمبر 2024',
      time: '09:00 صباحاً',
      location: 'قاعة المؤتمرات الرئيسية',
      attendees: 500,
      description:
        'مؤتمر سنوي متخصص في أحدث تقنيات التعليم الرقمي والتعلم عن بعد',
      highlights: [
        'محاضرات من خبراء عالميين',
        'ورش عمل تطبيقية',
        'معرض تقني حديث',
        'فرص تواصل احترافي',
      ],
    },
    {
      id: 2,
      title: 'حفل تخريج الدفعة 28',
      date: '22 سبتمبر 2024',
      time: '18:00 مساءاً',
      location: 'قاعة الحفلات الكبرى',
      attendees: 800,
      description:
        'حفل تخريج سنوي يحتفي بإنجازات الطلاب الخريجين والتكريمات والجوائز',
      highlights: [
        'تكريم الطلاب المتميزين',
        'حفل موسيقي',
        'كلمات تحفيزية',
        'حفل عشاء فاخر',
      ],
    },
    {
      id: 3,
      title: 'ندوة المسؤولية الاجتماعية',
      date: '30 سبتمبر 2024',
      time: '14:00 ظهراً',
      location: 'مركز التدريب الأساسي',
      attendees: 300,
      description:
        'ندوة متخصصة حول دور المؤسسات التعليمية في المسؤولية الاجتماعية',
      highlights: [
        'نقاشات حول قضايا المجتمع',
        'عرض مشاريع اجتماعية',
        'ورش عمل تفاعلية',
        'فرص التطوع',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">المؤتمرات والحفلات</h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            احدث الفعاليات والمؤتمرات التعليمية والاحتفالية المتميزة
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">الفعاليات القادمة</h2>

          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="card border-r-4 border-[#B88424] hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Event Info */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-[#133A63] mb-3">
                      {event.title}
                    </h3>

                    <p className="text-slate-600 mb-4">{event.description}</p>

                    {/* Event Meta */}
                    <div className="space-y-3 mb-4 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#B88424]" />
                        <span className="text-slate-700 font-semibold">
                          {event.date}
                        </span>
                        <span className="text-slate-600">الساعة {event.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#B88424]" />
                        <span className="text-slate-700">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#B88424]" />
                        <span className="text-slate-700">
                          ما يقارب {event.attendees} مشارك
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-3">
                      {event.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B88424] mt-1.5 flex-shrink-0"></div>
                          <span className="text-sm text-slate-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Register Button */}
                  <div className="flex flex-col justify-between">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-slate-600 mb-2">متبقي من المقاعد</p>
                      <p className="text-3xl font-bold text-[#133A63]">
                        {event.attendees - 50}
                      </p>
                      <p className="text-xs text-slate-600 mt-2">
                        من أصل {event.attendees}
                      </p>
                    </div>
                    <button className="btn-secondary w-full mt-4">
                      سجل الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">أنواع الفعاليات</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'المؤتمرات العلمية',
                description:
                  'مؤتمرات متخصصة تجمع الخبراء والأكاديميين لمناقشة أحدث التطورات والأبحاث في المجالات المختلفة',
              },
              {
                title: 'الحفلات الاحتفالية',
                description:
                  'حفلات تخريج ووداعية بأنواعها، مع حفلات موسيقية وعروض فنية متميزة',
              },
              {
                title: 'ورش العمل والندوات',
                description:
                  'ورش عمل تفاعلية وندوات متخصصة لتطوير المهارات والمعرفة في مجالات محددة',
              },
            ].map((type, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold text-[#133A63] mb-3">
                  {type.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizing Services */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">خدمات التنظيم الشاملة</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#133A63] mb-6">
                التخطيط والإعداد
              </h3>
              {[
                'اختيار الموقع والقاعة المناسبة',
                'التنسيق مع المتحدثين والضيوف',
                'إعداد البرنامج الزمني للفعالية',
                'التسويق والإعلان عن الحدث',
                'إدارة التسجيل والحضور',
              ].map((service, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B88424] mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">{service}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#133A63] mb-6">
                التنفيذ والإنتاج
              </h3>
              {[
                'معدات صوت وإضاءة احترافية',
                'تصوير مباشر وتسجيل الفعالية',
                'خدمات الكاتيرينج والطعام',
                'التغطية الإعلامية والبث المباشر',
                'خدمات ما بعد الفعالية والأرشفة',
              ].map((service, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B88424] mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#133A63] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">هل تريد تنظيم حدثك الخاص؟</h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            دعنا نساعدك في تنظيم فعالية متميزة وناجحة بكل التفاصيل
          </p>
          <Link href="/contact" className="btn-secondary">
            تواصل معنا الآن
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

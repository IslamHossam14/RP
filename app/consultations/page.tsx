import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Brain, Scale, ArrowLeft } from 'lucide-react'

export default function ConsultationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الاستشارات المتخصصة</h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            خدمات استشارية احترافية من متخصصين معتمدين لتحسين جودة حياتك ومعالجة قضاياك
          </p>
        </div>
      </section>

      {/* Consultations Grid */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">أنواع الاستشارات</h2>

          {/* تم إجبار حاوية الشبكة على جعل جميع الكروت بنفس الارتفاع باستخدام items-stretch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Psychological Consultation */}
            {/* أضفنا h-full و flex-1 لضمان استجابة الطول الكامل */}
            <div className="card border-t-4 border-[#B88424] hover:shadow-lg transition-shadow flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Brain className="w-8 h-8 text-[#133A63]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#133A63]">
                      الاستشارات النفسية
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">
                  استشارات نفسية متخصصة تقدمها معالجون نفسيون معتمدون لمساعدتك على:
                </p>

                <ul className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  {[
                    'التعامل مع الضغوط والقلق',
                    'إدارة الاكتئاب والأرق',
                    'تحسين الثقة بالنفس',
                    'حل المشاكل الشخصية والعائلية',
                    'التطوير الذاتي والنمو الشخصي',
                    'إدارة الغضب والمشاعر السلبية',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#B88424] mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* هذا الجزء معزول تماماً الآن في الأسفل */}
              <div className="w-full pt-4">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#133A63] mb-2">التكلفة:</p>
                  <p className="text-2xl font-bold text-[#B88424]">
                    300 جنيها<span className="text-sm text-slate-600 mr-2">الجلسة الواحدة</span>
                  </p>
                </div>
                <Link href="/consultations/login" className="btn-secondary w-full text-center block">
                  احجز استشارة نفسية
                </Link>
              </div>
            </div>

            {/* Legal Consultation */}
            <div className="card border-t-4 border-[#B88424] hover:shadow-lg transition-shadow flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Scale className="w-8 h-8 text-[#133A63]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#133A63]">
                      الاستشارات القانونية
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">
                  استشارات قانونية متخصصة يقدمها محامون معتمدون في مجالات:
                </p>

                <ul className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  {[
                    'القانون المدني والعقود',
                    'قانون الأحوال الشخصية',
                    'القانون التجاري والعمل',
                    'حقوق الملكية الفكرية',
                    'النزاعات والتقاضي',
                    'القانون الجنائي والدفاع',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#B88424] mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* هذا الجزء معزول تماماً الآن في الأسفل */}
              <div className="w-full pt-4">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#133A63] mb-2">التكلفة:</p>
                  <p className="text-2xl font-bold text-[#B88424]">
                    500 جنيها<span className="text-sm text-slate-600 mr-2">الاستشارة الواحدة</span>
                  </p>
                </div>
                <Link href="/consultations/login" className="btn-secondary w-full text-center block">
                  احجز استشارة قانونية
                </Link>
              </div>
            </div>
            </div>
          </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">كيفية الاستشارة؟</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'اختر نوع الاستشارة',
                description: 'حدد نوع الاستشارة التي تحتاجها (نفسية أو قانونية)',
              },
              {
                step: '02',
                title: 'حدد موعداً',
                description: 'اختر الوقت والمتخصص المناسب لك من القائمة المتاحة',
              },
              {
                step: '03',
                title: 'دفع الرسوم',
                description: 'قم بسداد رسوم الاستشارة بطريقة آمنة وموثوقة',
              },
              {
                step: '04',
                title: 'الاستشارة',
                description: 'احصل على الاستشارة المتخصصة عبر الهاتف أو بالحضور الشخصي',
              },
            ].map((item, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl font-bold text-[#B88424] mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#133A63] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="py-20 bg-[#133A63] text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            متخصصونا المعتمدون
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'د. فاطمة أحمد',
                specialization: 'استشارات نفسية',
                experience: '12 سنة خبرة',
              },
              {
                name: 'أ. محمد علي',
                specialization: 'استشارات قانونية',
                experience: '15 سنة خبرة',
              },
              {
                name: 'د. سارة محمد',
                specialization: 'استشارات نفسية',
                experience: '10 سنوات خبرة',
              },
              {
                name: 'أ. خالد إبراهيم',
                specialization: 'استشارات قانونية',
                experience: '13 سنة خبرة',
              },
            ].map((specialist, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm hover:bg-opacity-20 transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{specialist.name}</h3>
                <p className="text-[#B88424] font-semibold mb-2">
                  {specialist.specialization}
                </p>
                <p className="text-slate-300">{specialist.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-[#133A63] mb-6">
            هل تحتاج إلى استشارة؟
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            تواصل معنا الآن واحجز استشارتك مع أحد متخصصينا المعتمدين
          </p>
          <Link href="/contact" className="btn-primary text-lg py-4 px-8">
            تواصل معنا
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react'

export default function TrainingPage() {
  const programs = [
    {
      icon: GraduationCap,
      title: 'البكالوريوس',
      duration: '4 سنوات',
      description: 'برنامج شامل يغطي المعارف الأساسية والمتقدمة في التخصص',
      details: [
        'دراسة نظرية وعملية متوازنة',
        'مشاريع تخرج متقدمة',
        'فرص تدريب عملي',
        'شهادة بكالوريوس معتمدة',
      ],
    },
    {
      icon: Briefcase,
      title: 'الدبلومة',
      duration: '2 سنة',
      description: 'برنامج متخصص وعملي يركز على المهارات الاحترافية',
      details: [
        'محتوى عملي وتطبيقي',
        'تدريب داخل الشركات',
        'مشاريع حقيقية',
        'شهادة دبلومة معتمدة',
      ],
    },
    {
      icon: Award,
      title: 'الماجستير',
      duration: 'سنتان',
      description: 'برنامج متقدم للمتخصصين الراغبين في تعميق معارفهم',
      details: [
        'بحث علمي متقدم',
        'دراسات متخصصة عميقة',
        'تعاون مع أساتذة ممارسين',
        'رسالة ماجستير',
      ],
    },
    {
      icon: BookOpen,
      title: 'الدكتوراه',
      duration: '3 سنوات',
      description: 'برنامج البحث الأكاديمي الأعلى مستوى',
      details: [
        'أبحاث أصيلة ومبتكرة',
        'إشراف من خبراء معترف بهم',
        'نشر أبحاث علمية',
        'درجة دكتوراه معتمدة',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">التدريب المهني</h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            برامج تدريبية متكاملة تغطي جميع مستويات التعليم والتطور المهني
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">أقسام التدريب</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon
              return (
                <div key={index} className="card border-l-4 border-[#B88424] hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <Icon className="w-6 h-6 text-[#133A63]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#133A63]">
                        {program.title}
                      </h3>
                      <p className="text-sm text-[#B88424] font-semibold">
                        المدة: {program.duration}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4">{program.description}</p>

                  <div className="space-y-2 mb-6 pb-6 border-b border-slate-200">
                    {program.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#B88424] mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-600">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/register" className="btn-secondary w-full text-center">
                    التسجيل الآن
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <h2 className="section-title">مقارنة البرامج</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#133A63]">
                  <th className="text-right p-4 font-bold text-[#133A63]">المعيار</th>
                  <th className="text-center p-4 font-bold text-[#133A63]">البكالوريوس</th>
                  <th className="text-center p-4 font-bold text-[#133A63]">الدبلومة</th>
                  <th className="text-center p-4 font-bold text-[#133A63]">الماجستير</th>
                  <th className="text-center p-4 font-bold text-[#133A63]">الدكتوراه</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { criterion: 'المدة', values: ['4 سنوات', '2 سنة', 'سنتان', '3 سنوات'] },
                  { criterion: 'الدراسة النظرية', values: ['70%', '40%', '60%', '50%'] },
                  { criterion: 'التطبيق العملي', values: ['30%', '60%', '40%', '50%'] },
                  { criterion: 'متطلبات القبول', values: ['ثانوي', 'ثانوي', 'بكالوريوس', 'ماجستير'] },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-slate-200 hover:bg-blue-50">
                    <td className="text-right p-4 font-semibold text-[#133A63]">
                      {row.criterion}
                    </td>
                    {row.values.map((value, i) => (
                      <td key={i} className="text-center p-4 text-slate-600">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#133A63] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">اختر برنامجك المفضل</h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
            لا تتردد في التواصل معنا إذا كان لديك أسئلة أو احتجت إلى معلومات إضافية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-secondary">
              التسجيل الآن
            </Link>
            <Link href="/contact" className="btn-outline text-white border-white hover:bg-white hover:text-[#133A63]">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

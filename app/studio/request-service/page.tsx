'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { Lock, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function RequestServicePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [requestDone, setRequestDone] = useState(false)

  const services = [
    { id: 'video', name: 'تصوير المحتوى', icon: '🎬', price: 2000 },
    { id: 'audio', name: 'التسجيل الصوتي', icon: '🎙️', price: 1500 },
    { id: 'podcast', name: 'البودكاست', icon: '🎧', price: 3000 },
    { id: 'event', name: 'الحفلات والمسرح', icon: '🎪', price: 5000 },
    { id: 'music', name: 'الموسيقى والمؤثرات', icon: '🎵', price: 4000 },
    { id: 'visual', name: 'المحتوى المرئي', icon: '🎞️', price: 3500 },
  ]

  const packages = [
    {
      id: 'basic',
      name: 'الباقة الأساسية',
      price: 2000,
      features: ['خدمة لمدة 4 ساعات', 'مونتاج بسيط', 'نسخة واحدة'],
    },
    {
      id: 'pro',
      name: 'الباقة المتقدمة',
      price: 5000,
      features: ['خدمة لمدة 8 ساعات', 'مونتاج احترافي', 'مؤثرات بصرية', 'نسختان'],
    },
    {
      id: 'premium',
      name: 'الباقة الاحترافية',
      price: 10000,
      features: ['خدمة غير محدودة', 'إنتاج متكامل', 'مؤثرات وموسيقى احترافية', 'دعم فني كامل'],
    },
  ]

  const handleLogin = () => {
    setIsLoggedIn(true)
    setStep(2)
  }

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep(3)
  }

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    setStep(4)
  }

  const handleSubmitRequest = () => {
    setRequestDone(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />

        <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">اطلب خدمة الاستوديو</h1>
            <p className="text-lg text-slate-200 max-w-2xl">
              أولاً يجب تسجيل الدخول أو إنشاء حساب جديد للمتابعة
            </p>
          </div>
        </section>

        <div className="container-custom py-20">
          <div className="max-w-md mx-auto card">
            <div className="text-center mb-8">
              <Lock className="w-16 h-16 text-[#B88424] mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-[#133A63] mb-2">تسجيل الدخول</h2>
              <p className="text-slate-600">يجب تسجيل الدخول أولاً قبل طلب الخدمة</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-[#133A63] mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#133A63] mb-2">كلمة المرور</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424]"
                />
              </div>
            </div>

            <button onClick={handleLogin} className="btn-primary w-full mb-4">
              تسجيل الدخول
            </button>

            <p className="text-center text-slate-600">
              ليس لديك حساب؟{' '}
              <Link href="/register" className="text-[#B88424] font-bold hover:text-[#133A63]">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">اطلب خدمة الاستوديو</h1>
          <p className="text-lg text-slate-200">الخطوة {step} من 4</p>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= num
                    ? 'bg-[#B88424] text-white shadow-lg'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step > num ? <CheckCircle className="w-6 h-6" /> : num}
              </div>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B88424] transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 2: Select Service */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#133A63] mb-8 text-center">اختر الخدمة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className="card hover:border-[#B88424] group"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#133A63] mb-2 text-right">{service.name}</h3>
                  <p className="text-2xl font-bold text-[#B88424] text-right">
                    من {service.price} ريال
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Package */}
        {step === 3 && selectedService && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#133A63] mb-8 text-center">
              اختر الباقة - {services.find((s) => s.id === selectedService)?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg.id)}
                  className="card hover:border-[#B88424] text-right"
                >
                  <h3 className="text-2xl font-bold text-[#133A63] mb-3">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-[#B88424] mb-6">{pkg.price} ريال</p>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-[#B88424] mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Details and Payment */}
        {step === 4 && selectedService && selectedPackage && !requestDone && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#133A63] mb-8 text-center">أكمل بيانات الطلب</h2>

            <div className="card mb-8">
              <h3 className="text-xl font-bold text-[#133A63] mb-6">ملخص الطلب</h3>
              <div className="space-y-4 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">الخدمة</span>
                  <span className="font-bold text-[#133A63]">
                    {services.find((s) => s.id === selectedService)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">الباقة</span>
                  <span className="font-bold text-[#133A63]">
                    {packages.find((p) => p.id === selectedPackage)?.name}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-lg text-slate-600">الإجمالي</span>
                <span className="text-4xl font-black text-[#B88424]">
                  {packages.find((p) => p.id === selectedPackage)?.price} ريال
                </span>
              </div>
            </div>

            <div className="card mb-8">
              <h3 className="text-xl font-bold text-[#133A63] mb-4">تفاصيل الطلب</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#133A63] mb-2">عنوان المشروع</label>
                  <input
                    type="text"
                    placeholder="اسم مشروعك"
                    className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#133A63] mb-2">وصف تفصيلي</label>
                  <textarea
                    placeholder="اشرح احتياجاتك والتفاصيل المهمة"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#133A63] mb-2">تاريخ البدء المطلوب</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424]"
                  />
                </div>
              </div>
            </div>

            <button onClick={handleSubmitRequest} className="btn-primary w-full">
              تأكيد الطلب والدفع - {packages.find((p) => p.id === selectedPackage)?.price} ريال
            </button>
          </div>
        )}

        {/* Success State */}
        {requestDone && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="card">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#133A63] mb-4">تم استقبال الطلب بنجاح!</h2>
              <p className="text-lg text-slate-600 mb-8">
                سيتم التواصل معك قريباً لتأكيد تفاصيل المشروع والبدء في العمل.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200 text-right">
                <h3 className="font-bold text-[#133A63] mb-3">تفاصيل الطلب</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>الخدمة:</strong> {services.find((s) => s.id === selectedService)?.name}
                  </p>
                  <p>
                    <strong>الباقة:</strong> {packages.find((p) => p.id === selectedPackage)?.name}
                  </p>
                  <p>
                    <strong>المبلغ:</strong> {packages.find((p) => p.id === selectedPackage)?.price} ريال
                  </p>
                </div>
              </div>

              <Link href="/" className="btn-primary">
                العودة إلى الرئيسية
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

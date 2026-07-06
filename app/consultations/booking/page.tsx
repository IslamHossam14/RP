'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { CheckCircle, Lock, ArrowRight, Brain, Scale } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(2) // بدء من الخطوة 2: اختيار نوع الاستشارة
  const [userData, setUserData] = useState<{ fullName: string; email: string; phone: string } | null>(null)
  const [consultationType, setConsultationType] = useState<'psychological' | 'legal' | null>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [paymentDone, setPaymentDone] = useState(false)

  // التحقق من بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const storedUser = localStorage.getItem('consultationUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
    } else {
      // إعادة التوجيه إلى صفحة التسجيل إذا لم يسجل المستخدم دخوله
      router.push('/consultations/login')
    }
  }, [])

  const psychologists = [
    { id: '1', name: 'د. فاطمة أحمد', experience: '12 سنة خبرة', price: 300 },
    { id: '2', name: 'د. سارة محمد', experience: '10 سنوات خبرة', price: 300 },
  ]

  const lawyers = [
    { id: '3', name: 'أ. محمد علي', experience: '15 سنة خبرة', price: 500 },
    { id: '4', name: 'أ. خالد إبراهيم', experience: '13 سنة خبرة', price: 500 },
  ]

  const specialists = consultationType === 'psychological' ? psychologists : lawyers
  const currentPrice =
    consultationType === 'psychological'
      ? 300
      : consultationType === 'legal'
        ? 500
        : 0

  const timeSlots = ['09:00 صباحاً', '10:30 صباحاً', '02:00 مساءً', '03:30 مساءً', '04:30 مساءً']

  const handleSelectType = (type: 'psychological' | 'legal') => {
    setConsultationType(type)
    setStep(3)
  }

  const handleSelectSpecialist = (id: string) => {
    setSelectedSpecialist(id)
    setStep(4)
  }

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
    setStep(5)
  }

  const handlePayment = () => {
    setPaymentDone(true)
  }

  // إذا لم يتم تحميل بيانات المستخدم بعد، نعرض شاشة تحميل
  if (!userData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <div className="spinner"></div>
          <p className="text-slate-600">جاري التحقق من بيانات المستخدم...</p>
        </div>
      </div>
    )
  }

  // Booking Steps
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">احجز استشارتك</h1>
          <p className="text-lg text-slate-200">الخطوة {step - 1} من 4</p>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[2, 3, 4, 5].map((num) => (
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
              style={{ width: `${((step - 2) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* User Info Display */}
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-slate-700">
            <strong>مرحباً،</strong> {userData.fullName}
          </p>
        </div>

        {/* Step 2: Select Type */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#133A63] mb-8 text-center">اختر نوع الاستشارة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  type: 'psychological' as const,
                  icon: Brain,
                  title: 'الاستشارات النفسية',
                  price: 300,
                },
                {
                  type: 'legal' as const,
                  icon: Scale,
                  title: 'الاستشارات القانونية',
                  price: 500,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.type}
                    onClick={() => handleSelectType(item.type)}
                    className="card hover:border-[#B88424] group"
                  >
                    <Icon className="w-12 h-12 text-[#B88424] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-[#133A63] mb-2 text-right">{item.title}</h3>
                    <p className="text-3xl font-bold text-[#B88424] text-right">
                      {item.price} جنيه
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Select Specialist */}
        {step === 3 && consultationType && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#133A63] mb-8 text-center">اختر المتخصص</h2>
            <div className="space-y-4">
              {specialists.map((specialist) => (
                <button
                  key={specialist.id}
                  onClick={() => handleSelectSpecialist(specialist.id)}
                  className="card w-full text-right hover:border-[#B88424] transition-all flex items-center justify-between"
                >
                  <ArrowRight className="w-6 h-6 text-[#B88424]" />
                  <div>
                    <h3 className="text-xl font-bold text-[#133A63]">{specialist.name}</h3>
                    <p className="text-slate-600">{specialist.experience}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#B88424]">{specialist.price} جنيه</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Select Time */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#133A63] mb-8 text-center">اختر الموعد</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleSelectTime(time)}
                  className={`card py-6 text-center font-bold text-lg transition-all ${
                    selectedTime === time
                      ? 'border-[#B88424] bg-blue-50 text-[#133A63]'
                      : 'text-[#133A63] hover:border-[#B88424]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Payment */}
        {step === 5 && selectedTime && !paymentDone && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#133A63] mb-8 text-center">أكمل الدفع</h2>

            {/* Summary */}
            <div className="card mb-8">
              <h3 className="text-xl font-bold text-[#133A63] mb-6">ملخص الحجز</h3>
              <div className="space-y-4 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">نوع الاستشارة</span>
                  <span className="font-bold text-[#133A63]">
                    {consultationType === 'psychological' ? 'نفسية' : 'قانونية'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">المتخصص</span>
                  <span className="font-bold text-[#133A63]">
                    {specialists.find((s) => s.id === selectedSpecialist)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">الموعد</span>
                  <span className="font-bold text-[#133A63]">{selectedTime}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-lg text-slate-600">الإجمالي</span>
                <span className="text-4xl font-black text-[#B88424]">
                  {currentPrice} جنيه
                </span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="card mb-8">
              <h3 className="text-xl font-bold text-[#133A63] mb-4">معلومات الدفع</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#133A63] mb-2">رقم البطاقة</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#133A63] mb-2">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#133A63] mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#B88424]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handlePayment} className="btn-primary w-full">
              إكمال الدفع - {currentPrice} جنيه
            </button>
          </div>
        )}

        {/* Success State */}
        {paymentDone && (
          <>
            <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16 mb-12">
              <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">الحجز مكتمل</h1>
                <p className="text-lg text-slate-200">شكراً لاختيارك خدماتنا</p>
              </div>
            </section>
            <div className="max-w-2xl mx-auto text-center">
              <div className="card">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#133A63] mb-4">تم الحجز بنجاح!</h2>
              <p className="text-lg text-slate-600 mb-8">
                سيتم التواصل معك قريباً لتأكيد موعد الاستشارة. تابع بريدك الإلكتروني للتحديثات.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200 text-right">
                <h3 className="font-bold text-[#133A63] mb-3">تفاصيل الاستشارة</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>الموعد:</strong> {selectedTime}
                  </p>
                  <p>
                    <strong>المتخصص:</strong> {specialists.find((s) => s.id === selectedSpecialist)?.name}
                  </p>
                  <p>
                    <strong>السعر:</strong> {currentPrice} جنيه
                  </p>
                </div>
              </div>

              <Link href="/" className="btn-primary">
                العودة إلى الرئيسية
              </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

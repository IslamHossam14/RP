'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Message sent:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent('السلام عليكم، أود التواصل معكم')
    window.open(
      `https://wa.me/966501234567?text=${message}`,
      '_blank'
    )
  }

  const handleEmail = () => {
    window.open('mailto:info@academy.com?subject=استفسار', '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            نحن هنا للإجابة على جميع استفساراتك ولتقديم أفضل الخدمات
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">طرق التواصل</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Phone */}
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 rounded-lg bg-blue-50 mb-4">
                <Phone className="w-8 h-8 text-[#B88424]" />
              </div>
              <h3 className="text-xl font-bold text-[#133A63] mb-2">
                رقم الهاتف
              </h3>
              <p className="text-slate-600 mb-4">اتصل بنا مباشرة</p>
              <a
                href="tel:+966501234567"
                className="text-[#B88424] font-semibold hover:underline"
              >
                +966 50 123 4567
              </a>
            </div>

            {/* Email */}
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 rounded-lg bg-blue-50 mb-4">
                <Mail className="w-8 h-8 text-[#B88424]" />
              </div>
              <h3 className="text-xl font-bold text-[#133A63] mb-2">
                البريد الإلكتروني
              </h3>
              <p className="text-slate-600 mb-4">أرسل لنا بريداً</p>
              <button
                onClick={handleEmail}
                className="text-[#B88424] font-semibold hover:underline"
              >
                info@academy.com
              </button>
            </div>

            {/* WhatsApp */}
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="inline-block p-4 rounded-lg bg-blue-50 mb-4">
                <MessageCircle className="w-8 h-8 text-[#B88424]" />
              </div>
              <h3 className="text-xl font-bold text-[#133A63] mb-2">واتساب</h3>
              <p className="text-slate-600 mb-4">دردش معنا الآن</p>
              <button
                onClick={handleWhatsApp}
                className="text-[#B88424] font-semibold hover:underline"
              >
                فتح الدردشة
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="card border-l-4 border-[#B88424]">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#B88424] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-[#133A63] mb-2">
                  عنوان المقر
                </h3>
                <p className="text-slate-700 text-lg font-semibold mb-1">
                  أكاديمية التعليم المتقدمة
                </p>
                <p className="text-slate-600">
                  حي الملز، شارع الملك عبدالعزيز
                </p>
                <p className="text-slate-600">
                  الرياض، المملكة العربية السعودية
                </p>
                <p className="text-slate-600 mt-3">
                  <span className="font-semibold">الرمز البريدي:</span> 11572
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="card shadow-lg">
              <h2 className="text-2xl font-bold text-[#133A63] mb-6">
                أرسل لنا رسالة
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    شكراً! تم استقبال رسالتك وسنرد عليك قريباً
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#133A63] mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#133A63] mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-[#133A63] mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="موضوع الرسالة"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#133A63] mb-2">
                    الرسالة
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا..."
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#B88424] focus:ring-2 focus:ring-[#B88424] focus:ring-opacity-20 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  إرسال الرسالة
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Working Hours */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#B88424] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-[#133A63] mb-3">
                      ساعات العمل
                    </h3>
                    <div className="space-y-2 text-slate-600">
                      <div className="flex justify-between">
                        <span>السبت - الأربعاء:</span>
                        <span className="font-semibold">08:00 - 20:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الخميس:</span>
                        <span className="font-semibold">08:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الجمعة:</span>
                        <span className="font-semibold">15:00 - 20:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل عبر واتساب
                </button>
                <button
                  onClick={handleEmail}
                  className="w-full bg-[#B88424] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  أرسل بريداً إلكترونياً
                </button>
                <a
                  href="tel:+966501234567"
                  className="w-full bg-[#133A63] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  اتصل الآن
                </a>
              </div>

              {/* FAQ Info */}
              <div className="card bg-blue-50 border border-blue-200">
                <h4 className="font-bold text-[#133A63] mb-2">أسئلة شائعة</h4>
                <p className="text-sm text-slate-600">
                  هل لديك أسئلة متكررة؟ تفضل بزيارة قسم الأسئلة الشائعة في موقعنا للحصول على إجابات سريعة
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

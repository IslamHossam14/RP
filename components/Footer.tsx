import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#133A63] text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#B88424]">عن الأكاديمية</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              أكاديمية متخصصة في التدريب المهني والدورات التعليمية المتقدمة بجودة عالية وكوادر متميزة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#B88424]">روابط سريعة</h3>
            <ul className="space-y-2 text-sm  text-slate-300">
              <li>
                <Link href="/" className="text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white transition-colors">
                  الدورات
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-white transition-colors">
                  التدريب
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white transition-colors">
                  التواصل
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#B88424]">الخدمات</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/courses" className="text-white transition-colors">
                  الدورات والدبلومات
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="text-white transition-colors">
                  الاستشارات
                </Link>
              </li>
              <li>
                <Link href="/studio" className="text-white transition-colors">
                  الاستوديو
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white transition-colors">
                  المؤتمرات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#B88424]">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-[#B88424] mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">+966 50 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-[#B88424] mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">info@academy.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#B88424] mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">القاهرة</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} أكاديمية التعليم المتقدمة. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-400 hover:text-[#B88424] text-sm transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="text-slate-400 hover:text-[#B88424] text-sm transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

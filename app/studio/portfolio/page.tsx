'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { Video, X } from 'lucide-react'

export default function PortfolioPage() {
  const [selectedWork, setSelectedWork] = useState<number | null>(null)

  const portfolioItems = [
    {
      id: 1,
      title: 'تصوير محتوى تعليمي',
      type: 'Video',
      description: 'سلسلة فيديوهات تعليمية احترافية عن البرمجة',
      thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'تسجيل بودكاست',
      type: 'Podcast',
      description: 'بودكاست أسبوعي عن الريادة والأعمال',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'تسجيل صوتي احترافي',
      type: 'Audio',
      description: 'تسجيل صوتي عالي الجودة لمقرر دراسي',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      title: 'حفلة موسيقية مباشرة',
      type: 'Live Event',
      description: 'تصوير وتسجيل حفلة موسيقية حية',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      title: 'تصوير إعلاني احترافي',
      type: 'Commercial',
      description: 'فيديو إعلاني احترافي لشركة عقارية',
      thumbnail: 'https://images.unsplash.com/photo-1537995882-a61a0b9b9e95?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1537995882-a61a0b9b9e95?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      title: 'فيديو ترويجي',
      type: 'Promotional',
      description: 'فيديو ترويجي لمنصة تعليمية',
      thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
    },
    {
      id: 7,
      title: 'تسجيل ندوة تدريبية',
      type: 'Training',
      description: 'تسجيل ندوة تدريبية في مجال التسويق الرقمي',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    },
    {
      id: 8,
      title: 'إنتاج موسيقى خاصة',
      type: 'Music Production',
      description: 'إنتاج موسيقى خاصة وأغاني أصلية',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
    },
    {
      id: 9,
      title: 'فيديو تسويق المنتجات',
      type: 'Product Video',
      description: 'فيديو تسويقي احترافي لمنتج جديد',
      thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
    },
    {
      id: 10,
      title: 'فيديو رسوم متحركة',
      type: 'Animation',
      description: 'فيديو رسوم متحركة توضيحية',
      thumbnail: 'https://images.unsplash.com/photo-1488998427799-e21cdc11a853?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1488998427799-e21cdc11a853?w=800&h=600&fit=crop',
    },
    {
      id: 11,
      title: 'فيديو تسجيل شهادات العملاء',
      type: 'Testimonial',
      description: 'تسجيل شهادات العملاء الراضين',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f70504066?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70504066?w=800&h=600&fit=crop',
    },
    {
      id: 12,
      title: 'فيديو خلف الكواليس',
      type: 'Behind The Scenes',
      description: 'فيديو خلف الكواليس لعملية الإنتاج',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#133A63] to-[#0A1F36] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">بورتفوليو أعمالنا</h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            اكتشف مجموعة من الأعمال المتميزة والاحترافية التي قمنا بإنتاجها لعملائنا
          </p>
        </div>
      </section>

      {/* Portfolio Grid - Organized by Type */}
      <section className="py-20">
        <div className="container-custom">
          {/* Get unique types */}
          {Array.from(new Set(portfolioItems.map((item) => item.type))).map(
            (type) => {
              const typeWorks = portfolioItems.filter((item) => item.type === type)
              return (
                <div key={type} className="mb-12">
                  <h3 className="text-2xl font-bold text-[#133A63] mb-6">
                    {type}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {typeWorks.map((work, index) => {
                      const actualIndex = portfolioItems.findIndex(
                        (item) => item.id === work.id
                      )
                      return (
                        <button
                          key={work.id}
                          onClick={() => setSelectedWork(actualIndex)}
                          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                        >
                          <img
                            src={work.thumbnail}
                            alt={work.title}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <p className="text-xs font-semibold text-[#B88424] mb-1">
                                {work.type}
                              </p>
                              <p className="font-bold text-sm">{work.title}</p>
                            </div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40">
                            <Video className="w-12 h-12 text-white" />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            }
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedWork !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="sticky top-0 flex justify-end p-4 bg-white border-b border-slate-200 z-10">
              <button
                onClick={() => setSelectedWork(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#133A63]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <img
                src={portfolioItems[selectedWork].image}
                alt={portfolioItems[selectedWork].title}
                className="w-full rounded-2xl mb-6"
              />

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#B88424] uppercase tracking-wide mb-2">
                    {portfolioItems[selectedWork].type}
                  </p>
                  <h2 className="text-3xl font-bold text-[#133A63] mb-4">
                    {portfolioItems[selectedWork].title}
                  </h2>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {portfolioItems[selectedWork].description}
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                  <h3 className="font-bold text-[#133A63] mb-4">تفاصيل المشروع</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-600 uppercase mb-1">الفئة</p>
                      <p className="text-[#133A63] font-semibold">{portfolioItems[selectedWork].type}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-600 uppercase mb-1">حالة المشروع</p>
                      <p className="text-[#B88424] font-semibold">مكتمل</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 pt-4 border-t border-slate-200">
                    تم تنفيذ هذا المشروع بأعلى معايير الجودة المهنية مع فريق عمل متخصص وخبرة طويلة في
                    المجال.
                  </p>
                </div>

                <button className="btn-primary w-full" onClick={() => setSelectedWork(null)}>
                  اطلب خدمة مشابهة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

import { Clock, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import type { Course } from '@/data/courses'

interface CourseCardProps {
  course: Course
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const categoryLabel = course.category === 'diploma' ? 'دبلوم' : 'كورس'
  const categoryColor =
    course.category === 'diploma'
      ? 'bg-[#B88424] text-white'
      : 'bg-[#133A63] text-white'

  return (
    <div className="card group h-full flex flex-col overflow-hidden">
      {/* Top Accent Bar */}
      <div className="h-1 bg-[#B88424] group-hover:h-2 transition-all"></div>

      {/* Header */}
      <div className="mb-5 mt-2">
        <span
          className={`text-xs font-bold px-4 py-2 rounded-full inline-block ${categoryColor} shadow-md`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Title and Description */}
      <h3 className="text-xl font-bold text-[#133A63] mb-4 group-hover:text-[#B88424] transition-colors line-clamp-2">
        {course.title}
      </h3>
      <p className="text-[#133A63] text-sm mb-5 flex-grow line-clamp-3 leading-relaxed font-semibold">
        {course.description}
      </p>

      {/* Meta Information */}
      <div className="space-y-3 mb-6 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-[#133A63] flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <span className="text-[#133A63] font-semibold">{course.duration}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-lg bg-[#B88424] flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="text-[#133A63] font-semibold">{course.level}</span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-[#133A63] mb-2 font-bold uppercase tracking-wide">السعر</p>
          <p className="text-3xl font-black text-[#133A63]">
            {course.price.toLocaleString('ar-SA')}
            <span className="text-sm text-[#133A63] font-semibold mr-2">جنية</span>
          </p>
        </div>
        <Link href={`/courses/${course.id}`} className="btn-secondary text-sm py-2 px-5 whitespace-nowrap">
          التفاصيل
        </Link>
      </div>
    </div>
  )
}

export default CourseCard

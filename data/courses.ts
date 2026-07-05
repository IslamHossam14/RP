export interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: string
  category: 'diploma' | 'course'
  content: string[]
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'دبلوم إدارة الأعمال ',
    description: 'برنامج شامل في إدارة الأعمال والقيادة',
    price: 2500,
    duration: '6 أشهر',
    level: 'متقدم',
    category: 'diploma',
    content: [
      'أساسيات إدارة الأعمال',
      'استراتيجية الشركات',
      'إدارة المشاريع',
      'القيادة والتحفيز',
    ],
  },
  {
    id: '2',
    title: 'كورس التسويق الرقمي',
    description: 'تعلم أحدث استراتيجيات التسويق الرقمي',
    price: 800,
    duration: '3 أشهر',
    level: 'متوسط',
    category: 'course',
    content: [
      'وسائل التواصل الاجتماعي',
      'البريد الإلكتروني',
      'تحسين محركات البحث',
      'الإعلانات المدفوعة',
    ],
  },
  {
    id: '3',
    title: 'دبلوم تكنولوجيا المعلومات',
    description: 'برنامج متخصص في تقنيات البرمجة والويب',
    price: 3000,
    duration: '9 أشهر',
    level: 'متقدم',
    category: 'diploma',
    content: [
      'أساسيات البرمجة',
      'تطوير الويب',
      'قواعد البيانات',
      'أمن المعلومات',
    ],
  },
  {
    id: '4',
    title: 'كورس التصميم الجرافيكي',
    description: 'احترف أدوات التصميم الحديثة',
    price: 600,
    duration: '2 شهر',
    level: 'مبتدئ',
    category: 'course',
    content: [
      'أساسيات التصميم',
      'Adobe Creative Suite',
      'التصميم للويب والطباعة',
      'مشروع عملي',
    ],
  },
  {
    id: '5',
    title: 'دبلوم اللغة الإنجليزية',
    description: 'برنامج متكامل لإتقان اللغة الإنجليزية',
    price: 1800,
    duration: '6 أشهر',
    level: 'متقدم',
    category: 'diploma',
    content: [
      'القواعد والنحو',
      'المحادثة والاستماع',
      'القراءة والكتابة',
      'اختبارات دولية',
    ],
  },
  {
    id: '6',
    title: 'كورس المحاسبة الأساسية',
    description: 'تعلم أساسيات المحاسبة المالية',
    price: 700,
    duration: '2.5 شهر',
    level: 'مبتدئ',
    category: 'course',
    content: [
      'القيود المحاسبية',
      'إعداد القوائم المالية',
      'التحليل المالي',
      'حالات عملية',
    ],
  },
]

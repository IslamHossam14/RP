export interface Registration {
  id: string
  userName: string
  email: string
  phone: string
  specialization: string
  courseTitle: string
  registrationDate: string
  status: 'approved' | 'pending' | 'rejected'
  notes: string
}

export const mockRegistrations: Registration[] = [
  {
    id: 'REG001',
    userName: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '966501234567',
    specialization: 'تطوير ويب',
    courseTitle: 'دورة تطوير الويب المتقدم',
    registrationDate: '2024-01-15',
    status: 'approved',
    notes: 'تم الموافقة على التسجيل',
  },
  {
    id: 'REG002',
    userName: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '966502345678',
    specialization: 'تصميم الرسوميات',
    courseTitle: 'دبلوم تصميم الرسوميات',
    registrationDate: '2024-02-20',
    status: 'approved',
    notes: '',
  },
  {
    id: 'REG003',
    userName: 'سارة إبراهيم',
    email: 'sarah@example.com',
    phone: '966504567890',
    specialization: 'تسويق رقمي',
    courseTitle: 'دورة التسويق الرقمي الأساسي',
    registrationDate: '2024-01-10',
    status: 'pending',
    notes: 'في انتظار التحقق من البيانات',
  },
  {
    id: 'REG004',
    userName: 'محمد علي',
    email: 'mohamad@example.com',
    phone: '966506789012',
    specialization: 'البرمجة',
    courseTitle: 'دورة البرمجة بـ Python',
    registrationDate: '2024-01-25',
    status: 'pending',
    notes: '',
  },
]

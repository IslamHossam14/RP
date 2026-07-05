export interface Payment {
  id: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  courseTitle: string
  courseType: 'course' | 'diploma'
  paymentDate: string
  paymentMethod: 'credit-card' | 'bank-transfer' | 'wallet'
  status: 'completed' | 'pending' | 'failed'
  transactionId: string
}

export const mockPayments: Payment[] = [
  {
    id: 'PAY001',
    userId: '1',
    userName: 'أحمد محمد',
    userEmail: 'ahmed@example.com',
    amount: 999,
    courseTitle: 'دورة تطوير الويب المتقدم',
    courseType: 'course',
    paymentDate: '2024-01-20',
    paymentMethod: 'credit-card',
    status: 'completed',
    transactionId: 'TXN123456789',
  },
  {
    id: 'PAY002',
    userId: '2',
    userName: 'فاطمة علي',
    userEmail: 'fatima@example.com',
    amount: 2999,
    courseTitle: 'دبلوم تصميم الرسوميات',
    courseType: 'diploma',
    paymentDate: '2024-01-25',
    paymentMethod: 'bank-transfer',
    status: 'completed',
    transactionId: 'TXN987654321',
  },
  {
    id: 'PAY003',
    userId: '4',
    userName: 'سارة إبراهيم',
    userEmail: 'sarah@example.com',
    amount: 1499,
    courseTitle: 'دورة التسويق الرقمي الأساسي',
    courseType: 'course',
    paymentDate: '2024-02-01',
    paymentMethod: 'credit-card',
    status: 'pending',
    transactionId: 'TXN456789123',
  },
  {
    id: 'PAY004',
    userId: '1',
    userName: 'أحمد محمد',
    userEmail: 'ahmed@example.com',
    amount: 2499,
    courseTitle: 'دبلوم تطوير التطبيقات',
    courseType: 'diploma',
    paymentDate: '2024-02-05',
    paymentMethod: 'wallet',
    status: 'completed',
    transactionId: 'TXN789123456',
  },
  {
    id: 'PAY005',
    userId: '3',
    userName: 'محمود حسن',
    userEmail: 'mahmoud@example.com',
    amount: 1999,
    courseTitle: 'دورة البرمجة بـ React',
    courseType: 'course',
    paymentDate: '2024-02-10',
    paymentMethod: 'credit-card',
    status: 'completed',
    transactionId: 'TXN321654987',
  },
]

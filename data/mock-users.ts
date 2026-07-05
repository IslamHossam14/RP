export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'student' | 'instructor' | 'admin' | 'super-admin'
  specialization: string
  registrationDate: string
  status: 'active' | 'inactive' | 'pending'
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '966501234567',
    role: 'student',
    specialization: 'تطوير ويب',
    registrationDate: '2024-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '966502345678',
    role: 'student',
    specialization: 'تصميم الرسوميات',
    registrationDate: '2024-02-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'محمود حسن',
    email: 'mahmoud@example.com',
    phone: '966503456789',
    role: 'instructor',
    specialization: 'تطوير ويب',
    registrationDate: '2023-12-01',
    status: 'active',
  },
  {
    id: '4',
    name: 'سارة إبراهيم',
    email: 'sarah@example.com',
    phone: '966504567890',
    role: 'student',
    specialization: 'تسويق رقمي',
    registrationDate: '2024-01-10',
    status: 'pending',
  },
  {
    id: '5',
    name: 'علي عمر',
    email: 'ali@example.com',
    phone: '966505678901',
    role: 'admin',
    specialization: 'إدارة النظام',
    registrationDate: '2023-11-15',
    status: 'active',
  },
]

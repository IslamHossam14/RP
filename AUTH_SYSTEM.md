# نظام المصادقة والتحقق من المستخدم

## نظرة عامة

تم تطبيق نظام شامل للمصادقة والتحقق من المستخدمين في جميع أنحاء تطبيق الأكاديمية. يتم فتح modal تسجيل دخول/إنشاء حساب عند محاولة الوصول إلى الميزات المحمية مثل:

- تسجيل في المؤتمرات والحفلات
- الدفع مقابل الدورات
- حجز الاستشارات
- شراء خدمات الاستوديو

## المكونات الرئيسية

### 1. AuthContext (`context/AuthContext.tsx`)

يوفر إدارة الحالة العامة للمستخدم والدوال المطلوبة:

```typescript
interface User {
  id: string
  fullName: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: { ... }) => Promise<void>
  logout: () => void
}
```

**الدوال المتاحة:**
- `login(email, password)` - تسجيل دخول المستخدم
- `register(userData)` - إنشاء حساب جديد
- `logout()` - تسجيل الخروج

### 2. AuthModal Component (`components/AuthModal.tsx`)

مكون modal يوفر واجهة تسجيل دخول وإنشاء حساب:

**الميزات:**
- نموذج تسجيل دخول بالبريد الإلكتروني وكلمة المرور
- نموذج إنشاء حساب جديد مع:
  - الاسم الكامل
  - رقم الهاتف
  - البريد الإلكتروني
  - كلمة المرور
  - التخصص
- التحويل السلس بين نمط التسجيل والتسجيل الجديد
- التحقق من صحة المدخلات

## كيفية الاستخدام

### إضافة حماية إلى صفحة أو مكون

```typescript
'use client'

import { useAuth } from '@/context/AuthContext'
import AuthModal from '@/components/AuthModal'
import { useState } from 'react'

export default function ProtectedPage() {
  const { isLoggedIn } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleProtectedAction = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    // نفذ الإجراء المحمي
  }

  return (
    <>
      <button onClick={handleProtectedAction}>إجراء محمي</button>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
```

## الصفحات المحمية الحالية

تم تطبيق النظام على الصفحات التالية:

### 1. المؤتمرات والحفلات (`/events`)
- عند النقر على "سجل الآن" يظهر modal المصادقة

### 2. تفاصيل الدورة (`/courses/[id]`)
- عند محاولة الدفع يظهر modal المصادقة
- بعد التسجيل الناجح يمكن الدفع والوصول للمحتوى

### 3. الاستشارات (`/consultations`)
- عند النقر على "احجز استشارة" يظهر modal المصادقة
- يتم اختيار نوع الاستشارة (نفسية أو قانونية)

### 4. استوديو الإنتاج (`/studio`)
- عند اختيار باقة سعر يظهر modal المصادقة
- بعد التسجيل يمكن الانتقال لعملية الدفع

## سلسلة التدفق

```
1. المستخدم يحاول الوصول لميزة محمية
   ↓
2. فحص isLoggedIn
   ↓
3. إذا لم يكن مسجل دخول → عرض AuthModal
   ↓
4. المستخدم يختار:
   - تسجيل دخول بحساب موجود
   - أو إنشاء حساب جديد
   ↓
5. بعد النجاح:
   - إغلاق Modal تلقائياً
   - الانتقال إلى الخطوة التالية (الدفع مثلاً)
```

## التخصيص والتطوير المستقبلي

### يمكن تحسين النظام بـ:

1. **المصادقة الحقيقية:**
   - ربط مع backend API للمصادقة
   - تخزين الـ tokens بشكل آمن
   - تفعيل البريد الإلكتروني

2. **تسجيل اجتماعي:**
   - تسجيل عبر Google
   - تسجيل عبر Facebook

3. **إدارة الحساب:**
   - صفحة الملف الشخصي
   - إعادة تعيين كلمة المرور
   - تحديث البيانات

4. **الأمان:**
   - تفعيل ثنائي
   - حماية CSRF
   - معدل تحديد المحاولات

## ملاحظات مهمة

- النظام الحالي يستخدم محاكاة (mock) للتخزين في الذاكرة
- عند تحديث الصفحة سيتم فقدان بيانات المستخدم
- يوصى بربط النظام بـ database حقيقي قبل الإنتاج
- يجب تطبيق HTTPS لنقل البيانات الحساسة

## الملفات المتعلقة

```
├── context/
│   └── AuthContext.tsx          # إدارة الحالة
├── components/
│   └── AuthModal.tsx             # مكون Modal
├── app/
│   ├── layout.tsx               # تضمين AuthProvider
│   ├── events/page.tsx          # محمي
│   ├── courses/[id]/page.tsx    # محمي
│   ├── consultations/page.tsx   # محمي
│   └── studio/page.tsx          # محمي
└── data/
    └── specializations.ts        # قائمة التخصصات
```

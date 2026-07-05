'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Users,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  FileText,
  Upload,
} from 'lucide-react'
import { useState } from 'react'

interface DashboardSidebarProps {
  userRole: 'super-admin' | 'admin' | 'instructor'
}

export default function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const getSidebarLinks = () => {
    const baseLinks = [
      {
        label: 'لوحة التحكم',
        href: `/admin/${userRole}`,
        icon: BarChart3,
      },
    ]

    if (userRole === 'super-admin') {
      return [
        ...baseLinks,
        {
          label: 'المستخدمين',
          href: `/admin/super-admin/users`,
          icon: Users,
        },
        {
          label: 'الكورسات',
          href: `/admin/super-admin/courses`,
          icon: BookOpen,
        },
        {
          label: 'الدبلومات',
          href: `/admin/super-admin/diplomas`,
          icon: Award,
        },
        {
          label: 'التسجيلات',
          href: `/admin/super-admin/registrations`,
          icon: FileText,
        },
        {
          label: 'المدفوعات',
          href: `/admin/super-admin/payments`,
          icon: CreditCard,
        },
        {
          label: 'الإعدادات',
          href: `/admin/super-admin/settings`,
          icon: Settings,
        },
      ]
    }

    if (userRole === 'admin') {
      return [
        ...baseLinks,
        {
          label: 'المستخدمين',
          href: `/admin/admin/users`,
          icon: Users,
        },
        {
          label: 'الكورسات',
          href: `/admin/admin/courses`,
          icon: BookOpen,
        },
        {
          label: 'الدبلومات',
          href: `/admin/admin/diplomas`,
          icon: Award,
        },
        {
          label: 'التسجيلات',
          href: `/admin/admin/registrations`,
          icon: FileText,
        },
      ]
    }

    if (userRole === 'instructor') {
      return [
        ...baseLinks,
        {
          label: 'رفع كورس جديد',
          href: `/admin/instructor/upload-course`,
          icon: Upload,
        },
        {
          label: 'كورساتي',
          href: `/admin/instructor/my-courses`,
          icon: BookOpen,
        },
        {
          label: 'دبلوماتي',
          href: `/admin/instructor/my-diplomas`,
          icon: Award,
        },
      ]
    }

    return baseLinks
  }

  const links = getSidebarLinks()
  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 right-4 z-40 p-2 bg-[#133A63] text-white rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-20 md:top-0 right-0 md:right-auto h-[calc(100vh-80px)] w-64 md:w-auto bg-white border-l md:border-l border-slate-200 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        } md:w-64 z-30`}
      >
        <nav className="p-6 space-y-3">
          {/* User Info */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <div className="text-sm font-bold text-[#133A63] mb-2">
              {userRole === 'super-admin' && 'المدير العام'}
              {userRole === 'admin' && 'المدير'}
              {userRole === 'instructor' && 'المدرب'}
            </div>
            <p className="text-xs text-[#475569]">مرحباً في لوحة التحكم</p>
          </div>

          {/* Navigation Links */}
          {links.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`sidebar-link flex items-center gap-3 ${
                  active ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            )
          })}

          {/* Logout */}
          <div className="pt-6 mt-8 border-t border-slate-200">
            <Link
              href="/"
              className="sidebar-link flex items-center gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

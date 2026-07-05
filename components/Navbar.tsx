'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/training', label: 'التدريب المهني' },
    { href: '/courses', label: 'الدورات' },
    { href: '/consultations', label: 'الاستشارات' },
    { href: '/studio', label: 'الاستوديو' },
    { href: '/events', label: 'المؤتمرات' },
    { href: '/contact', label: 'التواصل' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 backdrop-blur-md bg-opacity-95" style={{boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)'}}>
      <div className="container-custom flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-[#133A63] flex items-center justify-center font-black text-lg text-white transition-all duration-300" style={{boxShadow: '0 4px 12px -2px rgba(19, 58, 99, 0.15)'}}>
            RP
          </div>
          <span className="hidden sm:inline font-bold text-lg text-[#133A63] group-hover:text-[#B88424] transition-colors">
            Right Place
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#475569] hover:text-[#133A63] font-semibold transition-all duration-300 text-sm relative group"
            >
              {link.label}
              <span className="absolute -bottom-2 right-0 w-0 h-1 bg-[#B88424] group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Link href="/register" className="btn-primary hidden sm:inline-flex text-sm">
            تسجيل دخول
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#133A63]" />
            ) : (
              <Menu className="w-6 h-6 text-[#133A63]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="container-custom py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#B88424] rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="block w-full text-center btn-primary mt-4"
              onClick={() => setIsOpen(false)}
            >
              تسجيل دخول
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

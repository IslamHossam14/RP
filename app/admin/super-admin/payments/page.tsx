'use client'

import DashboardSidebar from '@/components/DashboardSidebar'
import StatCard from '@/components/StatCard'
import Navbar from '@/components/Navbar'
import { CreditCard, Download, Filter } from 'lucide-react'
import { mockPayments } from '@/data/mock-payments'
import { useState } from 'react'

export default function PaymentsPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  
  const filteredPayments = filter === 'all' 
    ? mockPayments 
    : mockPayments.filter(p => p.status === filter)

  const totalRevenue = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
  
  const totalTransactions = mockPayments.length
  const completedCount = mockPayments.filter(p => p.status === 'completed').length
  const pendingCount = mockPayments.filter(p => p.status === 'pending').length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="flex">
        <DashboardSidebar userRole="super-admin" />
        
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[#133A63] mb-2">
              نظام المدفوعات
            </h1>
            <p className="text-[#475569] font-semibold">
              إدارة وتتبع جميع عمليات الدفع والإيرادات
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              label="إجمالي الإيرادات"
              value={`${totalRevenue.toLocaleString('ar-SA')} ر.س`}
              icon={CreditCard}
              color="gold"
            />
            <StatCard
              label="إجمالي المعاملات"
              value={totalTransactions}
              icon={CreditCard}
              color="blue"
            />
            <StatCard
              label="معاملات مكتملة"
              value={completedCount}
              icon={CreditCard}
              color="green"
            />
            <StatCard
              label="معاملات معلقة"
              value={pendingCount}
              icon={CreditCard}
              color="red"
            />
          </div>

          {/* Filters and Actions */}
          <div className="dashboard-card mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-[#133A63]" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-[#133A63] font-semibold focus:outline-none focus:border-[#B88424]"
                >
                  <option value="all">جميع المعاملات</option>
                  <option value="completed">مكتملة</option>
                  <option value="pending">معلقة</option>
                  <option value="failed">فاشلة</option>
                </select>
              </div>
              <button className="btn-secondary flex items-center gap-2">
                <Download className="w-5 h-5" />
                تحميل التقرير
              </button>
            </div>
          </div>

          {/* Payments Table */}
          <div className="dashboard-card">
            <h2 className="text-2xl font-bold text-[#133A63] mb-6">
              سجل المدفوعات
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th>معرف المعاملة</th>
                    <th>المستخدم</th>
                    <th>البريد الإلكتروني</th>
                    <th>المبلغ</th>
                    <th>الدورة</th>
                    <th>طريقة الدفع</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="table-body font-semibold text-[#133A63]">
                        {payment.transactionId}
                      </td>
                      <td className="table-body font-semibold">
                        {payment.userName}
                      </td>
                      <td className="table-body">{payment.userEmail}</td>
                      <td className="table-body font-bold text-[#B88424]">
                        {payment.amount.toLocaleString('ar-SA')} ر.س
                      </td>
                      <td className="table-body text-sm">
                        {payment.courseTitle}
                      </td>
                      <td className="table-body text-sm">
                        {payment.paymentMethod === 'credit-card' && 'بطاقة ائتمان'}
                        {payment.paymentMethod === 'bank-transfer' && 'تحويل بنكي'}
                        {payment.paymentMethod === 'wallet' && 'محفظة'}
                      </td>
                      <td className="table-body">{payment.paymentDate}</td>
                      <td className="table-body">
                        <span
                          className={`badge ${
                            payment.status === 'completed'
                              ? 'badge-success'
                              : payment.status === 'pending'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
                          {payment.status === 'completed' && 'مكتمل'}
                          {payment.status === 'pending' && 'معلق'}
                          {payment.status === 'failed' && 'فاشل'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

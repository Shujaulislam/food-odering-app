import React from 'react'
import AdminLayout from '@/components/Layout/Admin/AdminLayout'
import Dashboard from '@/components/Layout/Admin/Dashboard'
export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className='text-3xl text-gray-500 text-center'>ADMIN DASHBOARD</h1>  
      <Dashboard />
    </AdminLayout>
  )
}

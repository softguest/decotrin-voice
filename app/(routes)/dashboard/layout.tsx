import React from 'react'
import AppHeader from './_components/AppHeader';
import Footer from '@/components/Footer';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="mb-40">
        <AppHeader />
        {children}
        <Footer />
    </div>
  )
}

export default DashboardLayout
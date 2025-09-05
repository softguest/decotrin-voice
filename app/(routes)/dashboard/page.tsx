"use client"
import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorAgentList from '@/app/(routes)/dashboard/_components/DoctorAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog'

const Dashboard
 = () => {
  return (
    <div className="px-10 md:px-20 lg:px-40 py-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">My Dashboard</h2>
        <AddNewSessionDialog />
      </div>
      <HistoryList />
      <DoctorAgentList />
    </div>
  )
}

export default Dashboard

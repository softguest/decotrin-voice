import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const BillingPage = () => {
  return (
    <div className="px-10 md:px-20 lg:px-40 py-10">
        <h2 className="font-bold text-3xl mt-2 mb-4">Join Subscription</h2>
        <PricingTable  />
    </div>
  )
}

export default BillingPage
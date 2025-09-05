import { AITherapistList } from '@/shared/list'
import React from 'react'
import TherapistAgentCard from './TherapistAgentCard'

const DoctorAgentList = () => {
  return (
    <div>
      <h2 className="font-bold text-xl">AI specialist Therapist</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5'>
        {AITherapistList.map((therapistAgent, index) => (
          <div key={index}>
            <TherapistAgentCard therapistAgent={therapistAgent}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAgentList
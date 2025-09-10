import React from 'react'
import { therapistAgent } from './TherapistAgentCard'
import Image from 'next/image'
import { SessionChatTable } from '@/config/schema'

type props = {
  therapistAgent: therapistAgent,
  setSelectedTherapist: any,
  selectedTherapist: therapistAgent
}

const SuggestedTherapistCard = ({therapistAgent,setSelectedTherapist, selectedTherapist }: props) => {
  return (
    <div className={`flex flex-col items-center 
      border rounded-2xl shadow p-5
      hover:border-blue-500 cursor-pointer
      ${selectedTherapist?.id == therapistAgent?.id ? 'border-blue-500' : ''}`} onClick={()=>setSelectedTherapist(therapistAgent)}>
      <Image src={therapistAgent?.image} 
        alt={therapistAgent?.specialist} 
        width={70} height={70} 
        className='w-[50px] h-[50px] rounded-4xl'
      />
      <h2 className='font-bold text-sm text-center'>{therapistAgent?.specialist}</h2>
      <p className='text-xs text-center line-clamp-2'>{therapistAgent?.description}</p>
    </div>
  )
}

export default SuggestedTherapistCard;
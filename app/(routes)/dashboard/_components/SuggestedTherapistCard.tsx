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
    <div
      className={`
        flex flex-col items-center rounded-2xl shadow-lg p-5 cursor-pointer
        border-2 transition-all duration-300
        bg-white/10 backdrop-blur-md
        hover:border-[#ff9245] 
        ${selectedTherapist?.id === therapistAgent?.id ? 'border-[#ff9245] bg-[#ff9245]/20' : 'border-white/20'}
      `}
      onClick={() => setSelectedTherapist(therapistAgent)}
    >
      <Image
        src={therapistAgent?.image}
        alt={therapistAgent?.specialist}
        width={100}
        height={100}
        className="w-[100px] h-[100px] border border-white/20 rounded-2xl"
      />
      <h2 className="font-bold text-sm text-center text-white mt-2">
        {therapistAgent?.specialist}
      </h2>
      <p className="text-xs text-center line-clamp-2 text-white/80 mt-1">
        {therapistAgent?.description}
      </p>
    </div>

  )
}

export default SuggestedTherapistCard;



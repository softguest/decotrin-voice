import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([])
  return (
    <div className='mt-10'>
      {historyList.length == 0 ? (
        <div className="w-full h-96 flex flex-col items-center justify-center p-7 border border-dashed rounded-2xl">
          <Image src={'/pngfold/therapist.png'} alt="No History" width={250} height={200} />
          <h2 className='font-bold text-xl mt-2'>No Recent Consultations</h2>
          <p>It looks like you haven't consulted a therapist yet.</p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div>
          {/* Render history list here */}
        </div>
      )}
    </div>
  )
}

export default HistoryList
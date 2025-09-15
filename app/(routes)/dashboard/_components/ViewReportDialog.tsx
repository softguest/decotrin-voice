import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger, 
  DialogHeader,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../therapy-agent/[sessionId]/page'
import moment from 'moment'

type props = {
    record:SessionDetail
}

const ViewReportDialog = ({record}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'} className='mt-3'>View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className='text-center text-4xl'>Therapy AI Voice Agent Report</h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className='mt-10'>
                <h2 className="font-bold text-blue-500 text-lg">Video Info:</h2>
                <div className='grid grid-cols-2'> 
                    <h2><span className='font-bold'>Therapy Specialization:</span> {record.selectedTherapist?.specialist}</h2>
                    <p>Session Date: { moment (new Date(record?.createdOn)).fromNow()}</p>
                </div>
                <div className='grid grid-cols-2'> 
                    <p><span className='font-bold'>Therapy Specialization:</span> {record.selectedTherapist?.description}</p>
                    <p>Session Date: {record.notes}</p>
                    {/* <p>Created On: {record.report?.}</p> */}
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Dialog>

          </Dialog>
        </DialogFooter>   
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog
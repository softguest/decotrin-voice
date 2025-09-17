import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import ViewReportDialog from './ViewReportDialog'
import { SessionDetail } from '../therapy-agent/[sessionId]/page'

type Props={
    historyList:SessionDetail[]
}

const HistoryTable = ({ historyList }: Props ) => {
  return (
    // <div>
    //     <Table>
    //         <TableCaption>Previous Therapy Session Reports</TableCaption>
    //         <TableHeader>
    //             <TableRow>
    //               <TableHead className='font-bold'>AI therapist</TableHead>
    //               <TableHead className='font-bold'>Description</TableHead>
    //               <TableHead className='font-bold'>Date</TableHead>
    //               <TableHead className="text-right font-bold">Action</TableHead>
    //             </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //             {historyList.map((record:SessionDetail,index:number)=>(
    //                  <TableRow  key={record.sessionId}>
    //                   <TableCell className="font-medium">{record.selectedTherapist?.specialist}</TableCell>
    //                   <TableCell>{record.notes}</TableCell>
    //                   <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
    //                   <TableCell className="text-right"><ViewReportDialog record={record}/></TableCell>
    //                 </TableRow>
    //             ))}
                   
    //         </TableBody>
    //     </Table>
    // </div>
<div className="overflow-x-auto rounded-2xl shadow-md md:bg-[#005f59] md:p-5">
  <Table>
    <TableCaption className="text-gray-300 mb-2">
      Previous Reports
    </TableCaption>

    {/* Table Head with soft teal tint */}
    <TableHeader>
      <TableRow className="bg-teal-50 text-teal-700 uppercase text-sm">
        <TableHead className="font-bold">AI Therapist</TableHead>
        <TableHead className="font-bold">Description</TableHead>
        <TableHead className="font-bold">Date</TableHead>
        <TableHead className="text-right font-bold">Action</TableHead>
      </TableRow>
    </TableHeader>

    {/* Table Body with therapeutic striped rows */}
    <TableBody>
      {historyList.map((record: SessionDetail, index: number) => (
        <TableRow
          key={record.sessionId}
          className="odd:bg-white even:bg-teal-50 hover:bg-teal-100 transition-colors"
        >
          <TableCell className="font-medium text-teal-900">
            {record.selectedTherapist?.specialist}
          </TableCell>
          <TableCell className="max-w-xs truncate text-teal-800">
            {record.notes}
          </TableCell>
          <TableCell className="text-teal-700">
            {moment(new Date(record.createdOn)).fromNow()}
          </TableCell>
          <TableCell className="text-right">
            {/* Therapy-inspired action button */}
            <ViewReportDialog
              record={record}
              //@ts-ignore
              trigger={
                <button className="px-3 py-1.5 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition">
                  View Report
                </button>
              }
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>


  )
}

export default HistoryTable
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
import { View } from 'lucide-react'

type Report = {
  agent?: string
  user?: string
  sessionId?: string
  timestamp?: string
  chiefComplaint?: string
  summary?: string
  triggers?: string[]
  duration?: string
  severity?: string
  medicationsMentioned?: string[]
  recommendations?: string[]
}

type props = {
  record: SessionDetail
}

const ViewReportDialog = ({ record }: props) => {
  const report: Report = (record?.report as Report) || {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="mt-3">
          <View className="w-4 h-4 mr-1" /> View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-3xl font-bold">
              Therapy AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-6 mt-6">

              {/* Basic Info */}
              <section>
                <h2 className="font-bold text-blue-500 text-lg mb-2">Session Info</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="font-bold">Agent:</span> {report.agent}</p>
                  <p><span className="font-bold">User:</span> {report.user}</p>
                  <p><span className="font-bold">Session ID:</span> {report.sessionId}</p>
                  <p><span className="font-bold">Timestamp:</span> {report.timestamp ? moment(report.timestamp).format("LLL") : "-"}</p>
                  <p><span className="font-bold">Created On:</span> {record?.createdOn ? moment(record.createdOn).fromNow() : "-"}</p>
                </div>
              </section>

              {/* Chief Complaint */}
              <section>
                <h2 className="font-bold text-blue-500 text-lg mb-2">Chief Complaint</h2>
                <p>{report.chiefComplaint || "N/A"}</p>
              </section>

              {/* Summary */}
              <section>
                <h2 className="font-bold text-blue-500 text-lg mb-2">Summary</h2>
                <p>{report.summary || "N/A"}</p>
              </section>

              {/* Triggers */}
              <section>
                <h2 className="font-bold text-blue-500 text-lg mb-2">Triggers</h2>
                {report.triggers?.length ? (
                  <ul className="list-disc list-inside">
                    {report.triggers.map((t: string, i: number) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <p>N/A</p>
                )}
              </section>

              {/* Duration & Severity */}
              <section>
                <h2 className="font-bold text-blue-500 text-lg mb-2">Trauma Details</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="font-bold">Duration:</span> {report.duration || "N/A"}</p>
                  <p><span className="font-bold">Severity:</span> {report.severity || "N/A"}</p>
                </div>
              </section>

              {/* Medications */}
              <section>
                <h2 className="font-bold text-blue-500 text-lg mb-2">Medications Mentioned</h2>
                {report.medicationsMentioned?.length ? (
                  <ul className="list-disc list-inside">
                    {report.medicationsMentioned.map((m: string, i: number) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                ) : (
                  <p>None</p>
                )}
              </section>

              {/* Recommendations */}
              <section>
                <h2 className="font-bold text-blue-500 text-lg mb-2">Recommendations</h2>
                {report.recommendations?.length ? (
                  <ul className="list-disc list-inside">
                    {report.recommendations.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No recommendations provided</p>
                )}
              </section>

            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog

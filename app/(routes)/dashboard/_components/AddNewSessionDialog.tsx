"use client"
import React, { useEffect, useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Loader2 } from 'lucide-react'
import { therapistAgent } from './TherapistAgentCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import HistoryList from './HistoryList'
import SuggestedTherapistCard from './SuggestedTherapistCard'
import { SessionDetail } from '../therapy-agent/[sessionId]/page'

const AddNewSessionDialog = () => {
  const [note, setNote] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [suggestedTherapists, setSuggestedTherapists] = useState<therapistAgent[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<therapistAgent>()

  const router = useRouter()
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: 'pro'})
  
    useEffect(() => {
      GetHistoryList();
    }, [])
  
    const GetHistoryList = async () => {
      const result= await axios.get('/api/session-chat?sessionId=all');
      console.log(result.data);
      setHistoryList(result.data);
    }

  const OnClickNext = async () => {
    setLoading(true)
    const result = await axios.post('/api/suggest-therapists', {
      notes: note
    })

    console.log(result.data)
    setSuggestedTherapists(result.data) // make sure API returns TherapistAgent[]
    setLoading(false)
  }

  const onStartSession = async () => {
  setLoading(true)
  try {
    const result = await axios.post('/api/session-chat', {
      notes: note,
      selectedTherapist: selectedTherapist
    })

    console.log(result.data)

    if (result.data?.sessionId) {
      router.push('/dashboard/therapy-agent/' + result.data.sessionId)
      return; // stop execution after redirect
    }

    console.error("No sessionId returned from API")
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="therapeutic2" 
          className="mt-3"
          disabled={!paidUser && HistoryList?.length >= 1}
        >
          + Start A Therapy Session
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-[#ff9245]">
            Add Basic Details!
          </DialogTitle>

          <DialogDescription asChild>
            <div className="mt-4 space-y-6">
              {suggestedTherapists.length === 0 ? (
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white  mb-2">
                    Add Trauma Topic or Any Other Details
                  </h2>
                  <Textarea
                    placeholder="Add Details here..."
                    className="h-[200px] bg-white/20 backdrop-blur-md border border-white/70 text-white placeholder-white/60 rounded-lg p-4 w-full transition-all focus:ring-2 focus:ring-[#ff9245]"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-lg md:text-xl font-medium text-white mb-4">
                    Select Therapist
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {suggestedTherapists.map((therapist, index) => (
                        <SuggestedTherapistCard
                          therapistAgent={therapist}
                          key={therapist.id ?? index}
                          setSelectedTherapist={() => setSelectedTherapist(therapist)}
                          //@ts-ignore
                          selectedTherapist={selectedTherapist}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
          <Button
            variant="outline"
            className="border-white/40 text-slate-600 hover:bg-white/10 hover:text-white hover:border-[#ff9245] cursor-pointer"
          >
            Cancel
          </Button>

          {suggestedTherapists.length === 0 ? (
            <Button
              disabled={!note || loading}
              onClick={OnClickNext}
              className="bg-[#ff9245] text-white hover:bg-[#ff9245]/90 flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <span className='font-bold'>Next</span> <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedTherapist}
              onClick={onStartSession}
              className="bg-[#00a896] text-white hover:bg-[#00a896]/90 flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <span className='font-bold'>Start Therapy</span> <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewSessionDialog
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
        <Button variant="therapeutic2" className='mt-3' disabled={!paidUser&&HistoryList?.length>=1}>+ Start A Therapy Session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basis Details!</DialogTitle>
          <DialogDescription asChild>
            {suggestedTherapists.length === 0 ?
              <div>
                <h2>Add Trauma Topic or Any Other Details</h2>
                <Textarea
                  placeholder="Add Details here... "
                  className="h-[200px] mt-1"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            : 
              <div>
                <h2>Select Therapist</h2>
                <div className="grid grid-cols-3 gap-5">
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
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Dialog>
            <Button variant={'outline'}>Cancel</Button>
          </Dialog>
          <Dialog>
            <Button disabled={ !note || loading } onClick={OnClickNext}>
                Next {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}</Button>
            : <Button disabled={loading || !selectedTherapist} onClick={()=>onStartSession()}>Start Therapy
              {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />} </Button>
          </Dialog>
        </DialogFooter>   
      </DialogContent>
    </Dialog>
  )
}

export default AddNewSessionDialog

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
//   DialogTrigger,
//   DialogHeader,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ArrowRight, Loader2 } from "lucide-react";
// import { therapistAgent } from "./TherapistAgentCard";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";
// import HistoryList from "./HistoryList";
// import SuggestedTherapistCard from "./SuggestedTherapistCard";
// import { SessionDetail } from "../therapy-agent/[sessionId]/page";

// const AddNewSessionDialog = () => {
//   const [note, setNote] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [suggestedTherapists, setSuggestedTherapists] = useState<
//     therapistAgent[]
//   >([]);
//   const [selectedTherapist, setSelectedTherapist] = useState<
//     therapistAgent | undefined
//   >();

//   const router = useRouter();
//   const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

//   const { has } = useAuth();
//   //@ts-ignore
//   const paidUser = has && has({ plan: "pro" });

//   useEffect(() => {
//     GetHistoryList();
//   }, []);

//   const GetHistoryList = async () => {
//     const result = await axios.get("/api/session-chat?sessionId=all");
//     console.log(result.data);
//     setHistoryList(result.data);
//   };

//   const OnClickNext = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post("/api/suggest-therapists", {
//         notes: note,
//       });
//       console.log(result.data);
//       setSuggestedTherapists(result.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onStartSession = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post("/api/session-chat", {
//         notes: note,
//         selectedTherapist: selectedTherapist,
//       });

//       console.log(result.data);

//       if (result.data?.sessionId) {
//         router.push("/dashboard/therapy-agent/" + result.data.sessionId);
//         return;
//       }
//       console.error("No sessionId returned from API");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onCancel = () => {
//     setNote("");
//     setSuggestedTherapists([]);
//     setSelectedTherapist(undefined);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           variant="therapeutic2"
//           className="mt-3"
//           disabled={!paidUser && historyList?.length >= 1}
//         >
//           + Start A Therapy Session
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Basis Details!</DialogTitle>
//           <DialogDescription asChild>
//             {suggestedTherapists.length === 0 ? (
//               <div>
//                 <h2>Add Trauma Topic or Any Other Details</h2>
//                 <Textarea
//                   placeholder="Add Details here... "
//                   className="h-[200px] mt-1"
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                 />
//               </div>
//             ) : (
//               <div>
//                 <h2>Select Therapist</h2>
//                 <div className="grid grid-cols-3 gap-5">
//                   {suggestedTherapists.map((therapist, index) => (
//                     <SuggestedTherapistCard
//                       therapistAgent={therapist}
//                       key={therapist.id ?? index}
//                       setSelectedTherapist={() =>
//                         setSelectedTherapist(therapist)
//                       }
//                       //@ts-ignore
//                       selectedTherapist={selectedTherapist}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </DialogDescription>
//         </DialogHeader>

//         <DialogFooter>
//           {/* Cancel resets form */}
//           <Button variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>

//           {/* Show Next only if no therapists yet */}
//           {suggestedTherapists.length === 0 && (
//             <Button disabled={!note || loading} onClick={OnClickNext}>
//               {loading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <>
//                   Next <ArrowRight />
//                 </>
//               )}
//             </Button>
//           )}

//           {/* Show Start Therapy only if therapists are suggested */}
//           {suggestedTherapists.length > 0 && (
//             <Button
//               disabled={loading || !selectedTherapist}
//               onClick={onStartSession}
//               className="bg-green-600 text-white hover:bg-green-700"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <>
//                   Start Therapy <ArrowRight />
//                 </>
//               )}
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddNewSessionDialog;


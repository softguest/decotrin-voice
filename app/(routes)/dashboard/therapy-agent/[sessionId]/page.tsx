"use client"
import React, { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'
import axios from 'axios';
import { therapistAgent } from '../../_components/TherapistAgentCard';
import { Circle, Loader, LucidePhoneForwarded, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import  Vapi  from '@vapi-ai/web';
import Provider from '@/provider';
import { toast } from 'sonner';
import { press } from 'framer-motion';
export type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON
  selectedTherapist: therapistAgent,
  createdOn: string,
}

type messages = {
  role: string,
  text: string,
}

function TherapyVoiceAgent () {
  const [loading, setLoading ] = useState(false);
    const { sessionId } = useParams();
    const [ sessionDetail, setSessionDetail ] = useState<SessionDetail>();
    const [ callStarted, setCallStarted ] = useState(false);
    const [ vapiInstance, setVapiInstance ] = useState<any>();
    const [ currentRoll, setCurrentRole ] = useState<string | null>()
    const [ liveTranscript, setLiveTranscript ] = useState<string>()
    const [ messages, setMessages ] = useState<messages[]>([]);

    const router = useRouter();
    
    useEffect(() => {
        sessionId&&GetSessionDetails();
    }, [sessionId]);

    const GetSessionDetails = async () => {
        const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
        console.log(result.data);
        setSessionDetail(result.data);
    }


    // const StartCall = () => {
    //   setLoading(true);
    //   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    //   setVapiInstance(vapi); // for future reference

    //   const VapiAgentConfig = {
    //     name: 'AI Trauma Therapist',
    //     firstMessage: "hi there, hope you are feeling well today?",
    //     transcriber: {
    //       provider: 'assembly-ai',
    //       language: 'en'
    //     },
    //     voice: {
    //       provider: 'deepgram',
    //       voiceId: sessionDetail?.selectedTherapist?.voiceId
    //     },
    //     model: {
    //       provider: 'google',
    //       model: 'gemini-2.0-flash',
    //       messages: [
    //         {
    //           role: 'system',
    //           content: sessionDetail?.selectedTherapist?.agentPrompt || 'Provide empathetic support.'
    //         } 
    //       ]
    //     }
    //   };

    //   //@ts-ignore
    //   // vapi.start(VapiAgentConfig);
    //   vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);

    //   // Use local variable 'vapi' here
    //   vapi.on('call-start', () => {
    //     console.log('Call started');
    //     setCallStarted(true);
    //   });

    //   vapi.on('call-end', () => {
    //     console.log('Call ended');
    //     setCallStarted(false);
    //   });

    //   vapi.on('message', (message) => {
    //     if (message.type === 'transcript') {
    //       const { role, transcriptType, transcript } = message;
    //       console.log(`${role}: ${transcript}`);
    //       if (transcriptType === 'partial') {
    //         setLiveTranscript(transcript);
    //         setCurrentRole(role);
    //       } else if (transcriptType === 'final') {
    //         setMessages((prev: any) => [...prev, { role, text: transcript }]);
    //         setLiveTranscript(''); 
    //         setCurrentRole(null);
    //       }
    //     }
    //   });

    //   vapi.on('speech-start', () => {
    //     console.log('Assistant started speaking');
    //     setCurrentRole('assistant');
    //   });

    //   vapi.on('speech-end', () => {
    //     console.log('Assistant stopped speaking');
    //     setCurrentRole('user');
    //   });

    //   setLoading(false);
    // };


    // const endCall = async () => {
    //   setLoading(true);
    //   if (!vapiInstance) return;
    //     vapiInstance.stop();

    //     vapiInstance.off('call-start');
    //     vapiInstance.off('call-end');
    //     vapiInstance.off('message');
    //     vapiInstance.off('speech-start');
    //     vapiInstance.off('speech-end');


    //     setCallStarted(false);
    //     vapiInstance.removeAllListeners();
    //     setVapiInstance(null); 
    //     toast.success('Your report is generated!')

    //     const result = await GenerateReport()
    //     setLoading(false);
    //     router.replace('/dashboard');
    // };

    // ---- StartCall ----
const StartCall = () => {
  setLoading(true);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
  setVapiInstance(vapi); // keep instance for cleanup later

  // Agent config (not used if you're starting with Voice Assistant ID)
  const VapiAgentConfig = {
    name: 'AI Trauma Therapist',
    firstMessage: "hi there, hope you are feeling well today?",
    transcriber: {
      provider: 'assembly-ai',
      language: 'en',
    },
    voice: {
      provider: 'deepgram',
      voiceId: sessionDetail?.selectedTherapist?.voiceId,
    },
    model: {
      provider: 'google',
      model: 'gemini-2.0-flash',
      messages: [
        {
          role: 'system',
          content:
            sessionDetail?.selectedTherapist?.agentPrompt ||
            'Provide empathetic support.',
        },
      ],
    },
  };

  // If you want to use config directly:
  // vapi.start(VapiAgentConfig);

  // If you’re using assistant ID:
  vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);

  // Event listeners
  vapi.on('call-start', () => {
    console.log('Call started');
    setCallStarted(true);
  });

  vapi.on('call-end', () => {
    console.log('Call ended');
    setCallStarted(false);
  });

  vapi.on('message', (message: any) => {
    if (message.type === 'transcript') {
      const { role, transcriptType, transcript } = message;
      console.log(`${role}: ${transcript}`);

      if (transcriptType === 'partial') {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      } else if (transcriptType === 'final') {
        setMessages((prev: any) => [...prev, { role, text: transcript }]);
        setLiveTranscript('');
        setCurrentRole(null);
      }
    }
  });

  vapi.on('speech-start', () => {
    console.log('Assistant started speaking');
    setCurrentRole('assistant');
  });

  vapi.on('speech-end', () => {
    console.log('Assistant stopped speaking');
    setCurrentRole('user');
  });

  setLoading(false);
};

// ---- endCall ----
const endCall = async () => {
  setLoading(true);
  if (!vapiInstance) return;

  // Stop the call
  vapiInstance.stop();

  // ✅ Clean up all listeners safely
  if (typeof vapiInstance.removeAllListeners === 'function') {
    vapiInstance.removeAllListeners();
  }

  setCallStarted(false);
  setVapiInstance(null);
  toast.success('Your report is generated!');

  // Generate report
  const result = await GenerateReport();
  setLoading(false);
  router.replace('/dashboard');
};


    const GenerateReport = async () => {
      const result = await axios.post('/api/session-report', {
        messages:messages,
        sessionDetail:sessionDetail,
        sessionId:sessionId
      })
      console.log("this is the result data "+ result.data);
      return result.data;
    }
 
    return (
      // <div className="px-10 md:px-20 lg:px-40 py-10">
      //   <div className='p-5 border rounded-3xl bg-[#005f59]'>
      //     <div className='flex justify-between items-center border-b p-3'>
      //       <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'> <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />{callStarted ? 'Connected...' : 'Not Connected'}</h2>
      //       <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      //     </div>
      //     {sessionDetail &&
      //       <div className="flex items-center flex-col mt-10">
      //         {sessionDetail?.selectedTherapist?.image ? (
      //           <Image 
      //             src={sessionDetail?.selectedTherapist?.image } 
      //             alt={sessionDetail?.selectedTherapist?.specialist} 
      //             width={120} height={120} 
      //             className='h-[150px] w-[150px] object-cover rounded-full border-[5px] border-slate-400 shadow-lg'
      //           />
      //         ) : (
      //           <div className='h-[100px] w-[100px] bg-gray-200 rounded-full flex items-center justify-center'>
      //             <span>No Image</span>
      //           </div>
      //         )}
      //         <h2 className='mt-2 text-lg text-white font-bold'>{sessionDetail?.selectedTherapist?.specialist}</h2>
      //         <p className='text-sm text-white'>AI Therapy Agent</p>
      //         <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
      //           {messages?.slice(-4).map((msg:messages, index)=> (
      //               <h2 className='text-white p-2' key={index} >{msg.role} : {msg.text}</h2>
      //           ))}
                
      //           {liveTranscript&&liveTranscript?.length>0&&<h2 className='text-lg'>{currentRoll} : {liveTranscript}</h2>}
      //         </div>
      //         {!callStarted ?
      //           <Button onClick={StartCall} className="mt-20" disabled={loading} > 
      //             {loading ? <Loader className='animate-spin'/> : <LucidePhoneForwarded />}Start Session
      //           </Button>
      //           : <Button variant={'destructive'} onClick={endCall} disabled={loading}>
      //               {loading ? <Loader className='animate-spin'/> : <PhoneOff />}Disconnect Call
      //             </Button>
      //         }
      //       </div>
      //     }
      //   </div>
      // </div>
      <div className="px-10 md:px-20 lg:px-40 py-10">
        <div className="p-5 rounded-3xl bg-[#005f59]/10 backdrop-blur-lg border border-[#ff9245]/30 shadow-lg">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#ff9245]/50 pb-3 mb-5">
            <h2 className="p-1 px-3 border rounded-md flex gap-2 items-center text-state-400 text-sm">
              <span className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />
              {callStarted ? 'Connected...' : 'Not Connected'}
            </h2>
            <h2 className="font-bold text-xl text-slate-400 tracking-widest">00:00</h2>
          </div>

          {sessionDetail && (
            <div className="flex flex-col items-center mt-5">
              {/* Therapist Image */}
              {sessionDetail?.selectedTherapist?.image ? (
                <Image
                  src={sessionDetail.selectedTherapist.image}
                  alt={sessionDetail.selectedTherapist.specialist}
                  width={150}
                  height={150}
                  className="h-[150px] w-[150px] object-cover rounded-full border-4 border-[#ff9245]/50 shadow-xl"
                />
              ) : (
                <div className="h-[120px] w-[120px] bg-white/20 rounded-full flex items-center justify-center text-white/80">
                  No Image
                </div>
              )}

              {/* Therapist Info */}
              <h2 className="mt-4 text-xl font-bold text-[#00a896]">{sessionDetail.selectedTherapist?.specialist}</h2>
              <p className="text-sm text-[#00a896]">AI Therapy Agent</p>

              {/* Messages / Transcript */}
              <div className="mt-8 w-full max-w-3xl overflow-y-auto flex flex-col items-center gap-2 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                {messages?.slice(-4).map((msg: messages, index) => (
                  <div
                    key={index}
                    className={`w-full p-2 rounded-md ${
                      msg.role === 'user' ? 'bg-[#ff9245]/20 text-white' : 'bg-[#005f59]/30 text-white'
                    }`}
                  >
                    <strong>{msg.role}:</strong> {msg.text}
                  </div>
                ))}
                {liveTranscript && liveTranscript.length > 0 && (
                  <div className="w-full p-2 bg-[#005f59]/40 rounded-md text-white">
                    <strong>{currentRoll}:</strong> {liveTranscript}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex gap-4">
                {!callStarted ? (
                  <Button
                    onClick={StartCall}
                    disabled={loading}
                    className="bg-[#ff9245] hover:bg-[#ffb36b] text-white shadow-lg px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    {loading ? <Loader className="animate-spin" /> : <LucidePhoneForwarded />} Start Session
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={endCall}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white shadow-lg px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    {loading ? <Loader className="animate-spin" /> : <PhoneOff />} Disconnect Call
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

  )
}

export default TherapyVoiceAgent

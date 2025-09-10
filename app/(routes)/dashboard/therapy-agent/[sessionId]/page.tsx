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
        const result= await axios.get('/api/session-chat?sessionId='+sessionId);
        console.log(result.data);
        setSessionDetail(result.data);
    }

    const StartCall = () => {
      setLoading(true);
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
      setVapiInstance(vapi);

      const VapiAgentConfig = {
        name: 'AI War Trauma Therapist',
        firstMessage:"hi there hopw you are feeling well today?",
        transcriber:{
          provider:'assembly-ai',
          language: 'en'
        },
        voice: {
          provider: 'playht',
          voiceId: sessionDetail?.selectedTherapist?.voiceId
        },
        model:{
          provider:'openai',
          model:'gpt-4',
          messages: [
            {
              role: 'system',
              content:sessionDetail?.selectedTherapist?.agentPrompt
            }
          ]
        }
      }
      //@ts-ignore
      vapi.start(VapiAgentConfig);

      vapi.on('call-start', () => {console.log('Call started')
      setCallStarted(true);
      });

      vapi.on('call-end', () => {
        console.log('Call ended')
      setCallStarted(false);
      });

      vapi.on('message', (message) => {
        if (message.type === 'transcript') {
          const {role, transcriptType, transcript} = message
          console.log(`${message.role}: ${message.transcript}`);
          if(transcriptType=='partial'){
            setLiveTranscript(transcript);
            setCurrentRole(role)
          }
          else if(transcriptType == 'final'){
            setMessages((prev: any)=>[...prev,{role:role,text:transcript}])
            setLiveTranscript("");
            setCurrentRole(null);
          }
        }
      });

      vapiInstance.on('speech-start', () => {
        console.log('Assistant started speaking');
        setCurrentRole('assistant');
      });

      vapiInstance.on('speech-start', () => {
        console.log('Assistant stopped speaking');
        setCurrentRole('user');
      });

    }

    const endCall = async () => {
      setLoading(true);
      if (!vapiInstance) return;
        vapiInstance.stop();

        vapiInstance.off('call-start');
        vapiInstance.off('call-end');
        vapiInstance.off('call-message');
        vapiInstance.off('speech-start');
        vapiInstance.off('speech-end');

        setCallStarted(false);
        setVapiInstance(null); 

        toast.success('Your report is generated!')

        // const result = await GenerateReport()
        router.replace('/dashboard');
    };

    const GenerateReport = async () => {
      const result = await axios.post('/api/session-report', {
        messages:messages,
        sessionDetail:sessionDetail,
        sessionId:sessionId
      })
      console.log(result.data);
      return result.data;
    }
 
    return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center border-b p-3'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'> <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />{callStarted ? 'Connected...' : 'Not Connected'}</h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
        {/* {sessionId} */}
      </div>
      {sessionDetail &&
        <div className="flex item-center flex-col mt-10">
          <Image src={sessionDetail?.selectedTherapist?.image} alt={sessionDetail?.selectedTherapist?.specialist} 
            width={120} height={120} 
            className='h-[100px] w-[100px] object-cover rounded-full'
          />
          <h2 className='mt-2 text-lg'>{sessionDetail?.selectedTherapist?.specialist}</h2>
          <p className='text-sm text-gray-500'>AI Therapist Agent</p>
          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg:messages, index)=> (
                <h2 className='text-gray-500 p-2' key={index} >{msg.role} : {msg.text}</h2>
            ))}
            
            {liveTranscript&&liveTranscript?.length>0&&<h2 className='text-lg'>{currentRoll} : {liveTranscript}</h2>}
          </div>
          {!callStarted ?
            <Button onClick={StartCall} className="mt-20" disabled={loading} > 
              {loading ? <Loader className='animate-spin'/> : <LucidePhoneForwarded />}Start Session
            </Button>
            : <Button variant={'destructive'} onClick={endCall} disabled={loading}>
                 {loading ? <Loader className='animate-spin'/> : <PhoneOff />}Disconnect Call
              </Button>
          }
        </div>
      }
    </div>
  )
}

export default TherapyVoiceAgent

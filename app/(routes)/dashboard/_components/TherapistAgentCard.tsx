// import { Button } from '@/components/ui/button'
// import { IconArrowRight } from '@tabler/icons-react'
// import Image from 'next/image'
// import React from 'react'
// export type therapistAgent = {
//     id: number,
//     specialist: string,
//     description: String,
//     image: string,
//     agentPrompt:string
// }

// export type probs = {
//     therapistAgent: therapistAgent
// }

// const TherapistAgentCard = ({ therapistAgent }: probs) => {
//   return (
//     <div className=''>
//       <Image 
//         src={therapistAgent.image} 
//         alt={therapistAgent.specialist} 
//         width={300} 
//         height={200}
//         className='w-full h-[250px] object-cover rounded-xl'
//       />
//       <h2 className='font-bold text-lg'>{therapistAgent.specialist}</h2>
//       <p className='line-clamp-2 mt-1 text-sm text-gray-500'>{therapistAgent.description}</p>
//       <Button className="w-full mt-2">Start Session <IconArrowRight /></Button>
//     </div>
//   )
// }

// export default TherapistAgentCard


// // "use client";

// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Agent } from "http";
// // import { NotebookPen } from "lucide-react";

// // // Export a list of therapist agents (data)
// // export const therapistAgent = [
// //   {
// //     id: "1",
// //     specialist: "Mindful Mentor",
// //     description: "Stress & Anxiety Relief",
// //     image: "/images/therapists/mindful-mentor.jpg",
// //     agentPrompt: "You are a therapist specializing in mindfulness and stress relief.",
// //   },
// //   {
// //     id: "2",
// //     specialist: "Motivation Coach",
// //     // specialty: "Goal Setting & Productivity",
// //     description: "Encourages you to stay motivated and focused.",
// //     image: "/images/therapists/motivation-coach.jpg",
// //     Agentprompt: "You are a therapist specializing in motivation and productivity.",
// //   },
// //   {
// //     id: "3",
// //     specialist: "Compassion Listener",
// //     // specialty: "Emotional Support",
// //     description: "Provides empathetic listening and gentle advice.",
// //     image: "/images/therapists/compassion-listener.jpg",
// //     agentPrompt: "You are a therapist specializing in emotional support and empathy.",
// //   },
// // ];

// // // Default export: TherapistAgentCard component
// // export default function TherapistAgentCard({
// //   agent,
// // }: {
// //   agent: (typeof therapistAgent)[number];
// // }) {
// //   return (
// //     <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
// //       <CardHeader>
// //         <CardTitle className="flex items-center gap-2">
// //           <NotebookPen className="w-5 h-5 text-blue-500" />
// //           {agent.specialist}
// //         </CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <p className="text-sm text-muted-foreground">{agent.description}</p>
// //         <p className="mt-2 text-xs">{agent.description}</p>
// //       </CardContent>
// //     </Card>
// //   );
// // }


import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export type therapistAgent = {
  id: number
  specialist: string
  description: string
  image: string
  agentPrompt: string
  voiceId?: string,
  subscriptionRequired:boolean
}

export type Props = {
  therapistAgent: therapistAgent
}

const TherapistAgentCard = ({ therapistAgent }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: 'pro'})
  console.log(paidUser);

    const onStartSession = async () => {
    setLoading(true)
    const result = await axios.post('/api/session-chat', {
      notes: 'New Query',
      selectTherapist: therapistAgent 
    })

    console.log(result.data)
    if (result.data?.sessionId) {
      router.push('/dashboard/therapy-agent/' + result.data.sessionId)
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      {therapistAgent.subscriptionRequired&&
      <Badge className="absolute m-2 right-0">Premium</Badge>
      }
      <Image 
        src={therapistAgent.image} 
        alt={therapistAgent.specialist} 
        width={300} 
        height={200}
        className='w-full h-[250px] object-cover rounded-xl'
      />
      <h2 className='font-bold text-lg'>{therapistAgent.specialist}</h2>
      <p className='line-clamp-2 mt-1 text-sm text-gray-500'>{therapistAgent.description}</p>
      <Button 
        onClick={onStartSession} 
        className="w-full mt-2" 
        disabled={!paidUser&&therapistAgent.subscriptionRequired}
      >
        Start Session {loading?<Loader2Icon className='animate-spin'/> : <IconArrowRight />}</Button>
    </div>
  )
}

export default TherapistAgentCard

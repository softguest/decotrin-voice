"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger, 
    DialogHeader,
    DialogFooter
}from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, NotebookPen } from 'lucide-react';
import TherapistAgentCard, { therapistAgent } from './TherapistAgentCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddNewSessionDialog = () => {
    const [note, setNote] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [suggestedTherapists, setSuggestedTherapists] = useState( therapistAgent );
    const [selectTherapist, setSelectTherapist] = useState<therapistAgent>();
    const router = useRouter();

    const OnClickNext = async() => {
        setLoading(true);
        const result = await axios.post('/api/suggest-therapists',{
            notes: note
    });

    console.log(result.data);
    setSuggestedTherapists(result.data);
    setLoading(false);
    }

    const onStartSession = async() => {
        setLoading(true);
        const result = await axios.post('/api/session-chat',{
            notes: note,
            selectTherapist: selectTherapist
        });

        console.log(result.data);
        if(result.data?.sessionId){
            console.log(result.data.sessionId);
            //Route new Conversation Page
            router.push('/dashboard/therapy-agent/' + result.data.sessionId);
        } 
        setLoading(false);
    }

  return (
    <Dialog>
        <DialogTrigger>
            <Button className='mt-3'>Start A Therapy Session</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add Basis Details!</DialogTitle>
            <DialogDescription asChild>
                <div>
                    <h2>Add Trauma Topic or Any Other Details</h2>
                    <Textarea 
                        placeholder="Add Details here... " 
                        className="h-[200px] mt-1"
                        onChange={(e) => setNote(e.target.value)}
                        />
                </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Dialog>
                    <Button variant={'outline'}>Cancel</Button>
                </Dialog>
                <Dialog>
                    <Button disabled={!note}>Next <ArrowRight /></Button>
                </Dialog>
            </DialogFooter>   
        </DialogContent>
    </Dialog>
  )
}

export default AddNewSessionDialog
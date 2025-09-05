"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';

const TherapistAgent
 = () => {
    const { sessionId } = useParams();

    useEffect(() => {
        sessionId&&GetSessionDetails();
    }, [sessionId]);

    const GetSessionDetails = async () => {
        const result= await axios.get('/api/session-chat?sessionId='+sessionId);
        console.log(result.data);
    }

    return (
    <div>
      TherapistAgent
      <div>
        {sessionId}
      </div>
    </div>
  )
}

export default TherapistAgent

"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { UserDetailContext } from './context/UserDetailContext';

export type UserDetail = {
    id: string;
    email: string;
    name: string;
    credits: number;
}; 

function Provider ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

const {user} = useUser();
const [userDetail, setUserDetail] = useState<any>();

useEffect(() => {
    user&&CreateNewUser();
}, [])

const CreateNewUser = async () => {
    const result = await axios.post('/api/users');
    console.log(result.data);
}
  return (
    <div>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
        {children}
      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider

function userUser(): { user: any; } {
  throw new Error('Function not implemented.');
}

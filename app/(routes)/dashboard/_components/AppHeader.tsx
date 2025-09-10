import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const AppHeader = () => {

    const menuOptions = [
        {id: 1, name: "Home", path: "/dashboard"},
        {id: 2, name: "History", path: "/dashboard/history"},
        {id: 3, name: "Pricing", path: "/dashboard/billing"},
        {id: 4, name: "Profile", path: "/profile"},
    ]
  return (
    <div className='w-full h-16 bg-white border-b border-b-gray-200 px-8 flex items-center justify-between shadow px-10 md:px-20 lg:px-40'>
        <div className="font-bold ">DECOTRIN</div>
        <div className="hidden md:flex gap-12 items-center">
            {menuOptions.map((option,index) => (
                <Link href={option.path} key={index}>
                    <h2 className="hover:font-bold cursor-pointer transition-all">{option.name}</h2>
                </Link>
            ))}
        </div>
        <UserButton />
    </div>
  )
}

export default AppHeader
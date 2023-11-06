"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

interface MyComponentProps {
    linkTo: string;
    title: string
}

const GenericButton = ({linkTo,title}:MyComponentProps) => {
    const {data:session} =useSession()
  return (
    <div>
      { session?.user ? <Link href={linkTo} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{title}</Link>:<div></div> }
    </div>
  )
}


export default GenericButton
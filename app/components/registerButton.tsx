"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

const RegisterButton = () => {
    const {data:session} =useSession()
  return (
    <div>
      { session?.user == null ? <Link href='/auth/register' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Register</Link>:<div></div> }
    </div>
  )
}

export default RegisterButton
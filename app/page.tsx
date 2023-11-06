'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import GenericButton from './components/GenericButton'

export default function Home() {
  const {data:session} =useSession()
  return (
    <main className='h-screen w-screen'>
      <h1 className=' to-blue-700 m-10 p-4 flex justify-center'>Hello welcome to my attendence App {session?.user.username}</h1>
       <div className='flex justify-center'>
            <GenericButton linkTo='/details/moreInfo' title="More Details"/>
      </div>
    </main>
  )
}

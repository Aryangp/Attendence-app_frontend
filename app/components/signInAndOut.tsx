"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const SignInAndOut = () => {
    const {data:session} =useSession()
    if (session && session.user) {
        return (
            <div>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
  return (
    <div>
        <button onClick={()=> signIn()}>Sign in</button>
    </div>
  )
}

export default SignInAndOut
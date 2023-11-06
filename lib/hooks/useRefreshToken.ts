
"use client"
import { useSession } from "next-auth/react"
import axios from "../axios"

export const useRefreshttoken=()=>{
    const {data:session}= useSession()

    const refreshToken=async()=>{
        const res= await axios.post("/user/token",{
            token:session?.user.refreshToken
        })

        if (session) session.user.accessToken=res.data.accessToken

    }
    return refreshToken
}
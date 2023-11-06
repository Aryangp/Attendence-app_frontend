 "use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { axiosAuth } from "../axios"
import { useRefreshttoken } from "./useRefreshToken"


 const useAxiosAuth = () => {
  const {data:session}= useSession()
  const refreshToken=useRefreshttoken()
  useEffect(() => {
     const requestInterceptor = axiosAuth.interceptors.request.use((config)=>{
        if (!config.headers["Authorization"]) {
           config.headers["Authorization"] = `${session?.user.accessToken}`
        }
        return config
     },
     (error)=>Promise.reject(error)
     );
     const responseInterceptor = axiosAuth.interceptors.response.use(
        (response)=>response,
        async (error)=>{
            const prevRequest=error.config
            if(error.response.status===401 && !prevRequest.sent){
                prevRequest.sent=true
                await refreshToken()
                prevRequest.headers["Authorization"]=`${session?.user.accessToken}`
                return axiosAuth(prevRequest)
            }    
           return Promise.reject(error)
        })
        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor)
            axiosAuth.interceptors.response.eject(responseInterceptor)
        }
  
    },[session])

    return axiosAuth
 }

 export default useAxiosAuth
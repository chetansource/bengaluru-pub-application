'use client'
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import bg1 from 'public/loginPoster.jpg'
import { redirect } from 'next/navigation'

const LoginPage = () => {
  const { status } = useSession()
  if (status === 'authenticated') {
    redirect('/')
  }
    return (
      <div className="h-screen flex flex-col justify-center items-center  text-white font-sans colorGradient">
        <div className=" h-1/2 lg:w-1/3 lg:h-1/3 flex flex-col lg:flex-row bg-white rounded-3xl mx-auto shadow-lg ">
          <div className="lg:w-1/2 h-full rounded-t-3xl lg:rounded-l-3xl bg-cover"
           style={{
                backgroundImage: `url(${bg1.src})`,
              }}>
          </div>
          <div className='h-1/2 lg:h-full flex flex-col justify-center px-6'>
            <p className="text-black font-medium text-md mb-8 text-center">Unlock the door to a world of brews and stories.</p>
            <Button onClick={() => signIn("google")} className="hover:bg-fuchsia-800" >
              <FcGoogle className="mr-2 h-4 w-4 " /> Login with Google
            </Button>
          </div>
        </div>
      </div>
  )
}

export default LoginPage
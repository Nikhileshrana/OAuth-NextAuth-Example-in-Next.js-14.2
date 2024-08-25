"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {Button} from "@/components/ui/button"

export default function Component() {
  const { data: session } = useSession();
  const date = session?.expires.slice(0,10);
  const time = session?.expires.slice(11,19);
  const [userdata, setuserdata] = useState<any | null>(null);

  useEffect(() => {
    setuserdata(session);
  }, [userdata])
  

  if (session) {
    return (
      <>
      <div className="p-8">

<Alert>
  <Avatar  className="h-4 w-4">
  <AvatarImage src={session.user?.image ?? ""} />
  <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <AlertTitle>Hi! {session.user?.name}</AlertTitle>
  <AlertDescription>
  With Email : <b>{session.user?.email}</b> will be signed out after <b>Date {date} </b> and <b> Time {time}</b>
  </AlertDescription>
  <Button onClick={() => signOut()} variant="destructive">Sign out</Button>
</Alert>


</div>


      </>
    )
  }
  return (
    <>
      <div className="p-5 flex justify-center">
        <Button variant="default" size="lg" onClick={() => signIn()}>Sign in</Button>
      </div>
    </>
  )
}
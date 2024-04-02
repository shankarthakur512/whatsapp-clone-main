import { useStateProvider } from "@/context/StateContext";
import React from "react";
import Image from "next/image";

function IncomingVideocall() {
  const [{IncomingVideoCall }] = useStateProvider();
  const acceptCall = () =>{
 
  }
  const rejectCall = () =>{
 
  }
  return (
  <div className="h-30 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drops-shadow-2xl border-icon-green border-2 py-3">I
   <div>
    <Image 
    src ={IncomingVideoCall.profilePicture}
    alt ="avatar"
    width={70}
    height={70}
    className="rounded-full"
    
    />
</div>
<div>
  <div>{IncomingVideoCall.name}</div>
  <div className="text-xs">Incoming Video Call..</div>
  <div className="flex gap-2 mt-2">
  <button className="bg-red-500 p-1 px-3 text-sm rounded-full"
  onClick={rejectCall}
  >end</button>
  <button className="bg-green-500 p-1 px-3 text-sm rounded-full"
  onClick={acceptCall}
  >Accept</button>
  </div>
</div>
  </div>
  );
}

export default IncomingVideocall;

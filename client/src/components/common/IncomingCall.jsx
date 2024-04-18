import { useStateProvider } from "@/context/StateContext";
import React from "react";
import Image from "next/image";
import { reducerCases } from "@/context/constants";


function IncomingCall() {
  const [{IncomingVoiceCall,socket, userInfo },dispatch] = useStateProvider();
  // const router = useRouter();
  // useEffect(()=>{
  //   socket.current.on("offer" , ({offer})=>{
  //     console.log(offer)
  //   })
  // })
  console.log(IncomingVoiceCall)
  const acceptCall = () =>{
   dispatch({type : reducerCases.SET_VOICE_CALL , voiceCall: {
    ...IncomingVoiceCall ,
    callType : "in-coming"
   }})
   socket.current.emit("accept_call" , {
  id : IncomingVoiceCall.id
   })
   dispatch({type : reducerCases.SET_INCOMING_VOICE_CALL, IncomingVoiceCall: undefined})
}
  const rejectCall = () =>{
    
    socket.current.emit("reject_voice_call" , {
      from : IncomingVoiceCall.id,
     } )
    dispatch({type : reducerCases.SET_END_CALL})
  }
  return (
  <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drops-shadow-2xl border-icon-green border-2 py-14"> 
   <div className="border">
    <Image 
   src={IncomingVoiceCall.profilePicture}
    alt ="avatar"
    width={70}
    height={70}
    className="rounded-full"
    
    />
</div>
<div>
  <div>{IncomingVoiceCall.name}</div>
  <div className="text-xs">Incoming Voice Call..</div>
  <div className="flex gap-2 mt-2">
  <button className="bg-red-500 p-1 px-3 text-sm rounded-full"
  onClick={rejectCall}
  >Reject</button>
  <button className="bg-green-500 p-1 px-3 text-sm rounded-full"
  onClick={acceptCall}
  >Accept</button>
  </div>
  </div> 
  </div>
  );
}

export default IncomingCall;

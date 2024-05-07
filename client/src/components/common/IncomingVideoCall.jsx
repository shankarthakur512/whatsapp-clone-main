import { useStateProvider } from "@/context/StateContext";
import React, { useEffect } from "react";
import Image from "next/image";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";


function IncomingVideocall() {
  const [{IncomingVideoCall,socket, userInfo },dispatch] = useStateProvider();
  // const router = useRouter();
  // useEffect(()=>{
  //   socket.current.on("offer" , ({offer})=>{
  //     console.log(offer)
  //   })
  
  // })
  // console.log(IncomingVideoCall)
  const acceptCall = () =>{
   dispatch({type : reducerCases.SET_VIDEO_CALL , videoCall : {
    ...IncomingVideoCall ,
    callType : "in-coming"
   }})
  //  socket.current.emit("join_user",{roomId : IncomingVideoCall.roomId , from : userInfo.id})
   socket.current.emit("accept_call" , {
  id : IncomingVideoCall.id
   })
   dispatch({type : reducerCases.SET_INCOMING_VIDEO_CALL, IncomingVideoCall: undefined})
}
  const rejectCall = () =>{
    
    socket.current.emit("reject_video_call" , {
      from : IncomingVideoCall.id,
     } )
    dispatch({type : reducerCases.SET_END_CALL})
  }
  return (
  <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drops-shadow-2xl border-icon-green border-2 py-14"> 
   <div className="border">
    <Image 
   src={IncomingVideoCall.profilePicture}
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
  >Reject</button>
  <button className="bg-green-500 p-1 px-3 text-sm rounded-full"
  onClick={acceptCall}
  >Accept</button>
  </div>
  </div> 
  </div>
  );
}

export default IncomingVideocall;

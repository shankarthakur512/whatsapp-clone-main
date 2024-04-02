import React, { useEffect } from "react";
import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic.js";
import { reducerCases } from "@/context/constants.js";
const Container = dynamic(() => import("./Container.jsx") , {ssr : false})

function VoiceCall() {
  const[{socket , voiceCall , userInfo}, dispatch] = useStateProvider();

useEffect(()=>{
  if(voiceCall.callType === "out-going"){
    socket.current.emit("out-going-voice-call" ,{
      to : voiceCall.id,
      from : {
        id : userInfo.id,
        profilePicture : userInfo.photoImage,
        name : userInfo.name
      },
  callType : voiceCall.callType,
  roomId : voiceCall.roomId
    })
  }

 
  

},[])

  return <Container data ={voiceCall}/>;
}

export default VoiceCall;

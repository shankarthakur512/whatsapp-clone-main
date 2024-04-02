import { useStateProvider } from "@/context/StateContext";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { MdOutlineCallEnd } from "react-icons/md";
import { reducerCases } from "@/context/constants";

function Container({data}) {
  const[{socket , userInfo},dispatch] = useStateProvider();
  const[callAccepted , setCallAccepted] = useState(false)
  const[stream , setStream] = useState(null);
const getstream = useCallback(async ()=>{
  const stream = await navigator.mediaDevices.getUserMedia({
    audio : true,
    video : true,
  })
  setStream(stream);
} ,[])
const handleEndcall = () =>{
dispatch({type : reducerCases.SET_END_CALL })
}

  useEffect(()=>{
if(data.type == "video"){
  getstream();
}

  },[stream])
 
  return (<div className="boder-conversation border-1 bg-conversation-panel-background w-full  h-[100vh] flex flex-col justify-center items-center  text-white">
<div className="flex flex-col gap-3 items-center">
  <span className="text-5xl">{data.name}</span>
  <span className="text-lg">{callAccepted && data.type ==="video" ? "on going call" : "calling"}</span>
 </div>
{
  data.type == "voice" && <div className="mt-5"><Image  src={data.profilePicture } alt="avatar" height={200} width={200}  className="rounded-full"/> </div>
}
{
  data.type == "video" && <div className="rounded-lg  flex items-center justify-center mt-5 overflow-hidden "> <ReactPlayer url={stream} playing /> </div>
}
<div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full my-10">
  <MdOutlineCallEnd className="text-3xl" onClick={handleEndcall}/>
</div>
  </div>);
}

export default Container;

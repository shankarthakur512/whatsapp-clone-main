import React ,{useEffect} from "react";
import dynamic from "next/dynamic";
import { useStateProvider } from "@/context/StateContext";
const Container = dynamic(() => import("./Container.jsx") , {ssr : false})

function VideoCall() {
  const[{socket , videoCall , userInfo}] =useStateProvider();
 
  useEffect(()=>{
    console.log(videoCall)
    if(videoCall.callType === "out-going"){
      socket.current.emit("out-going-video-call" ,{
        to : videoCall.id,
        from : {
          id : userInfo.id,
          profilePicture : userInfo.photoImage,
          name : userInfo.name
        },
    callType : videoCall.callType,
    roomId : videoCall.roomId
      })
    } }, [])
  
  return <Container data ={videoCall}/>;
}

export default VideoCall;

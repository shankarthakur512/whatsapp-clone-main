import React ,{useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useStateProvider } from "@/context/StateContext";

const Container = dynamic(() => import("./Container.jsx") , {ssr : false})

function VideoCall() {
  const[{socket , videoCall , userInfo ,},dispatch] = useStateProvider();
// const myoffer = useOffer();
  
useEffect(()=>{
 if(videoCall.callType === "out-going" ){
  // console.log({myoffer})
 socket.current.emit("out-going-video-call" ,{
        to : videoCall.id,
        from : {
          id : userInfo.id,
          profilePicture : userInfo.photoImage,
          name : userInfo.name,
         },
    type : videoCall.type,
    roomId : videoCall.roomId,
    
    })
    } }, [])
    // useEffect(()=>{
    //   socket.current.on("user-joined",({from})=>{
    //     socket.current.emit("joining_offer" , {from , myOffer : myoffer , to : videoCall.id })
    //   })
     
    // },[])


 
  
  return <Container data ={videoCall}/>;
}

export default VideoCall;

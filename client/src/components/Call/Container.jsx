import { useStateProvider } from "@/context/StateContext";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { MdOutlineCallEnd } from "react-icons/md";
import { reducerCases } from "@/context/constants";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import axios from "axios";
import { GENERATE_TOKENS } from "@/utils/ApiRoutes";

function Container({data}) {
  const[{socket , userInfo},dispatch] = useStateProvider();
  const[callAccepted , setCallAccepted] = useState(false)
  const[Token , setToken] = useState(undefined)
  const [ZgVar , setZgVar] = useState(undefined)
  const[publishStream , setPublishStream] = useState(undefined);
  const[localstream , setLocalStream] = useState(undefined)
  // const[stream , setStream] = useState(null);
// const getstream = useCallback(async ()=>{
// const stream = await navigator.mediaDevices.getUserMedia({
//     audio : true,
//     video : true,
//   })
//   setStream(stream);
// } ,[])
console.log(data.roomId)
useEffect(()=>{
  
  if(data.callType === "out-going"){
  socket.current.on("call-accepted" , ()=> setCallAccepted(true));
 console.log(callAccepted)
  }else{
  setTimeout(()=>{
    setCallAccepted(true);
  },1000);
 }
},[data]);

// useEffect(()=>{
//   if(data.type == "video"){
//     getstream();
//   }
  
//     },[stream])
// generating the token for call
useEffect(()=>{
    
const getToken = async () =>{
try {
  const {data : {Token : returnedToken}} = await axios.get(`${GENERATE_TOKENS}/${userInfo.id}`);
  setToken(returnedToken);

} catch (error) {
  console.log(error)
}
 }
  getToken();
},[callAccepted])


// zego cloud setting for call
useEffect(() =>{
    const startcall = async() =>{
      import("zego-express-engine-webrtc").then(async ({ ZegoExpressEngine }) =>{
        const zg = new ZegoExpressEngine(process.env.NEXT_PUBLIC_ZEGO_APP_ID,
          process.env.NEXT_PUBLIC_ZEGO_SERVER_ID
        );

      setZgVar(zg);
     await zg.loginRoom(data.roomId.toString(),Token , {userID : userInfo.id.toString(), userName : userInfo.name},{userUpdate : true}).then(async(result) =>{
        if(result == true){
          const localStream = await zg.createStream({ 
            camera : {
           audio : true,
            video : data.type === "video" ? true : false,
          }});
          const localVideo = document.getElementById("local-audio");
          const videoElement = document.createElement(
            data.type === "video" ? "video" : "audio"
          );
          videoElement.id = "video-local-zego";
          videoElement.className = "h-28 w-32";
          videoElement.autoplay = true;
          videoElement.muted = false;
          videoElement.playsInline = true;
          localVideo.appendChild(videoElement);
          const td = document.getElementById("video-local-zego");
          td.srcObject = localStream;
          const streamID = "123" + Date.now();
         
          setPublishStream(streamID);
          setLocalStream(localStream);
          zg.startPublishingStream(streamID , localStream)
        }
      })
      zg.on("roomStreamUpdate" , 
      async(roomID , updateType , streamList, extendedData) =>{
        if(updateType == "ADD"){
           const remVideo = document.getElementById("remote-Video")
           const vd = document.createElement(
            data.type === "video" ? "video" : "audio"
           );
           console.log(streamList[0].streamID)
           
           vd.id = streamList[0].streamID;
           vd.autoplay = true;
           vd.playsInline = true;

           vd.muted = false;
         
           if(remVideo){
            remVideo.appendChild(vd);
           }
     await  zg.startPlayingStream(streamList[0].streamID,{
            audio : true,
            video :true,
           }).then((stream) => vd.srcObject = stream)
          
        }else if(updateType == "DELETE" && zg && localstream && streamList[0].streamID){
          zego.destroyStream(localstream);
          zego.stopPublishingStream(streamList[0].streamID);
          zego.logoutRoom(data.roomId.toString());
          dispatch({type : reducerCases.SET_END_CALL})

        }
      }
      );
     
     
    }
  );

 }
    if(Token){
      console.log("chal rha hu ///")
    startcall();
    }
  }, [Token])

const handleEndcall = () =>{
  const id = data.id;
  if(ZgVar && localstream && publishStream){
    ZgVar.destroyStream(localstream);
    ZgVar.stopPublishingStream(publishStream);
    ZgVar.logoutRoom(data.roomId.toString());
  }
  if(data.type === "voice"){
    socket.current.emit("reject_voice_call" , {
      from : id,
     } );
    
  }else{
  socket.current.emit("reject_video_call" , {
    from : id,
   } );
  }
dispatch({type : reducerCases.SET_END_CALL })

}


 return (<div className="boder-conversation border-1 bg-conversation-panel-background w-full  h-[100vh] flex flex-col justify-center items-center  text-white">
<div className="flex flex-col gap-3 items-center">
  <span className="text-5xl">{data.name}</span>
  <span className="text-lg">{callAccepted  ? "on going call" : "calling"}</span>
 </div>

{(!callAccepted || data.type === "voice") &&(<div className="mt-5"><Image  src={data.profilePicture } alt="avatar" height={200} width={200}  className="rounded-full"/> </div>
  )}

{/* {
 !callAccepted && data.type == "video"  && <div className="rounded-lg  flex items-center justify-center mt-5 overflow-hidden "> <ReactPlayer url={stream} playing /> </div>
} */}

<div className="my-5 relative" id="remote-Video">
  <div className="absolute bottom-5 right-5" id ="local-audio"></div>
</div>
<div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full my-10">
  <MdOutlineCallEnd className="text-3xl" onClick={handleEndcall}/>
</div>
  </div>);
}

export default Container;

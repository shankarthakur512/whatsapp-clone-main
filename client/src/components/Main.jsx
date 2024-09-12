import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList.jsx";
import Empty from "./Empty.jsx";
import { useRouter } from "next/router.js";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig.js";
import axios from "axios";
import { CHECK_USER, GET_MESSAGE, HOST } from "@/utils/ApiRoutes.js";
import { useStateProvider } from "@/context/StateContext.jsx";
import { reducerCases } from "@/context/constants.js";
import Chat from "./Chat/Chat.jsx";
import { io } from "socket.io-client"
import SearchMessages from "./Chat/SearchMessages.jsx";
import VoiceCall from "./Call/VoiceCall.jsx";
import VideoCall from "./Call/VideoCall.jsx";
import IncomingCall from "./common/IncomingCall.jsx";
import IncomingVideocall from "./common/IncomingVideoCall.jsx";




function Main() {
  const router = useRouter();
  const[RedirectTologin , setRedirectTologin] = useState(false)
  const[{userInfo , currentChatUser,messageSearch , videoCall , voiceCall , IncomingVoiceCall , IncomingVideoCall} , dispatch] =useStateProvider();
  const socket = useRef();
  const [socketEvent , setSocketEvent] = useState(false)
useEffect(()=>{
 if(RedirectTologin) router.push("/login");

},[RedirectTologin, setRedirectTologin]) 


// any change in state is handled here
onAuthStateChanged(firebaseAuth,async (currentUser) =>{
if(!currentUser) setRedirectTologin(true);
// console.log(userInfo)
// console.log(currentUser)
if(!userInfo && currentUser?.email){
const {data} = await axios.post(CHECK_USER,{
email : currentUser.email,
})
console.log(data)
dispatch({
  type : reducerCases.SET_USER_INFO,
   userInfo : {
    id : data.data.id,
    name : data.data.name,
    email : data.data.email,
    photoImage : data.data.profilePicture,
   status : data.data.about
   }})
// console.log("done")
}
})
useEffect(()=>{
  if(userInfo){
    socket.current = io(HOST);
    socket.current.emit("add-user" , userInfo.id);
    dispatch({type : reducerCases.SET_SOCKET , socket})
  }
},[userInfo])
// useEffect(()=>{
//   if(userInfo){
//     const peer = new RTCPeerConnection({
//       iceServers : [
//         {
//          urls : [
//           "stun:stun.l.google.com:19302",
//           "stun:global.stun.twilio.com:3478"
//          ]
//         }
//       ]
//     })
//   dispatch({
//     type : reducerCases.SET_PEER ,
//     peer
//   })
    
//   }
// },[userInfo])
useEffect(() => {
	import("peerjs").then(({ default: Peer }) => {
		// normal synchronous code
		const peer = new Peer(`${userInfo?.id}`);
		peer.on('open', id => {
			console.log(id);
      dispatch({type : reducerCases.SET_PEER , peer})
		})
	})
}, [userInfo])


useEffect(()=>{
if(socket.current && !socketEvent){
  socket.current.on("msg-recieve" , (data) =>{
    // console.log(data);
    dispatch({
      type : reducerCases.ADD_MESSAGE,
      newMessage : {
        ...data.message,
      }
    })
  })
  socket.current.on("incoming_voice_call" , ({from , roomId, type})=>{
    dispatch({
      type : reducerCases.SET_INCOMING_VOICE_CALL , 
      IncomingVoiceCall : {
        ...from , roomId , type
      }
    })
  })
 
  socket.current.on("incoming_video_call", ({from , roomId, type  })=>{
   dispatch({
      type : reducerCases.SET_INCOMING_VIDEO_CALL , 
      IncomingVideoCall : {
        ...from , roomId , type
      }
    })
  })
   socket.current.on("voice-call-rejected" ,()=>{
    dispatch({
      type : reducerCases.SET_END_CALL
    })
   })
   socket.current.on("video-call-rejected",()=>{
    dispatch({
      type : reducerCases.SET_END_CALL
    })
    socket.current.on('online-users' , ({onlineUsers}) =>{
      dispatch({type:reducerCases.SET_ONLINE_USER , onlineUsers})
    })
 })


 //my code
// socket.current.on("user_joined" ,()=>{
//   console.log("user" + from + "joined");
// })


setSocketEvent(true)
}
},[socket.current])
 useEffect(() =>{
  const getmessages = async () =>{
    console.log(userInfo.id)
    console.log(currentChatUser.id)
    const {data : {messages}} = await axios.get(`${GET_MESSAGE}/${userInfo.id}/${currentChatUser.id}`)
  
     dispatch({type : reducerCases.SET_MESSAGES , messages})
  }

 if(currentChatUser?.id){
  getmessages();
}

 },[currentChatUser])


  return( 
  <>

  {IncomingVoiceCall && <IncomingCall />}
  {IncomingVideoCall && <IncomingVideocall />}
{

  videoCall && <div className="h-screen w-screen max-h-full ">
  <VideoCall />
  </div>
}
{
  voiceCall &&  <div className="h-screen w-screen max-h-full ">
 <VoiceCall />
</div>
}

{!voiceCall && !videoCall && <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
  <ChatList />
 
 {currentChatUser ? (
  <div className={messageSearch ? "grid grid-cols-2" : "grid-cols-2"} >
 <Chat /> 
 {messageSearch && <SearchMessages />}
 </div>
 ): <Empty />}
</div>
}
  </>);
}

export default Main;

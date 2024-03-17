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

function Main() {
  const router = useRouter();
  const[RedirectTologin , setRedirectTologin] = useState(false)
  const[{userInfo , currentChatUser} , dispatch] =useStateProvider();
  const socket = useRef();
  const [socketEvent , setSocketEvent] = useState(false)
useEffect(()=>{
 if(RedirectTologin){
    router.push("/login");
  }
},[RedirectTologin,setRedirectTologin]) 


// any change in state is handled here
onAuthStateChanged(firebaseAuth,async (currentUser) =>{
if(!currentUser) setRedirectTologin(true);

if(!userInfo && currentUser?.email){
const {data} = await axios.post(CHECK_USER,{
email : currentUser.email,
})
dispatch({
  type : reducerCases.SET_USER_INFO,
   userInfo : {
    id : data.data.id,
    name : data.data.name,
    email : data.data.email,
    photoImage : data.data.profilePicture,
   status : data.data.about
   }})

}
})
useEffect(()=>{
  if(userInfo){
    socket.current = io(HOST);
    socket.current.emit("add-user" , userInfo.id);
    dispatch({type : reducerCases.SET_SOCKET , socket})
  }
},[userInfo])
useEffect(()=>{
if(socket.current && !socketEvent){
  socket.current.on("msg-recieve" , (data) =>{
    dispatch({
      type : reducerCases.ADD_MESSAGE,
      newMessage : {
        ...data.message,
      }
    })
  })
  setSocketEvent(true)
}
},[socket.current])
 useEffect(() =>{
  const getmessages = async () =>{
    const {data : {messages}} = await axios.get(`${GET_MESSAGE}/${userInfo.id}/${currentChatUser.id}`)
    console.log(messages)
     dispatch({type : reducerCases.SET_MESSAGES , messages})
  }

 if(currentChatUser?.id){
  getmessages();
}

 },[currentChatUser])


  return( 
  <>
<div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
  <ChatList />
 
 {currentChatUser ? <Chat /> : <Empty />}
</div>
  </>);
}

export default Main;

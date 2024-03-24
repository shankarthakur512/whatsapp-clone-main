import { useStateProvider } from "@/context/StateContext";
import { ADD_IMAGE_MESSAGE_ROUTE, SEND_MESSAGE } from "@/utils/ApiRoutes";
import React, { useEffect, useRef, useState } from "react";
import {  BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import {ImAttachment} from "react-icons/im"
import { MdSend } from "react-icons/md";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import EmojiPicker from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic";
const  CaptureAudio = dynamic ( () => import("../common/CaptureAudio"),{
  ssr: false,
});

function MessageBar() {
  const [{userInfo, currentChatUser , socket}, dispatch ] = useStateProvider()
  const[message , setMessage] = useState("");
  const[showEmojiPicker , setemojipicker] = useState(false);
  const EmojiPickerRef = useRef(null);
  const[grabPhoto , setgrabPhoto] = useState(false);
  const[ShowcaptureAudio , setShowcaptureAudio] = useState(false)

  //useEffect for image
  useEffect(()=>{
    if(grabPhoto){
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) =>{
        setTimeout(()=>{
          setgrabPhoto(false);
        },1000)
        
      };
    }
    },[grabPhoto])

  //potopicker change
  const photoPickerChange = async(e)=>{
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image" , file);
      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE,formData,{
        header : {
          "Content-Type" : "multipart/form/data",
        },
        params : {
          from: userInfo.id,
          to : currentChatUser.id,
        }
      });
        console.log(response)
      if(response.status === 201){
        socket.current.emit("send-msg" , {
          to : currentChatUser ?.id,
        from : userInfo?.id,
      message : response.data.message,
          })
        dispatch({
        type : reducerCases.ADD_MESSAGE ,
        newMessage : {
          ...response.data.message , 
        },
        fromSelf : true,
        });
        console.log("done")
      }
      
      
    } catch (error) {
      console.log(error)
    }
  }


//Handling the outside click
useEffect(()=>{
const handleoutsideClick = (event) =>{
     if(event.target.id !== "emoji-opener"){
      if(
        EmojiPickerRef.current && 
       !EmojiPickerRef.current.contains(event.target)
        ){
        
          setemojipicker(false)
       }
}
};
document.addEventListener('click' , handleoutsideClick);
return () =>{document.removeEventListener('click' , handleoutsideClick)};
},[])


// handling Emoji section

const handleEmojiModel = () => {
  console.log(!showEmojiPicker)
  setemojipicker(!showEmojiPicker); // there some issue not know why
};
const handleemojiClick = (emoji) => {
 setMessage((previousmsg) =>(previousmsg += emoji.emoji))
};


  // sending message 
 const sendMessage = async () => {
   try {
     const {data} = await axios.post(SEND_MESSAGE , {
      to : currentChatUser?.id,
      from : userInfo?.id,
      message : message,
      })
      socket.current.emit("send-msg" , {
        to : currentChatUser ?.id,
      from : userInfo?.id,
    message : data.message,
        })
      dispatch({
      type : reducerCases.ADD_MESSAGE ,
      newMessage : {
        ...data.message , 
      },
      fromSelf : true,
      })
       setMessage("");
       console.log("done")
    } catch (error) {
     console.log(error);
    }
 }
  return (
  <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      {!ShowcaptureAudio && (
 
    <>
    <div className="flex gap-6">
      <BsEmojiSmile 
      className="text-panel-header-icon cursor-pointer text-xl"
      title="Emoji"
      id="emoji-opener"
      onClick={handleEmojiModel}
      />
       {  
       showEmojiPicker && (<div className="absolute bottom-24 left-16 z-40"
           ref={EmojiPickerRef}
          >
        <EmojiPicker onEmojiClick={handleemojiClick} theme = "dark"/>
           </div>
           
        )
      }
      <ImAttachment 
      className="text-panel-header-icon cursor-pointer text-xl"
      title="Attach file"
      onClick={() =>{setgrabPhoto(true)}}
      />

    </div>
    <div className="w-full rounded-lg h-10 flex items-center">
      <input type="text" placeholder="Type your message" className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full" 
      value={message}
      onChange={(e)=>{setMessage(e.target.value)}}
/> </div>



    <div className="flex w-10 items-center justify-center">
     <button>
    {message.length ? (  <MdSend 
      className="text-panel-header-icon cursor-pointer text-xl"
      title="send message"
      onClick = {sendMessage}
      />) :
     <FaMicrophone 
      className="text-panel-header-icon cursor-pointer text-xl"
      title="send voice message"
      onClick={ () =>{setShowcaptureAudio(true)} }
      /> }
     </button>
    </div>
    
    </> 
    )}
    {
      grabPhoto && (
        
        <PhotoPicker 
        onChange = {photoPickerChange}
        />

      )
    }
    {
      ShowcaptureAudio && <CaptureAudio hide ={setShowcaptureAudio}/>
    }

  </div>
  
    );
}

export default MessageBar;

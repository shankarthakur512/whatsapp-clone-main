import { useStateProvider } from "@/context/StateContext";
import React from "react";
import Image from "next/image";
import { HOST } from "@/utils/ApiRoutes";
import MessageStatus from "../common/MessageStatus";
import { calculateTime } from "@/utils/CalculateTime.js";

function ImageMessage({message}) {
  const[{currentChatUser , userInfo}] = useStateProvider();
  return (
  <div className={`p-1 rounded-lg ${message.senderId === currentChatUser.id ? "bg-incoming-background" : "bg-outgoing-background"}`}>I
  <div className="relative">
    <Image src={`${HOST}/${message.message}`}
    className="rounded-lg"
    alt="asset"
    height={300}
    width={300}
    />
    <div className="absolute bottom-1 right-1 flex items-end gap-1">
   
    <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">{calculateTime(message.createdAt)}</span>
    <span>{ message.senderId === userInfo.id && <MessageStatus MessageStatus={message.messageStatus}/>}</span>

    </div>
  </div>
  
  </div>);
}

export default ImageMessage;

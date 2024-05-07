import React ,{useState}from "react";
import Avatar from "../common/Avatar";
import {MdCall} from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";
function ChatHeader() {
  const[{currentChatUser , socket , userInfo,onlineUser},dispatch] = useStateProvider();
  const [isContextMenuVisible , setIsContextMenuVisible] = useState(false);
  const[contextMenuCoordinates , setcontextMenuCoordinates] = useState({
    x:0,
    y:0
  })

  const showContextMenu =(e) =>{
    e.preventDefault();
    console.log(e)
    console.log(isContextMenuVisible)
    setcontextMenuCoordinates({x:e.pageX - 30 , y: e.pageY + 10});
     setIsContextMenuVisible(true);
    console.log(isContextMenuVisible)
  }

  //context
  const contextMenuOptions=[
    {
    name: "EXIT", 
    callback: async ()=>{
      dispatch({type : reducerCases.SET_EXIT_CHAT})
    }
     } ,
    ]



const handleVoicecall = () =>{
  dispatch({
    type : reducerCases.SET_VOICE_CALL ,
voiceCall : {
  ...currentChatUser,
  type: "voice",
  callType : "out-going",
  roomId : Date.now(),
}
    
  })
  }
  const handlevideocall = () =>{
    const roomId = Date.now();
  socket.current.emit("join_user" , {
      from : userInfo.id,
     roomId : roomId,
 })
  dispatch({
    type : reducerCases.SET_VIDEO_CALL ,
videoCall : {
  ...currentChatUser,
  type: "video",
  callType : "out-going",
  roomId 
}
    
  })
  }
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
    <div className="flex items-center justify-center gap-6">
      <Avatar type="sm" image={currentChatUser?.profilePicture} />
      <div className="flex flex-col">
        <span className="text-primary-strong">{currentChatUser?.name}</span>
        <span className="text-secondary text-sm">
          {onlineUser.includes(currentChatUser.id) ? "online" : "offline"}
        </span>
      </div>
    </div>
    <div className="flex gap-6">
      <MdCall  className="text-panel-header-icon cursor-pointer text-l" onClick={handleVoicecall} />
      <IoVideocam className="text-panel-header-icon cursor-pointer text-l" onClick={handlevideocall}/>
      <BiSearchAlt2  className="text-panel-header-icon cursor-pointer text-l" 
      
      onClick={()=>{dispatch({
        type : reducerCases.SET_MESSAGE_SEARCH
      })}}
      />
      <BsThreeDotsVertical  className="text-panel-header-icon cursor-pointer text-l" 
      onClick={(e) =>{showContextMenu(e)}}
      id="context-opener"
      />
    {
      isContextMenuVisible && (<ContextMenu 
      options={contextMenuOptions}
      coordinates={contextMenuCoordinates}
      contextMenu={isContextMenuVisible}
      setContextMenu={setIsContextMenuVisible}
      />
      )
  }

    </div>
   
    </div>
    
    );
}

export default ChatHeader;

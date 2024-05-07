import React, { useEffect,useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import {BsFillChatLeftTextFill  , BsThreeDotsVertical} from "react-icons/bs"
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";
function ChatListHeader() {
const router = useRouter();
  const[{userInfo} , dispatch] = useStateProvider();
  const [isContextMenuVisible , setIsContextMenuVisible] = useState(false);
  const[contextMenuCoordinates , setcontextMenuCoordinates] = useState({
    x:0,
    y:0
  })

  const showContextMenu =(e) =>{
    e.preventDefault();
    console.log(e)
    console.log(isContextMenuVisible)
    setcontextMenuCoordinates({x:e.pageX  , y: e.pageY });
     setIsContextMenuVisible(true);
    console.log(isContextMenuVisible)
  }
  const contextMenuOptions=[
    {
    name: "Settings", 
    callback: async ()=>{
      dispatch({type : reducerCases.SET_EXIT_CHAT})
    }
     } ,
     {
      name: "Profile", 
      callback: async ()=>{
        dispatch({type : reducerCases.SET_EXIT_CHAT})
      }
       } ,
       {
        name: "Logout", 
        callback: async ()=>{
          // dispatch({type : reducerCases.SET_USER_INFO , userInfo : undefined})
          router.push('/logout')

        }
         } ,
    ]

  // useEffect(()=>{
  // if(!userInfo) router.push("/login");
  // },[]) 
  
  const handleAllcontacts = () =>{
    dispatch({type : reducerCases.SET_ALL_CONTACTS_PAGE} )
  }
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
     
      <Avatar type="sm" image={userInfo?.photoImage} />
      </div>
    <div className="flex gap-6">
      <BsFillChatLeftTextFill className="text-panel-header-icon cursor-pointer text-xl" 
       title="New chat"
       onClick={handleAllcontacts}
       />
      <>
      <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl" 
      title="Menu"
      id="context-opener"
      onClick={(e) => showContextMenu(e)}
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
      </>
       </div>
    </div>
    );
}

export default ChatListHeader;

import { useStateProvider } from "@/context/StateContext";
import { GET_INTIAL_CONTACTS } from "@/utils/ApiRoutes";
import React, { useEffect } from "react";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import ChatLIstItem from "./ChatLIstItem";

function List() {
  const [{userInfo, userContacts , onlineUsers , filteredContacts}, dispatch] = useStateProvider();
 useEffect(()=>{
  const getcontacts =  async () =>{
    try {
      const {
       data : {users , onlineUsers}
      } = await axios(`${GET_INTIAL_CONTACTS}/${userInfo.id}`)
      dispatch({type : reducerCases.SET_USER_CONTACTS , 
      userContacts : users})
      dispatch({type : reducerCases.SET_ONLINE_USER , onlineUsers})
      
    } catch (error) {
      console.log(error);
    }
   }
    getcontacts();
 },[userInfo])

  return (
  <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
    {/*console.log(filteredContacts) */}
    {filteredContacts && filteredContacts.length>0 ?
(filteredContacts.map((contact)=>(
  <ChatLIstItem data={contact} key={contact.id} />
))): (userContacts.map((contact)=>(
      <ChatLIstItem data={contact} key={contact.id} />
    )))
    }
  </div>
    );
}

export default List;

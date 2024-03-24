import { useStateProvider } from "@/context/StateContext";
import { GET_INTIAL_CONTACTS } from "@/utils/ApiRoutes";
import React, { useEffect } from "react";
import axios from "axios";

function List() {
  const [{userInfo}] = useStateProvider();
 useEffect(()=>{
  const getcontscts =  async () =>{
    try {
      const {
       data : {users , onlineUsers}
      } = await axios(`${GET_INTIAL_CONTACTS}/${userInfo.id}`)
    } catch (error) {
      console.log(error);
    }
  }
 },[userInfo])

  return (
  <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">

  </div>
    );
}

export default List;

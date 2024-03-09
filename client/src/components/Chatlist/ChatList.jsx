import React, { useEffect, useState } from "react";
import ChatHeader from "../Chat/ChatHeader";
import SearchBar from "./SearchBar";
import ChatListHeader from "./ChatListHeader.jsx";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";

function ChatList() {
  const [{contactsPage}] = useStateProvider();
  const [pageType , setPageType] = useState("default");
  useEffect(()=>{
    if(contactsPage){
      setPageType("all-contacts");
    }else {
      setPageType("default");
    }
  })
  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
  {pageType === "default" && ( 

      <>
      <ChatListHeader />
      <SearchBar />
      <List />
      </>  )}
  {pageType === "all-contacts" && ( 
     <>
     <ContactsList />
     </> )}
    </div>
  );
}

export default ChatList;

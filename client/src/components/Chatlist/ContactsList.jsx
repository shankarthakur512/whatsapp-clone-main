import React, { useEffect, useState } from "react";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes.js";
import { BiArrowBack ,BiSearchAlt2 } from "react-icons/bi";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import axios from "axios";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [{},dispatch] = useStateProvider();
  const[allcontacts , setAllcontacts] = useState([]);
  const [SearchTerm , setSearchTerm] = useState("");
  const [SearchedContact ,setSearchedContact] = useState([])
 
 useEffect(()=>{
   if(SearchTerm){
      const filterData = {};
      Object.keys(allcontacts).forEach((key) => {
        filterData[key] = allcontacts[key].filter((obj)=> obj.name.toLowerCase().includes(SearchTerm.toLowerCase()));
      }
    );
    setSearchedContact(filterData);
   }else{
    setSearchedContact(allcontacts)
   }

 }, [SearchTerm])
 
 
  useEffect(() =>{
  
    const getContacts = async () =>{
  try{
      const {data : {users}} = await axios.get(GET_ALL_CONTACTS);
     
     setAllcontacts(users);
     setSearchedContact(users);
     
  } catch (error) {
    console.log(error);
  } 
}
  getContacts();
  },[])


  return (
  <div className="h-full flex flex-col">
    <div className="h-24 flex items-end px-3 py-4" >
      <div className="flex items-center gap-12 text-white">
        <BiArrowBack 
        className="cursor-pointer text-xl"
        onClick={() =>{dispatch({type : reducerCases.SET_ALL_CONTACTS_PAGE})}}
        />
        <span>New chat</span>
      </div>
    </div>
    <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
      <div className="flex py-3 items-center gap-3 h-14">
      <div className="bg-search-input-container-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">

    <div>
<BiSearchAlt2 
className="text-panel-header-icon cursor-pointer text-l"/>

</div>
<div>
  <input
   type="text" 
   placeholder="Search contacts" 
   className="bg-transparent text-sm focus:outline-none text-white w-full"
  value={SearchTerm}
  onChange={(e) => (setSearchTerm(e.target.value))}
  
  />
</div>
</div>


      </div>

   
      

{

 Object.entries(SearchedContact).map(([initialLetter , userList]  ) => {
  return (
    userList.length > 0 && (
    <div key={Date.now() + initialLetter}> 
    <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
    {
      userList.map((contact) => {
        return (
          <ChatLIstItem 
          data = {contact} 
          isContactPage = {true}
          key={contact.id}
          />
        )

      })
    }
    </div>
     ) )
 }) 
}

   
   
   
 </div>
</div>
  );
}

export default ContactsList;

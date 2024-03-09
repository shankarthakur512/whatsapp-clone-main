import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import  Main from "../components/Main.jsx";

function index() {
  const router = useRouter();
  const [{userInfo}]= useStateProvider();
 /* useEffect(()=>{
    if(!userInfo) router.push("/login");
  },[]) ; */
  return <Main />;
  
} 

export default index;

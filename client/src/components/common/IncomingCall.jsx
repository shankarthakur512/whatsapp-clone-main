import { useStateProvider } from "@/context/StateContext";
import React from "react";

function IncomingCall() {
 const [{IncomingVoiceCall }] = useStateProvider();
 const acceptCall = () =>{

 }
 const rejectCall = () =>{

 }
  return (
  <div className="h-24 w-80 fixed bottom-8">


  </div>);
}

export default IncomingCall;

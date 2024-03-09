import React, { useEffect, useRef } from "react";
import {IoClose} from "react-icons/io5"

function CapturePhoto({setImage , setShowCaptureImage}) {
const videoref = useRef();
useEffect(()=>{
  let stream;
  try { 
 
  const startCamera = async() =>{
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    videoref.current.srcObject = stream;
  };
  startCamera();
}catch(error){
 console.log(error);
}
  return () =>{
    stream?.getTracks().forEach((track) => track.stop());
  };
},[])
const CapturePhoto =async ()=>{
  const canvas = document.createElement("canvas");
  canvas.getContext("2d").drawImage(videoref.current,0,0,300,150)
   setImage(canvas.toDataURL("image/jpeg"))
  setShowCaptureImage(false)
}
  return (
  <div className="absolute h-4/6 w-2/6 top-1/4 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center">
 <div className="flex flex-col gap-4 h-full w-full items-center justify-center ">
  <div className="pt-2 pr-2 cursor-pointer flex items-end justify-end" onClick={()=>{setShowCaptureImage(false)}} >
   <IoClose  className="h-8 w-8 cursor-pointer"/>
  </div>
  <div className="flex justify-center">
    <video id="video" className="rounded-lg" width="400" autoPlay ref={videoref}></video>
  </div>
  <button
  className="h-15 w-15 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-5"
  onClick={CapturePhoto}
  >
 </button>
  </div>
  </div>
  
    );
}

export default CapturePhoto;

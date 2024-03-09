import React, { useState, useEffect } from "react";
import Image from "next/image";
import {FaCamera} from "react-icons/fa"
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({type , image , setImage}) {

  // states variable declarations
  const [hover , setHover] = useState(false);
  const [isContextMenuVisible , setIsContextMenuVisible] = useState(false);
  const[contextMenuCoordinates , setcontextMenuCoordinates] = useState({
    x:0,
    y:0
  })
  const[grabPhoto , setgrabPhoto] = useState(false);
  const[isLibraryVisible , setisLibraryVisible ]  = useState(false);
  const[showCapturePhoto , setShowCapturePhoto] = useState(false)
//hooks 
useEffect(()=>{
if(grabPhoto){
  const data = document.getElementById("photo-picker");
  data.click();
  document.body.onfocus = (e) =>{
    setTimeout(()=>{
      setgrabPhoto(false);
    },1000)
    
  };
}
},[grabPhoto])



  // functions 
  const showContextMenu =(e) =>{
    e.preventDefault();
    setcontextMenuCoordinates({x:e.pageX , y: e.pageY});
    setIsContextMenuVisible(true);
  }



  // In this function we are using File Reader functionaility
const photoPickerChange = async(e)=>{
const file = await e.target.files[0];
const reader = new FileReader();
console.log({file});
const data = document.createElement("img");
reader.onload = function(event) {
  data.src = event.target.result;
  data.setAttribute("data-src" , event.target.result);
};
 reader.readAsDataURL(file);
setTimeout(()=>{
setImage(data.src)
},100)
};


  // context menu options Array of objects
  const contextMenuOptions=[
    {
    name:"Take Photo", 
    callback: ()=>{
      setShowCapturePhoto(true)
    }
     } ,
     {
    name : "change from library",
    callback : ()=>{
    setisLibraryVisible(true)
    }
     },
    {
    name : "Upload Photo",
    callback: ()=>{
    setgrabPhoto(true);
     }
    },
    {
    name : "Remove Photo",
    callback : ()=>{
    setImage("/default_avatar.png")
    }
    }
]
  return (
    <>
    <div className="flex items-center justify-center">
      {
        type ==="sm" && (
        <div className="relative h-10 w-10">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
          )
      }
       {

        type ==="lg" && (
        <div className="relative cursor-pointer"
        onMouseEnter={()=>{setHover(true)}}
        onMouseLeave={()=>{setHover(false)}}
        >
        <div className=" h-14 w-14">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
        </div>
          )
      }
       {
        type ==="xl" && (
          <div className="relative cursor-pointer"
          onMouseEnter={()=>{setHover(true)}}
          onMouseLeave={()=>{setHover(false)}}
          >
            <div className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 text-white 
            ${hover ?"visible" :  "hidden"}`} 
            onClick={(e) =>{showContextMenu(e)}}
            id="context-opener"
           >
              
              <FaCamera className="text-2xl " 
               onClick={(e) =>{showContextMenu(e)}}
               id="context-opener"
               />
            
              <span  onClick={(e) =>{showContextMenu(e) } } id="context-opener"  >change Profile photo </span>
              </div>
        <div className="h-60 w-60">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
        </div>
          )
      }
       
    </div>
    {
      
        isContextMenuVisible && (<ContextMenu 
        options={contextMenuOptions}
        coordinates={contextMenuCoordinates}
        contextMenu={isContextMenuVisible}
        setContextMenu={setIsContextMenuVisible}
        
        />
        )
    }


    {
      grabPhoto && (
        
        <PhotoPicker 
        onChange = {photoPickerChange}
        />

      )
    }
    {
      showCapturePhoto && <CapturePhoto 
      setImage = {setImage}
      setShowCaptureImage = {setShowCapturePhoto}
      />
    }
    {

      isLibraryVisible && (
        <PhotoLibrary setisLibraryVisible={setisLibraryVisible} setImage={setImage} />
      )
    }
   
    </>
  );
}

export default Avatar;

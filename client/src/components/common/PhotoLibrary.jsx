import Image from "next/image";
import React from "react";
import {IoClose} from "react-icons/io5"

function PhotoLibrary({setisLibraryVisible , setImage}) {

  const Photos =[
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",

  ]
  return( 
  <div className="fixed top-0 left-0 max-h-[100vh] max-w[100vw] h-full w-full flex justify-center items-center">
    <div className='h-max w-max bg-gray-900 gap-6 rounded-lg p-4'>
      <div className="cursor-pointer" onClick={()=>{setisLibraryVisible(false)}} >
        <IoClose  className="h-5 w-5 cursor-pointer"/>
      </div>
      <div className="flex flex-row gap-8 p-3">
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[0])
    setisLibraryVisible(false)}}>
        <Image src={Photos[0]} height={100} width={100} alt="avatar"/>
      </div>
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[1])
    setisLibraryVisible(false)}}>
        <Image src={Photos[1]} height={100} width={100}  alt="avatar"/>
      </div>
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[2])
    setisLibraryVisible(false)}}>
        <Image src={Photos[2]} height={100} width={100}  alt="avatar"/>
      </div>
      </div>
      <div className="flex flex-row gap-8 p-3">
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[3])
    setisLibraryVisible(false)}}>
        <Image src={Photos[3]} height={100} width={100}  alt="avatar"/>
      </div>
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[4])
    setisLibraryVisible(false)}}>
        <Image src={Photos[4]} height={100} width={100} alt="avatar" />
      </div>
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[5])
    setisLibraryVisible(false)}}>
        <Image src={Photos[5]} height={100} width={100} alt="avatar" />
      </div>
      </div>
      <div className="flex flex-row gap-8 p-3">
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[6])
    setisLibraryVisible(false)}}>
        <Image src={Photos[6]} height={100} width={100} alt="avatar" />
      </div>
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[7])
    setisLibraryVisible(false)}}>
        <Image src={Photos[7]} height={100} width={100} alt="avatar" />
      </div>
      <div className="cursor-pointer" onClick={()=>{setImage(Photos[8])
    setisLibraryVisible(false)}}>
        <Image src={Photos[8]} height={100} width={100} alt="avatar" />
      </div>
      </div>
   
   
   
    </div>


  </div>
  );
}

export default PhotoLibrary;

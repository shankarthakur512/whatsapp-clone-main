import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext.jsx";
import Input from "../components/common/Input.jsx";
import Avatar from "@/components/common/Avatar.jsx";
import axios from "axios";
import { ONBOARDING_USER } from "@/utils/ApiRoutes.js";
import { useRouter } from "next/router.js";
import { reducerCases } from "@/context/constants.js";

function onboarding() {
  const router = useRouter();
  const [{userInfo, newUser} , dispatch] = useStateProvider();
  const[name , setName] = useState("");
  const[about , setAbout] = useState("");
  const[image , setImage] = useState("/default_avatar.png");
useEffect(() =>{
  if(!newUser && !userInfo?.email){
    router.push("/login");
  }else if(!newUser && userInfo?.email) router.push("/");
},[newUser , userInfo, router])
  
  const OnboardUserHandler = async() =>{
   try {
  const email = userInfo.email
   if(validate){
    const {data} = await axios.post(ONBOARDING_USER,{
      email ,
       name , 
       image , 
      about 
      });
     if(data.success){
      dispatch({
        type : reducerCases.SET_NEW_USER ,
         newUser : false
          
        }) 
      dispatch({
        type : reducerCases.SET_USER_INFO ,
        userInfo : {
          name,
          email,
          photoImage: image,
          status : about 
        }
      })
     router.push("/")
     }
     }
   } catch (error) {
   // console.log(userInfo)
     throw (error)
   }
  }
const validate = ()=>{
  if(name.length < 3){
  return false;
 }
 return true;
}

  return (
    <div className="bg-panel-header-background h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 text-white">
      <Image src="/whatsapp.gif" alt="whatsapp" height={280} width={280} />
      <span className="text-6xl">whatsApp</span>
     </div>
     <h2 className="text-2xl text-white mt-5">create your profile</h2>
     <div className="flex gap-6 mt-5 ml-20">
      <div className="flex flex-col items-center justify-center mt-5 gap-6 text-white">
       <Input name="Display Name" state={name} setState={setName} label />
       <Input name="About" state={about} setState={setAbout} label />
    </div>
    <Avatar type="xl" image={image} setImage={setImage}  />
     </div>
     <button className="flex items-center justify-center gap-6 bg-green-600  p-3 shadow-sm rounded-lg" onClick={OnboardUserHandler}> Create profile</button>

    </div>
    );
}

export default onboarding;

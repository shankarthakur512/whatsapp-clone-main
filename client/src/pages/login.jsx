import React from "react";
import Image from "next/image";
import {FcGoogle} from "react-icons/fc"
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider ,signInWithPopup } from "firebase/auth";
import axios from "axios";
import { CHECK_USER } from "@/utils/ApiRoutes.js";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function login() {
  const router = useRouter();
  const [{} , dispatch] = useStateProvider()
  const handlelogin = async () =>{
    
    const provider = new GoogleAuthProvider();
    const {user: {displayName: name , 
      email, 
    photoURL: photoImage}} = await signInWithPopup(firebaseAuth , provider);
    try {
      if (email) {
        const {data} = await axios.post(CHECK_USER,{email});
        console.log({data});
        if(!data.success){

          dispatch({
            type : reducerCases.SET_NEW_USER ,
             newUser : true
              
            }) 
          dispatch({
           type : reducerCases.SET_USER_INFO ,
            userInfo : {
              name,
              email,
              photoImage,
              status :" "
            }
           })
          router.push("/onboarding");
        }else{
          dispatch({
            type : reducerCases.SET_USER_INFO ,
             userInfo : {
              id : data.data.id,
              name : data.data.name ,
              email : email,
              photoImage : data.data.profilePicture,
              status : data.data.about
             }
            })

        router.push("/")
        }
       
      }
    } catch (error) {
      
    }
    
  }
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
     <div className="flex items-center justify-center gap-2 text-white">
      <Image src="/whatsapp.gif" alt="whatsapp" height={280} width={280}></Image>
      <span className="text-6xl">whatsApp</span>
      </div>
      <button
      className="flex items-center justify-center gap-6 bg-search-input-container-background p-3 shadow-sm rounded-lg"
      onClick={handlelogin}>
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login with Google</span>

      </button>
     
    </div>
  )
}

export default login;

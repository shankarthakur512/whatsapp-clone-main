import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function logout() {
  const router = useRouter();
  const[{socket , userInfo },dispatch] = useStateProvider();
  useEffect(()=>{
    socket.current.emit('sign-out' , {id : userInfo.id})
    
    dispatch({type : reducerCases.SET_USER_INFO , userInfo : undefined })
    signOut(firebaseAuth)
    router.push('/login')
  },[socket])
  return <div>logout</div>;
}

export default logout;

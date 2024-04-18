import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateProvider } from "@/context/StateContext";

function new1() {
    const [todose, setData] = useState([]);
     const[{socket }] = useStateProvider();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const {data : {todos}} = await axios.get("https://dummyjson.com/todos");
    //             setData(todos);
    //             console.log(todos);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
        
    
    // }, []);
useEffect(()=>{
    console.log("chal rha hu")
    socket.current.on("offer" , ({myOffer })=>{
        console.log(myOffer);
    })
},[])
     

    return (
       <div>hello</div>
    );
}

export default new1;

import React, { useEffect, useState } from "react";
import axios from "axios";

function new1() {
    const [todose, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data : {todos}} = await axios.get("https://dummyjson.com/todos");
                setData(todos);
                console.log(todos);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        
    
    }, []);
     

    return (
        <div className="bg-green-950 text-white flex-row gap-2 max-w-full fixed"> 
            {todose.map((todos , index) => (<li key={index}>{todos.id} {" "} {todos.todo}</li>))}
            
        </div>
    );
}

export default new1;

import { Server } from "socket.io"
import  {app} from "./app.js"
import dotenv from "dotenv"

dotenv.config(
    {
        path: './.env'
    }
)

app.get('/' , (req,res , next)=>{
    res.status(200).send("hello");
    next();
})

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})

const io = new Server(server , {
    cors : {
        origin : "https://chat-app-khaki-tau.vercel.app",
    },
});
global.onlineUsers = new Map();
io.on("connection" , (socket) =>{
    global.chatSocket = socket;
    socket.on("add-user" , (userId) =>{
    onlineUsers.set(userId , socket.id);
    socket.broadcast.emit('online-users' , {
        onlineUsers : Array.from(onlineUsers.keys())
    })
    });
    socket.on("send-msg" , (data) =>{
        const sendUserSocket = onlineUsers.get(data.to);
       
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve" , {
                from : data.from ,
                message : data.message,
            });
           
        }
    })

socket.on('sign-out' ,({id}) =>{
        onlineUsers.delete(id);
        socket.broadcast.emit('online-users' , {
            onlineUsers : Array.from(onlineUsers.keys())
        })
    })

socket.on("out-going-voice-call" , (data) =>{
    const sendUserSocket = onlineUsers.get(data.to);
   
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("incoming_voice_call" ,{
            from : data.from,
            roomId : data.roomId,
            type : data.type,
        }) 
    }
})

socket.on("out-going-video-call" , (data) =>{
   const sendUserSocket = onlineUsers.get(data.to);
   
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("incoming_video_call" ,{
            from : data.from,
            roomId : data.roomId,
            type : data.type,
            
        })
         
    }
})

socket.on("reject_voice_call" , (data) =>{
    const sendUserSocket = onlineUsers.get(data.from);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("voice-call-rejected")
    }
})

socket.on("reject_video_call" , ({from}) =>{
   
    const sendUserSocket = onlineUsers.get(from);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("video-call-rejected")
      
    }
})
socket.on("accept_call" , ({id}) =>{
    
    const sendUserSocket = onlineUsers.get(id);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("call-accepted")
    }
})


// my code

// socket.on("join_user",async (data)=>{
//     console.log("i get the request")
//     const sendUserSocket = await onlineUsers.get(data.from);
//     const {roomId , from } = data;
    
//     if(sendUserSocket){
//         socket.join(roomId);
//         socket.emit("joined_room", {roomId});
//         socket.broadcast.to(roomId).emit("user-joined" ,{from })
//         console.log("user get joined :" ,roomId);
//     }
// })

// socket.on("joining_offer" ,({myOffer ,from ,to}) =>{
//     const sendUserSocket = onlineUsers.get(to);
//     console.log(to)
//     console.log(myOffer)
//     if(sendUserSocket){
//         socket.to(sendUserSocket).emit("offer",{myOffer , from})

//     }
// })


});

// io.listen(40001);

import { Server } from "socket.io"
import  {app} from "./app.js"
import dotenv from "dotenv"

dotenv.config(
    {
        path: './.env'
    }
)



const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})
const io = new Server(server , {
    cors : {
        origin : "http://localhost:3000",
    },
});
global.onlineUsers = new Map();
io.on("connection" , (socket) =>{
    global.chatSocket = socket;
    socket.on("add-user" , (userId) =>{
        onlineUsers.set(userId , socket.id);
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

socket.on("out-going-voice-call" , (data) =>{
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("incoming_voice_call" ,{
            from : data.from,
            roomId : data.roomId,
            callType : data.callType,
        })
    }
})

socket.on("out-going-video-call" , (data) =>{
   
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("incoming_video_call" ,{
            from : data.from,
            roomId : data.roomId,
            callType : data.callType,
        })
        
    }
})

socket.on("reject_voice_call" , (data) =>{
    const sendUserSocket = onlineUsers.get(data.from);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("voice-call-rejected")
    }
})

socket.on("reject_video_call" , (data) =>{
    const sendUserSocket = onlineUsers.get(data.from);
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
});


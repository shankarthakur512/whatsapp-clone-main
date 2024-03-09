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
});


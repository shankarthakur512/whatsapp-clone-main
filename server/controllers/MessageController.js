
import { ApiError } from "../utils/ApiError.js";
import getPrismaInstance from "../utils/PrismaClient.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {renameSync} from "fs"
 export const addMessage = async (req , res , next) => {
    try {
        
        const prisma = getPrismaInstance();
        const {message , from , to} = req.body;
        const getUser = onlineUsers.get(to);
        if(message && from && to){
            const newMessage = await prisma.Messages.create({
                data : {
                    message ,
                    sender : {connect : {id : parseInt(from)}},
                    reciever : {connect : {id:parseInt(to)}},
                    messageStatus : getUser ? "delivered" : "sent",
                },
                include: {sender : true , reciever :true},
            })
            return res.status(201).send({message : newMessage})
        }
        return new ApiError(400 , "message required");
    }catch (err){
        next(err)
    }


}

export const getMessage = asyncHandler(async (req , res , next)=>{
    const {to , from} = req.params ;
     const prisma = getPrismaInstance();
     const messages = await prisma.Messages.findMany({
        where : {
            OR: [
                {
                    senderId : parseInt(from),
                    recieverId : parseInt(to)
                },
                {
                    senderId : parseInt(to),
                    recieverId : parseInt(from),
                },
            ],
        },
        orderBy : {
            id : "asc"
        },
     });
     const unreadMeassages = [];
    
     messages.forEach((message , index) => {
       
        
    if(message.messageStatus !== "read" && message.senderId === parseInt(to)){
         messages[index].messageStatus = "read";
         unreadMeassages.push(message.id);
         }
      });
      await prisma.Messages.updateMany({
         where : {
             id : { in: unreadMeassages}
         },
         data :  {
             messageStatus : 'read',

         },
        
     });
     res.status(200).json({messages})

})

export const addImageMessage = asyncHandler(async (req , res ,next) =>{
if(req.file) {
    const date  = Date.now();
    let fileName = "uploads/images/" + date + req.file.originalname;
    renameSync(req.file.path , fileName);
    console.log(fileName)
    const prisma = getPrismaInstance();
    const {from,to } = req.query;
    const getUser = onlineUsers.get(to);

    if(from && to){
        const message =  await prisma.Messages.create({
            data : {
                message : fileName,
                sender : {connect : {id : parseInt(from)}},
                reciever : {connect : {id:parseInt(to)}},
                messageStatus : getUser ? "delivered" : "sent",
                type : "image",
            },
        });
        return res.status(201).json({message})
    }
    return res.status(400).send("to and from rquired")
}
return res.status(400).send("Image is required")

})

export const addAudioMessage = asyncHandler(async (req , res ,next) =>{
    if(req.file) {
        const date  = Date.now();
        let fileName = "uploads/recordings/" + date + req.file.originalname;
        renameSync(req.file.path , fileName);
        console.log(fileName)
        const prisma = getPrismaInstance();
        const {from,to } = req.query;
        const getUser = onlineUsers.get(to);
    
        if(from && to){
            const message =  await prisma.Messages.create({
                data : {
                    message : fileName,
                    sender : {connect : {id : parseInt(from)}},
                    reciever : {connect : {id:parseInt(to)}},
                    messageStatus : getUser ? "delivered" : "sent",
                    type : "Audio",
                },
            });
            return res.status(201).json({message})
        }
        return res.status(400).send("to and from rquired")
    }
    return res.status(400).send("Audio is required")
    
    })
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import getPrismaInstance from "../utils/PrismaClient.js";
import { generateToken04 } from "../utils/TokenGenerator.js";
export const checkUser =asyncHandler (async (req , res,next) =>{
   const {email} = req.body
    if(!email){
        throw new ApiError(400 , "Email is not found")
}
const prisma = getPrismaInstance();

const user = await prisma.User.findUnique({where : {email}});
if(!user){
    return res.json(new ApiResponse(400 , null , "user not found", ))
}else{
    return res.status(200)
    .json(new ApiResponse(200 , user , "User found successfully"))
}
});
export const onboardingUser = asyncHandler(async(req , res) =>{
    const {email , name , image: profilePicture , about} = req.body;
    if(!email || !name || !profilePicture){
    return  res.send("Emails , Name , Image is required")
    }
    const prisma = getPrismaInstance();
   await prisma.User.create({
        data : {email , name , profilePicture , about}
    })
 return res.json(new ApiResponse(200 , null ,"User Registered Sucessfully"))
})

export const getAllUsers = asyncHandler(async (req , res) =>{
    const prisma = getPrismaInstance();
    const users = await prisma.User.findMany({
        orderBy : {name : "asc"},
        select : {
            id : true,
            email : true,
            name : true,
            profilePicture : true,
            about : true,

        },

});
const usersGroupedByInitialLetter = {};
users.forEach((user)=> {
  const initialletter = user.name.charAt(0).toUpperCase();
  if(!usersGroupedByInitialLetter[initialletter]) {
    usersGroupedByInitialLetter[initialletter] = [];
  } 
  usersGroupedByInitialLetter[initialletter].push(user)
});
return res.status(200).send({users : usersGroupedByInitialLetter})

})

export const generateToken = (req ,res, next)=>{
try {
    
    const  appId = parseInt(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_ID;
    const userId = req.params.userId;
    const effectiveTime = 3600;
    const payload = ""
    if(appId && serverSecret && userId){
    const Token = generateToken04(
        appId,
        userId,
        serverSecret,
        effectiveTime,
        payload
    );
    res.status(200).json({Token});
}else{
    res.status(400).send("appId , serverSecret or userId required")

}
} catch (error) {
    next(error);
}


}
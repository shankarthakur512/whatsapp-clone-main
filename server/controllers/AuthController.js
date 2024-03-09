import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import getPrismaInstance from "../utils/PrismaClient.js";

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
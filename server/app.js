import express from "express"
import cors from "cors"



const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json());

app.use("/uploads/images",express.static("uploads/images"))
app.use("/uploads/recordings",express.static("uploads/recordings"))




//routes
import userRouter from "./routes/AuthRoutes.js"
import messageRouter from "./routes/MessageRoutes.js"


//routes declaration
app.use("/api/v1/user", userRouter)
app.use ("/api/v1/messages" , messageRouter)




export {app}
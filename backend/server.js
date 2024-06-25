import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import express from 'express'
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import dbConnect from "./services/dbConnect.js"
import {app, server} from './socket/socket.js'

const PORT = process.env.PORT || 4000

dotenv.config()
app.use(express.json()) // to parse incoming req with payloads(from req.body)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

dbConnect();

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
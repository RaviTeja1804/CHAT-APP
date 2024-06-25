import tokenService from "../services/tokenService.js";
import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

class messageController{
    async sendMessage(req, res) {
        try {
            const {message} = req.body
            const receiverId = req.params.receiverId
            const senderId = req.params.senderId

            let conversation = await conversationModel.findOne({
                participants: { $all :[senderId, receiverId] }
            })

            if(!conversation)
            {
                conversation = await conversationModel.create({
                    participants: [senderId, receiverId],
                })
            }

            const newMessage = new messageModel({
                senderId,
                receiverId,
                message
            })

            if(newMessage)
            {
                conversation.messages.push(newMessage._id)
            }

            // await conversation.save();
            // await newMessage.save();  // one after other so slow

            // parallel execution
            await Promise.all([conversation.save(), newMessage.save()])

            const receiverSocketId = getReceiverSocketId(receiverId)
            if(receiverSocketId)
            {
                // console.log(receiverSocketId)
                // console.log(newMessage)
                io.to(receiverSocketId).emit(("newMessage", newMessage))
            }
            
            res.json(newMessage)

        } catch (error) {
            console.log("Error in sendMessage controller", error.message)
            res.json({error: "Internal server error"})
        }
    }
    
    async getMessages(req, res) {
        try {
            const receiverId = req.params.receiverId
            const senderId = req.params.senderId
            let conversation = await conversationModel.findOne({
                participants: { $all :[senderId, receiverId] }
            }).populate("messages"); // actual message

            if(!conversation)
            {
                return res.json([])
            }
            res.json(conversation.messages)

        } catch (error) {
            console.log("Error in getMessages controller", error.message)
            res.json({error: "Internal server error"})
        }
    }

}

export default new messageController();

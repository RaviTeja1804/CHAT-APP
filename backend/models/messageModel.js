import mongoose,{Schema} from "mongoose";

const messageModel = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type: String,
        required: true
    }
    //createdAt, updatedAt
}, {timestamps: true})

export default mongoose.model("Message",messageModel);
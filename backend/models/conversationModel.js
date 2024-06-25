import mongoose,{Schema} from "mongoose";

const conversationModel = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
    //createdAt, updatedAt
}, {timestamps: true})

export default mongoose.model("Conversation",conversationModel);
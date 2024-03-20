import mongoose from "mongoose";

const messagesCollections = 'messages'

const messagesSchema = new mongoose.Schema({
    user:{
        email: {
            type: String,
            required: true,
            unique: true
        },
    },
    message: {
        type: String,  
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const messageModel = mongoose.model(messagesCollections,messagesSchema)

export default messageModel;
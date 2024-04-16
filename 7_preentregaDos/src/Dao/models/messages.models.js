import mongoose from "mongoose";

const messagesCollections = 'messages'

const messagesSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, ingrese un correo electrónico válido'],
    },
    messages: [{
        type: String,  
        required: true 
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const messageModel = mongoose.model(messagesCollections,messagesSchema)

export default messageModel;
import express from 'express';
import  bodyParser from 'body-parser';
import messageModel  from './models/message.js';
import { socketServer } from '../app.js';

const messageRouter = express.Router();

messageRouter.use(bodyParser.json());

messageRouter.get('/', async  (req, res) => {} );
socket.on("userMessage", (data)=>{
    console.log('User Message: ', data);
    });

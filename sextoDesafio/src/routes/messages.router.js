import express from 'express';

const messageRouter = express.Router();


messageRouter.get( '/', ( req, res ) => {
    const messages = [
        { id: 1, content: "Hello World!" },
        { id: 2, content: "This is a test message." }
    ];

  // Sends back a JSON object with the list of messages as data.
    res.json({     
        success: true, 
        code: 200, 
        message: 'Messages retrieved successfully!',  
        data: messages  
    });
});
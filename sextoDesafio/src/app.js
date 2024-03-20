import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import path from  "path";
import { Server } from "socket.io";
import cors from "cors"
import viewsRouter from "./routes/views.router.js";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import mongoose from  'mongoose';


const  app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', express.static( __dirname + "/public"));

app.use(cors());

app.engine('handlebars',  handlebars.engine());
app.set( 'view engine' , 'handlebars');
app.set('views', __dirname + "/views");


app.use('/', viewsRouter)
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
});

const socketServer =  new Server(server)

const message = [];

const URL_MONGO = 'mongodb+srv://clbcristian:tpeyLRnudLy27oi2@cluster0.jpsemmz.mongodb.net/';
mongoose.connect(URL_MONGO, {dbName: 'ecommerce'})
    .then(()=>{
        console.log('Db connectado !!');

        socketServer.on("connection", (socket) => {
            console.log(`User ${socket.id} Connection`);
        
            let userName = "";
        
            socket.on("userConnection", (data) => {
                userName = data.user;
                message.push({
                    id: socket.id,
                    info: "connection",
                    name: data.user,
                    message: `${data.user} Conectado`,
                    date: new Date().toTimeString(),
                });
                console.log(message);
                socketServer.sockets.emit("userConnection", { message, nameUser: userName });
            });
        
            socket.on("userMessage", (data) => {
                message.push({
                    id: socket.id,
                    info: "message",
                    name: userName,
                    message: data.message,
                    date: new Date().toTimeString(),
                });
                socketServer.sockets.emit("userMessage", message);
            });
        
            socket.on("typing", (data) => {
                socket.broadcast.emit("typing", data);
            });
        });
    })
    .catch(err => {
        console.error('Error conectando la BD:', err.message);
    });

export {socketServer}
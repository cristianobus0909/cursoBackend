import express from 'express';
import routerCarts from './routes/carts.router.js';
import routerProducts from './routes/products.router.js';
import viewsRouter from  './routes/views.router.js'
import __dirname from './utils.js';
import path from 'path';
import { Server } from 'socket.io';
import cors  from 'cors';

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname(), '/views'));
app.set('view engine', 'ejs');



const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/', viewsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const server = app.listen(puerto, () => {
    console.log(`Servidor activo en puerto: ${puerto}`);
});
const io = new Server(server)

io.on("connection", (socket) => {
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
        io.sockets.emit("userConnection", { message, nameUser: userName });
    });

    socket.on("userMessage", (data) => {
        message.push({
            id: socket.id,
            info: "message",
            name: userName,
            message: data.message,
            date: new Date().toTimeString(),
        });
        io.sockets.emit("userMessage", message);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});

export { io };
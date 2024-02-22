import express from 'express';
import routerCarts from './routes/carts.router.js';
import routerProducts from './routes/products.router.js';
import usersRouter from './routes/users.router.js';
import __dirname from './utils.js';
import path from 'path';



const app = express();
const puerto = 8080;


app.use('/static', express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/users', usersRouter);



app.listen(puerto, () => {
    console.log(`Servidor activo en puerto: ${puerto}`);
});


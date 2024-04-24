import express from  'express';
import __dirname from  './utils.js' ;
import handlebars from  'express-handlebars' ;
import dotenv from  'dotenv';
import mongoose from  'mongoose';
import cookieParser from   'cookie-parser';

import initializePassport from './config/passport.config.js';

import routerViews from './routes/views.routes.js';
import usersViewsRouter from './routes/users.views.routes.js'
import UsersExtendRouter from './routes/custom/user.extend.router.js';
import jwtRouter from  './routes/jwt.routes.js';
dotenv.config()

const app = express();
const PORT =  process.env.PORT || 3001;
const URL_MONGO = process.env.URL_MONGO;

const userExtendRouter = new  UsersExtendRouter();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine())
app.set( 'view engine' , 'handlebars');
app.set('views', __dirname + "/views");

app.use(cookieParser("s3cr3tC00ck13"));

initializePassport();
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/', routerViews);
app.use('/users', usersViewsRouter)
app.use("/api/jwt", jwtRouter);

app.use('/api/extend/user', userExtendRouter.getRouter())

app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`))

mongoose.connect(URL_MONGO, {dbName:'ecommerce' })
    .then(()=>{console.log("Conexion a la base de datos exitosa")})
    .catch((err)=> console.log(err))
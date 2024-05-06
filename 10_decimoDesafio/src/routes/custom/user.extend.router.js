
import CustomRouter from './custom.router.js';
import passport from 'passport';
import UserService from '../../services/db/users.service.js';
import { authToken, generateToken } from "../../utils.js";

export default class UsersExtendRouter extends CustomRouter {
    init(){
        const userService = new UserService()

        this.get('/',['PUBLIC'],(req,res)=>{
            res.sendSuccess('Hola mundo')
        })
        this.get("/user",['USER'],(req,res)=>{
            res.sendSuccess(req.user)
        })
        this.get("/admin",['ADMIN'],(req,res)=>{
            res.sendSuccess(req.user)
        })
        this.post('/login',['PUBLIC'], passport.authenticate('login',{failureRedirect:'/api/jwt/login-failed'}),
        async (req, res) => {
            try {
                const {email, password} = req.body
                const user = await userService.getaAll({email,password})
                if (!user) {
                    return res.status(204).json('Usuario inexistente')
                }
                if (!isValidPassword(user,password)) return  res.status(401).json('Usuario y contraseña incorrecta');
                const tokenUser = {
                    name:`${user.first_name} ${user.last_name}`,
                    email:user.email,
                    age:user.age,
                    role:user.role
                }
                const token = generateToken(tokenUser);
                console.log(token);
                res.cookie('jwtCookieToken', token,{maxAge:900000, httpOnly: false});
                res.send(`Bienvenido ${tokenUser.name}`);
            } catch (error) {
                console.error(error);
                return  res.status(500).json("Error interno de la aplicacion")
            }
    
        });
        this.post("/register",passport.authenticate('register', {session:false}), async (req,res)=>{
            console.log('Registrando usuario: ', req.body);
            res.sendSuccess({status:'success', message: 'usuario creado correctamente'});
        });
    }
}
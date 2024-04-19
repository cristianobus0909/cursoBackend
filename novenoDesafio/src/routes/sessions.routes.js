import { Router } from "express";
import userModel from "../models/userModel.js";
// import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const routerSessions = Router();

routerSessions.post('/register', passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}), async (req, res) => {
    res.send({status:'success', message: 'User registered'})
});
routerSessions.get('/failregister', async(req, res)=>{
    console.log('Failed Strategy');
    res.send({error: 'Failed'});
})
routerSessions.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/faillogin'}), async(req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email,password})
    if (!user) {
        return res.status(401).json('No autorizado')
    }
    // if (!isValidPassword(user.password)) return  res.status(401).json('Contraseña incorrecta');
    // delete  user.password;
    //console.log(user);
    req.session.user = {
        name:`${user.first_name} ${user.last_name}`,
        email:user.email,
        age:user.age
    }
    res.status(200).send({payload: req.session.user, message: 'Inicio de sesion exitoso'});

});
//Eliminar la session y cerrar la sesion del usuario
routerSessions.get("/logout", (req,res)=>{
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send({ message: "Error al Cerrar Sesión", error });
        } else {
            res.redirect("/");
        }
    });
});

routerSessions.get('/faillogin',(req,res)=>{
    res.send({error:"Error en el inicio de sesión"});
})

routerSessions.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=> {
});

routerSessions.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/github/error'}), async(req, res)=>{
    const user = req.user;
    req.session.user = {
        name:`${user.first_name} ${user.last_name}`,
        email:user.email,
        age:user.age
    }
    res.redirect('/users');
})


export  default  routerSessions;
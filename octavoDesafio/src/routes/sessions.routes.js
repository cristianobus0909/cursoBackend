import { Router } from "express";
import userModel from "../models/userModel.js";

const routerSessions = Router();

routerSessions.post('/register', async (req, res) => {
    try{
        const { first_name, last_name, age, email, password } = req.body;
        console.log(req.body);
        const exist = await userModel.findOne( {email: email} );
        if (exist) {
            return  res.status(409).json({ message: 'User already exists' });
        }
        
        const user = {
            first_name,
            last_name,
            age,
            email,
            password
        };
        const result = await userModel.create(user);
        res.status(200).json("Usuario creado con exito" + result.id);
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
routerSessions.post('/login', async(req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email,password})
    if (!user) {
        return res.status(401).json('No autorizado')
    }
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


export  default  routerSessions;
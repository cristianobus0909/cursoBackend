import {fileURLToPath} from  'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy } from 'passport-local';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));

export const isValidPassword = (user,password)=> bcrypt.compareSync(password, user.password);

const PRIVATE_KEY = process.env.PRIVATE_KEY || "privatekey";

export  const generateToken = (user)=>{
    return jwt.sign({user},PRIVATE_KEY,{expiresIn: '1HS'})
}

export const authToken = (req,res,next) =>{
    const authHeader = req.headers.autorization;
    if(!authHeader){
        res.status(401).send({error:"No autenticado"});
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY,(error,credentials)=>{
        if(error) return res.status(403).send({error:'No autorizado'});
        req.user = credentials.user;
        next;
    })

}

export const passportCall = (strategy)=>{
    return async(req,res,next)=>{
        passport.authenticate(strategy,function(err,user,info){
            if(err) return next(err);
            if (!user) {
                return res.status(400).send({message : info.message})
            };
            req.user = user
            next();
        })(req,res,next);
    };
}

export const  autorization = (role)=>{
    return async (req,res,next)=>{
        if(!req.user) return res.status(401).send({message : 'No Autorizado'});
        if (req.user.role !== role) {
            return res.status(403).send('Forbidden: El usuario no tiene permisos con este rol.')
        };
        next();
    };
};

export default __dirname;

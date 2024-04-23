import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from  'passport-github2';
import { createHash, isValidPassword } from '../utils';
import userModel from '../services/db/models/users.models';
import jwt, { ExtractJwt } from 'passport-jwt';

const JWTStrategy = jwt.Strategy;
const ExtractJwt =  jwt.ExtractJwt;
const LocalStrategy = local.Strategy;


const initializePassport = ()=>{
    const cookieExtractor = req =>{
        let token = null;
        if(req && req.cookies) token = req.cookies['jwt'];
        return token;
    };
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors({cookieExtractor}),
        secretOrKey: process.env.SECRET_KEY
    },async(jwt_payload,done)=>{
        console.log('Entrando a pasport Strategy con JWT');
        try {
            console.log('JWT obtenido del Payload');
            console.log('Payload ', jwt_payload);
            return done(null, jwt_payload.user)
        } catch (error) {
            
        }
    }))
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },async (req,userName,password,done)=>{
        const { first_name,last_name,email,age} =  req.body;
        try {
            const user = await userModel.findOne({ email : userName });
            
            if(user) return done(null, false, { message:'El usuario ya existe.'});
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password:createHash(password),
            };
            const result = await userModel.create(newUser);
            return done(null,result);
        } catch (error) {
            return done(error)
        }
    }));
    passport.use('login', new LocalStrategy({
        passReqToCallback: true,
        usernameField:'email'
    },async(userName,password,done)=>{
        try {

            
        } catch (error) {
            
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async(id,done)=>{
        try {
            let user = await userModel.findById(id);
            done(null,user);
        } catch (error) {
            console.error('Error al desserializar el usuario:'+ error)
        }
    });
}

export default initializePassport;
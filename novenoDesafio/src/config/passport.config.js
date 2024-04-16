import passport from  'passport';
import local from 'passport-local';
import userModel from '../models/userModel.js';
import { createHash, isValidPassword } from '../utils.js';


const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email' 
    }, async (req, userName, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            let user = await userModel.findOne({ email: userName });
            if (user) return done(null, false, "User already exists");
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            };
            let result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error)
        }
    }));
    passport.use('login', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email' 
    }, async(username,password,done)=>{
        try {
            const user = await userModel.findOne({email:username});
            if (!user || !isValidPassword(user.password, password)) {
                return done(null,false,'No se ha encontrado un usuario con esas credenciales');
            } else {
                return done(null,user);
            }
        } catch (error) {
            return done(error);
        }
    }));
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


};

export default initializePassport;

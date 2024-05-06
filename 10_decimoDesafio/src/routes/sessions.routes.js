import { Router } from "express"
import passport from  'passport';


const router = Router();

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
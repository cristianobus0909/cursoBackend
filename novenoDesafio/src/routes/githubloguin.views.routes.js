import { Router } from "express";

const  routerGithub = Router();

routerGithub.get('/login',()=>{
    res.render('githublogin',{});
})
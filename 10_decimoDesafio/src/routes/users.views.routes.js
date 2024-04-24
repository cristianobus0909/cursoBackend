import { Router } from "express";
import { autorization, passportCall } from "../utils.js";

const router = Router();

router.get('/login',  (req,res)=>{
    res.render('login',{});
});
router.get('/register', (req,res)=>{
    res.render('register', {});
});
router.get('/', passportCall('jwt'),autorization('admin'),(req,res) => {
    res.render('profile', {
        user: req.user 
    });
});


export default router;

import { Router } from "express";

const router = Router()

router.get("/", (req, res) =>{
    return res.render("home")
});
router.get("/login", (req, res) =>{
    return res.render("githublogin")
});
export  default router;
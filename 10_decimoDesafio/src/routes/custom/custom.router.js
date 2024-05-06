import { Router } from "express";
import jwt  from 'jsonwebtoken';
import {PRIVATE_KEY} from '../../utils.js'

export default class CustomRouter {
    constructor(){
        this.router = Router();
        this.init();
    };

    getRouter(){
        return this.router;
    }
    init(){}
    get(path,policies,...callbacks){
        this.router.get(path,
            this.handlePolicies(policies),
            this.generateCustomresponses,
            this.applyCallbacks(callbacks)
            
        )
    }
    post(path,policies,...callbacks){
        this.router.post(path,
            this.handlePolicies(policies),
            this.generateCustomresponses,
            this.applyCallbacks(callbacks)
            
        )
    }
    put(path,policies,...callbacks){
        this.router.put(path,
            this.handlePolicies(policies),
            this.generateCustomresponses,
            this.applyCallbacks(callbacks)
            
        )
    }
    delete(path,policies,...callbacks){
        this.router.delete(path,
            this.handlePolicies(policies),
            this.generateCustomresponses,
            this.applyCallbacks(callbacks)
            
        )
    }
    handlePolicies = policies =>(req,res,next)=>{
        console.log("Politicas a evaluar:");
        console.log(policies);
        if (policies[0] === "PUBLIC") return next();
        const authHeader = req.headers.autorization;
        if(!authHeader){
            res.status(401).send({error:"No autenticado"});
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, PRIVATE_KEY,(error,credentials)=>{
            if(error) return res.status(403).send({error:'No autorizado'});
            const user = credentials.user;

            if (!policies.includes(req.user.role.toUpperCase())) {
                res.status(403).send({ error: `Acceso denegado, revisa tus roles!` });
            }
            req.user = user;
            console.log(req.user);
            next();
        })

    }


    generateCustomresponses = (req, res, next)=>{
        res.sendSuccess = payload => res.status(200).send({status: "Success", payload});
        res.sendInternalServerError = error => res.status(500).send({status: "Error", error});
        res.sendClientError = error => res.status(400).send({status: "Client Error, Bad request from client.", error});
        res.sendUnauthorizedError = error => res.status(401).send({error: "User not authenticated or missing token."});
        res.sendForbiddenError = error => res.status(403).send({error: "Token invalid or user with no access, Unauthorized please check your roles!"});
        next();
    }
    applyCallbacks(callbacks){
        return callbacks.map((callback)=> async(...params)=>{
                try {
                    await callback.apply(this, params)
                } catch (error) {
                    console.log(error);
                    params[1].status(500).send(error);
                }
            }
        )
    }
};
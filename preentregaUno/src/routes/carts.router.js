import { Router } from "express";
import cartManager from "../classes/cartManager.js";
import bodyParser  from 'body-parser';


const  routerCarts = Router();

routerCarts.use(bodyParser.json());
routerCarts.post( '/', async (req, res) =>{
    try {
        const {id, quantity} = req.body;
        const newCart = await cartManager.createCart();
        const addProduct =  await cartManager.addProductToCart(newCart.id, req.body.id, req.body.quantity );
    }catch (error) {
        console.log(`Error: ${error}`);
        return res.status(400).json({message : error.toString()});
    }
    
})

export default routerCarts;
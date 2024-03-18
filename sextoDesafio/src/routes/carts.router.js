import { Router } from "express";
import cartModel from "../Dao/models/carts.models.js";
import bodyParser  from 'body-parser';


const routerCarts = Router();

routerCarts.use(bodyParser.json());


routerCarts.post("/", async (req, res) => {
    try {
        const newCart = cartModel.create({...req.body});
        return res.status(201).send(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

routerCarts.get("/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cartProducts = await cartModel.find(cartId);
        if (!cartProducts) {
            return res.status(404).json({ message: 'No se encontró el carrito.' })
        } else {
            return res.status(200).send(cartProducts);
        }
    } catch (error) {
        console.log("ERROR en get /carts/:id");
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

});


routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);
    try {
        await cartModel.create(cartId, productId, quantity);
        res.json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
    }
})
export default routerCarts;
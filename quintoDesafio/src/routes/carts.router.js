import { Router } from "express";
import cartManager from "../classes/cartManager.js";
import bodyParser  from 'body-parser';


const routerCarts = Router();

routerCarts.use(bodyParser.json());


routerCarts.post("/", async (req, res) => {
    try {
        const newCart = cartManager.createCart();
        res.status(200).json({ newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

routerCarts.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cartProducts = await cartManager.readCarts(cartId);
    res.json(cartProducts);
});


routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);
    try {
        await cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
    }
})
export default routerCarts;
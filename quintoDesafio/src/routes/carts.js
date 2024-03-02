import express from 'express'
import bodyParser from 'body-parser';
import cartManager from '../classes/cartManager.js';

const routerCarts = express.Router();

routerCarts.use(bodyParser.json());


routerCarts.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(200).json({ newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

routerCarts.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const cartProducts = await cartManager.readCarts(cartId);
    res.json(cartProducts);
});


routerCarts.post("/:cid/product/:pid", async(req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        const result = await cartManager.addProductToCart(cartId, productId, quantity);
        result ? res.json({ message: "Producto agregado al carrito" }) : res.status(404).json({ error: "Carrito no encontrado" });
    } catch (error) {
        console.log(error, 'error al agregar el producto');
        return res.status(400).send("No se ha podido añadir el producto");    
    }

});
export default routerCarts;
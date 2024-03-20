import { Router } from "express";
import cartModel from "../Dao/models/carts.models.js";
import bodyParser  from 'body-parser';
import productModel from "../Dao/models/products.models.js";

const routerCarts = Router();

routerCarts.use(bodyParser.json());

routerCarts.get("/", async (req, res) => {
    try {
        const allCarts = await cartModel.find();
        return res.status(201).send(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});
routerCarts.post("/", async (req, res) => {
    try {
        const newCart = await cartModel.create({...req.body});
        return res.status(201).send(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

routerCarts.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartProducts = await cartModel.findById({_id:cartId});
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
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);
    try {
        const productById =  await productModel.findById({_id:productId}).exec();
        console.log(productById);
        if(!productById){
            return res.status(404).json({message:'Producto no encontrado'})
        }
        let cart = await cartModel.findOneAndUpdate(
            { _id: cartId, 'products.productId': productById },
            { $inc: { 'products.$.quantity': quantity } },
            { new: true }
        );
        console.log(cart);
        if (!cart) {
            cart = await cartModel.findOneAndUpdate(
                { _id: cartId },
                { $push: { products: { productId: productById, quantity: quantity } } },
                { new: true, upsert: true }
            );
        }
        res.json({ message: 'Producto agregado al carrito correctamente', cart });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
    }
})

routerCarts.delete('/:cid', async (req, res)=>{
    const cartId = req.params.cid;
    try {
        const deletedCart = await cartModel.deleteOne({_id:cartId});
        if (!deletedCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json({ message: 'Carrito eliminado con éxito', data: deletedCart });
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ error: 'No se pudo eliminar el carrito' });
    }
});


export default routerCarts;
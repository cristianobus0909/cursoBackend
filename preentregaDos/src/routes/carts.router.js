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
        const cartProducts = await cartModel.findById({_id:cartId}).exec();
        if (!cartProducts) {
            return res.status(404).json({ message: 'No se encontró el carrito.' })
        } else {
            return res.status(200).send(cartProducts);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

});


routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);
    try {
        const cart =  await cartModel.findOne({_id:cartId});
        console.log(cart);
        if(!cart){
            return res.status(404).json({message:'Carrito no encontrado'})
        }
        cart.products.push({product : productId , quantity : quantity}) ;
        await cartModel.updateOne({ _id: cart._id },{ products: cart}, function(err, result ){
            if(err){
                res.status(500).json({ error:'Error al guardar los cambios' });
            }else{
                res.status(201).send(result);
            }  
        });
        res.json({ message: 'Producto agregado al carrito correctamente', cart });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
    }
})

//DELETE api/carts/:cid deberá eliminar todos los productos del carrito 🆗
routerCarts.delete('/:cid', async (req, res)=>{
    const cartId = req.params.cid;
    try {
        const deleteCart = await cartModel.updateOne({_id:cartId},  { $set: { products: [] } },
            (err, result) => {
                if (err) {
                console.error('Error al vaciar el carrito:', err);
                
                } else {
                console.log('Carrito de productos vacío:', result);
                
                }
            });
        if (!deleteCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json({ message: 'Carrito eliminado con éxito', data: deleteCart });
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ error: 'No se pudo eliminar el carrito' });
    }
});

//DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
routerCarts.delete('/:cid/product/:pid', async (req, res) => {});
//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
routerCarts.put('/:cid', async (req, res) => {});
//PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
routerCarts.put('/:cid/product/:pid', async (req, res) => {});

export default routerCarts;
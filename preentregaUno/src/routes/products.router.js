import { Router } from "express";
import productManager from "../classes/ProductManager.js";
import bodyParser  from 'body-parser';

const routerProducts = Router();

routerProducts.use(bodyParser.json());

routerProducts.get('/', async (req, res)=>{
    try{
        const products = await productManager.getProducts()
        const limit = parseInt(req.query.limit);
        if(!isNaN(limit) && limit > 0) {
            const products = data.slice(0, limit);
            return res.status(200).send({products});
        };
        return res.status(200).send({products});
    }catch(err){
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

routerProducts.get('/:pid',  async (req, res)=> {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        console.log(product);
        if (product) {
            return res.json({product});
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos por Id' });
    }
});

routerProducts.post( '/', async (req,res) => {
    try {
        const {
            title,
            description,
            price,
            thumbnails,
            code,
            stock
        } = req.body;
        const  newProduct = await productManager.addProduct(title,description,price,thumbnails,code,stock);
        if (!newProduct) {
            return res.status(201).json({ message: 'Producto agregado con éxito' });
        } else {
            return res.status(400).json({ error: "No se enviaron todos los campos" });
        }
    } catch (error) {
        console.log('ERROR AL AGREGAR PRODUCTO');
        console.log(error);
        return res.status(500).json({ error: "No se pudo  agregar el producto" })
    }
});
        


routerProducts.put("/:pid",async (req,res) => {
    const id = parseInt(req.params.pid);
    const product = req.body;
    try{
        const updatedProduct = await productManager.updateProduct(id,product);
        
        if (!updatedProduct) {
            return res.status(404).json({ message: "No se ha podido actualizar el producto" })
        }
        res.status(201).json(updatedProduct);
    }catch(error){
        res.status(500).json({message:"Error en el servidor"});
    }
});


routerProducts.delete('/:pid', async (req, res) => {
    const prodID = parseInt(req.params.pid);

    const productDeleted = await productManager.deleteProduct(prodID);
    
    if(!productDeleted) {
        return res.status(400).send("No se ha podido eliminar el producto");
    }
    res.status(200).send("Producto eliminado");
})

export default routerProducts;
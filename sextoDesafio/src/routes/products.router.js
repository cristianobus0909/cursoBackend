import productModel from "../Dao/models/products.models.js";
import express from "express";
import bodyParser from 'body-parser';


const routerProducts = express.Router();

routerProducts.use(bodyParser.json());


routerProducts.get('/', async(req, res) => {
    try{
        const products = await productModel.find();
        const limit = parseInt(req.query.limit);
        if(limit) {
            const limitedProducts = products.slice(0, limit);
            return res.status(200).send(limitedProducts)
        }else{
            return res.status(200).send({products})
        }
    }catch{
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
    
    res.json(products);
});

routerProducts.get('/:pid',async(req, res)=>{
    const productId = parseInt(req.params.pid);
    const product = await productModel.findById(productId);
    if (product) {
        res.json(product);
    } else {
        
        res.status(404).json({ error: 'Producto no encontrado' });
    }
})

routerProducts.post('/', async (req, res) => {
    const {
        title,
        description,
        price,
        category,
        status,
        thumbnails,
        code,
        stock
    } = req.body;

    if (!title || !description || !price || !category  || !thumbnails || !code || stock === undefined ) {
        res.status(400).json({ error: 'Todos los campos son requeridos' });
    }else {
        await productModel.create(title, description, price, category, status, thumbnails, code, stock);
    }
    
    res.status(201).json({ message: 'Producto agregado con éxito' });
    
});
routerProducts.put('/:pid', async (req, res)=>{
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    productModel.updateOne(productId, updatedFields);

    res.status(200).json({ message: 'Producto actualizado con éxito' });
});
routerProducts.delete('/:pid', async (req, res)=>{
    const productId = parseInt(req.params.pid);
    productModel.deleteOne(productId);

    res.status(200).json({ message: 'Producto eliminado con éxito' });
});


export default routerProducts;
import express  from "express";
const fs = require("fs")
const productRouter = express.routers();

productRouter.post('/', (req, res)=>{
    
    const{
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails

    } = req.body
    if(!title || !description || !code || !price || !stock || !category){
        return res.status(400).json({message:'Todos los campos son obligatorios'});
    }
    const data = fs.readFile('products.json', 'utf-8');
    const products = JSON.parse(data);
    const newProduct = {
        id: Date.now().toString(),
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    }
    products.push(newProduct);
    fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf-8');
    res.status(200).json(newProduct);
})

export default productRouter
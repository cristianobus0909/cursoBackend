import express from  'express';
import productManager from "./ProductManager.js";
import bodyParser from "body-parser";



const app = express();
const PORT =  3001;


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/products',  async (req, res)=>{
    try{
        const products = await productManager.getProducts()
        const limit = parseInt(req.query.limit);
        if(!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit);
        };
    }catch(err){
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})
app.get('/products/:pid',  async (req,res)=> {

    const productId = parseInt(req.params.id);
    const product = await productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }

});

app.listen(PORT, ()=>{console.log(`Servidor activo en puerto:${PORT}`)})



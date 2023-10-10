
const express = require("express") ;
const path = require('path'); 
const ProductManager = require('./ProductManager');
const bodyParser = require('body-parser');

const app = express();
const puerto = 8080
const jsonFilePath = path.join(__dirname, 'products.json');
const productManager = new ProductManager(jsonFilePath)

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.get('/products', (req, res) => {
    try{
        const products = productManager.getProducts();
        const limit = parseInt(req.query.limit);
        if(!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit);
        };
    }catch{
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
    
    res.json(products);
});
app.get('/products/:pid',(req, res)=>{
    const productId = parseInt(req.params.id);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
})

app.listen(puerto, ()=>{console.log(`Servidor activo en puerto:${puerto}`)})

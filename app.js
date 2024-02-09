import express from  'express';
import productManager from "./ProductManager.js";
import bodyParser from "body-parser";



const app = express();
const PORT =  8080;


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/products',  async (req, res)=>{
    try{
        const data = await productManager.getProducts()
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
app.get('/products/:pid',  async (req, res)=> {
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
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.listen(PORT, ()=>{console.log(`Servidor activo en puerto:${PORT}`)})







// productManager.addProduct(
//     "Camara Nikon",
//     "Camara Nikon reflex 24mp",
//     3000,
//     'https://i.ibb.co/ZzXvqPV/nik',
//     'CAM-01',
//     10
// )
// productManager.addProduct(
//     "Camara Cannon",
//     "Camara Canon DSLR 45mp",
//     6000,
//     'https://i.ibb.co/JxhjHgQ/c',
//     'CAN-01',
//     8

// )
// productManager.addProduct(
//     "Camara Kodak",
//     "Camara Kodak film 35mm",
//     1000,
//     'https://i.ibb.co/Y7WGdTK/kodak.jpg',
//     'KOD-01',
//     5
// )

// console.log(productManager.updateProduct(
//     1,
//     "Camara Nikon Red",
//     "Camara Nikon reflex 24mp",
//     3000,
//     'https://i.ibb.co/ZzXvqPV/nik',
//     'CAM-01',
//     10
// ));


// console.log(productManager.getProductById(1));
// console.log(productManager.deleteProduct());
// console.log(productManager.getProducts());
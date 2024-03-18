import { Router } from "express";
import productModel from "../Dao/models/products.models.js";
import bodyParser from 'body-parser';
import { socketServer } from "../app.js";



const viewsRouter = Router();
viewsRouter.use(bodyParser.json());


viewsRouter.get('/', (req, res)=>{
    const products = productModel.find()
    res.render('home',{
        title: 'Backend | Handlebars',
        products: products
    });
})
viewsRouter.get('/chat', (req, res)=>{
    res.render('chat',{})
})

viewsRouter.get('/realtimeproducts', (req, res)=>{
    const products = productModel.find()
    res.render('realTimeProducts',{products})
})
viewsRouter.post('/realtimeproducts', async(req, res)=>{
    const {
        title,
        description,
        price,
        category,
        thumbnails,
        code,
        stock
    } = req.body;
    
    const status = true
    try {
        const newProduct =  await productModel.create(title,description,price,category,thumbnails,status,code,stock);
        console.log(newProduct);
        socketServer.emit('productAdded', { product: newProduct });
        
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
    res.redirect('/realtimeproducts');
})
viewsRouter.delete('/realtimeproducts', async(req, res)=>{
    const productId = req.body.id
    
    try {
        const deleteProductById = await productModel.delete(productId)
        
        socketServer.emit('productDeleted', { message: `Producto  con ID: ${deleteProductById} eliminado` });
        res.status(200).send("Producto eliminado con éxito");
    } catch (error) {
        console.error("Error al eliminar el producto:", error)
        res.status(500).send("Error interno del servidor al eliminar el producto");
    }
    res.redirect('/realtimeproducts');
    
})


export default viewsRouter;
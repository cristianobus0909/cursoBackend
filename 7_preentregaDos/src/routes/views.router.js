import { Router } from "express";
import productModel from "../Dao/models/products.models.js";
import bodyParser from 'body-parser';




const viewsRouter = Router();
viewsRouter.use(bodyParser.json());


viewsRouter.get('/', async (req, res)=>{
    let products = await productModel.find()
    products = await productModel.aggregate([
        { $group: { _id: "$category", total: { $sum: "$price" }}},
        // { $sort: { totalQuantity: -1}}
    ])
    
    // console.log("PRODUCTS : ", products)
    
    res.render('home',{
        title: 'Backend | Handlebars',
        products: products
    });
})


viewsRouter.get('/chat', async(req, res)=>{
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

viewsRouter.get('/products',(req,res)=>{
    res.render()
})

export default viewsRouter;
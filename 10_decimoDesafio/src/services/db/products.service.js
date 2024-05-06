import productModel from './models/products.models.js';


export default class  ProductService {
    constructor(){
        console.log('Trabajando con productos persistiendo desde una Bd con mongoDb');
    }
    getaAll = async()=>{
        const  products = await productModel.find();
        return products.map(product=>product.toObject());
    }
    save = async(product)=>{
        const result = await productModel.create(product);
        return  result;
    }
}
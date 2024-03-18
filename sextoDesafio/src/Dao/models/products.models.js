import mongoose from "mongoose";

const productCollections = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category:String,
    thumbnails: {type: Array , default : []},
    code: String,
    stock: Number

})

const productModel = mongoose.model(productCollections,productSchema)

export default productModel;
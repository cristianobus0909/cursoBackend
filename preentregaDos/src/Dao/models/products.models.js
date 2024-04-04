import mongoose from "mongoose";

const productCollections = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        index:  true,
        required: true
    },
    thumbnails: {
        type: Array,
        default: {
            type: String,  
            imagePath: 'https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg?w=740&t=st=1699187254~exp=1699187854~hmac=6dc0424826b7aa7168fb633cb9a20b855b2a863526e6e6a7f16a72dfa69f47ba' 
        }
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    }
})



const productModel = mongoose.model(productCollections,productSchema)

export default productModel;
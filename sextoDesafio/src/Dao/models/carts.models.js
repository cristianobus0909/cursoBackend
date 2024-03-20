import mongoose from "mongoose";

const cartsCollections = 'carts'

const cartSchema = new mongoose.Schema({
    products:[{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
})

const cartModel = mongoose.model(cartsCollections,cartSchema)

export default cartModel;
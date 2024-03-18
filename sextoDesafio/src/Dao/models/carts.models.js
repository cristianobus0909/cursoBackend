import mongoose from "mongoose";

const cartsCollections = 'carts'

const cartSchema = new mongoose.Schema({
    cart: { type: Array, required: true },

})

const cartModel = mongoose.model(cartsCollections,cartSchema)

export default cartModel;
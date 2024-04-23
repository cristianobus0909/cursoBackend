import mongoose from "mongoose";

const cartsCollections = 'carts'

const cartSchema = new mongoose.Schema({
    products:{
        type:[
            {
                productId:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        default:[]
    },
})

cartSchema.pre('findOne', function() {
    this.populate("products.productId")
})

const cartModel = mongoose.model(cartsCollections,cartSchema)

export default cartModel;
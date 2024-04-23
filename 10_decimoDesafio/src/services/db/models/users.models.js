import mongoose from "mongoose";

const  userCollection = 'users';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};
const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};


const userShema = new mongoose.Schema({
    first_name: stringTypeSchemaNonUniqueRequired,
    last_name: stringTypeSchemaNonUniqueRequired,
    age: numberTypeSchemaNonUniqueRequired,
    email: stringTypeSchemaUniqueRequired,
    password:stringTypeSchemaNonUniqueRequired,
    role: {
        type:String,
        enum : ['admin', 'user'],
        default:'user'
    }
})

const userModel = mongoose.model(userCollection,userShema);

export default userModel;
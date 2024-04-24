import userModel from "./models/users.models.js";

export default class  UserService {
    constructor(){
        console.log('Trabajando con usuarios persistiendo desde una Bd con mongoDb');
    }
    getaAll = async()=>{
        const  users = await userModel.find();
        return users.map(user=>user.toObject());
    }
    save = async(user)=>{
        const newUser = await userModel.create(user);
    }
}
import { Router } from "express";


const usersRouter = Router();

usersRouter.get('/api/users', async(req,res)=>{
    const users = await userModel.find();
    res.json({status:'succes', payload: users})
});
usersRouter.get('/api/users/uid', async(req,res)=>{
    const uId = req.params.uid
    const user = await userModel.findOne({_id: uId});
    res.json({status:'succes', payload: user})
});

usersRouter.post('/api/users', async(req,res)=>{
    const data = req.body;
    const result = await userModel.create(data);
    res.send({status:'succes', payload: result})
});
usersRouter.put('/api/users/uid', async(req, res)=>{
    const uId = req.params.uid
    const dataToUpdate = req.body
    const result = await userModel.updateOne({_id: uId}, dataToUpdate)
    res.send({status:'succes', payload: result});
});
usersRouter.delete('api/users/uid', async(req, res)=>{
    const uId = req.params.uid
    
    const result = await userModel.deleteOne({_id: uId})
    res.send({status:'succes', payload: result});
})

export default usersRouter
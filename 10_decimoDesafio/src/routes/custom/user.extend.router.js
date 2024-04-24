import CustomRouter from './custom.router.js';

export default class UsersExtendRouter extends CustomRouter {
    init(){
        this.get('/',(req,res)=>{
            res.send('Hola mundo')
        })
    }
}
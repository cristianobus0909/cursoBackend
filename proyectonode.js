// const fs = require('fs');
// const crypto = require('crypto');

// class UserManager  {
//     constructor(){
//         this.path ='Usuario.jason';
//         this.usuarios = this.cargarUsusarios()
//     }
//     cargarUsusarios(){
//         try{
//             return JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
//         }catch(error){
//             return[];
//         }
//     }
//     guardarUsusarios(){
//         fs.writeFileSync(this.path, JSON.stringify(this.usuarios, null, 2), 'utf-8')
//     }
//     hashPassword(password,salt,10000,64,'sha512'){
//         crypto()
//     }
// }
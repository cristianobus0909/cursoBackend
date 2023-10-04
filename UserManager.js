const fs = require('fs');
const crypto = require('crypto');

class UserManager  {
    constructor(){
        this.path ='Usuario.jason';
        this.usuarios = this.cargarUsusarios()
    }
    cargarUsusarios(){
        try{
            return JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
        }catch(error){
            return[];
        }
    }
    guardarUsusarios(){
        fs.writeFileSync(this.path, JSON.stringify(this.usuarios, null, 2), 'utf-8')
    }
    hashPassword(password, salt = crypto.randomBytes(16).toString('hex')){
			const hash = crypto
				.pbkdf2Sync(password,salt,10000,64,'sha512')
				.toString('hex');
			return {salt, hash};
		}
		crearUsuario(usuario){
			const {salt, hash} = this.hashPasword(usuario.password);
			this.usuarios.push({
				nombre: usuario.nombre,
				apellido: usuario.apellido,
				username: usuario.username,
				salt,
				passwordHash: hash,
			})
			this.guardarUsuario();
		}
		validarUsuario(username, password){
			const user = this.usuario.find((u)=>u.username === username);
            if(!user) return 'Usuario no encontrado';
            return this.hashPassword(password, user.salt).hash === user.passwordHash
            ? 'logueado'
            :'Contraseña no es correcta'
	}
}

const userManager = new UserManager();
userManager.crearUsuario({
    nombre:'Lucia',
    apellido:'Moyano',
    usename: 'lucia123',
    password: 'pass123'
});
const validacionMensaje = userManager.validarUsuario('lucia123','pass123');
console.log(validacionMensaje);
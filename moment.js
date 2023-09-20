const moment = require('moment');


const fechaActual = moment();
const fechaNacimiento = moment('1985-01-01')
console.log(fechaNacimiento);
if(fechaNacimiento.isValid()){
    const diasPasados = fechaActual.diff(fechaNacimiento, 'years');
    console.log(diasPasados)
}else{
    console.log('Fecha no valida')
}

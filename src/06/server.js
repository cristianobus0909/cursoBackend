const http = require('http');
// const { request } = require('https');

const servidor = http.createServer((req, res)=>{
    res.end('Mi primer hola mundo desde backend');
});
servidor.listen('8080',()=> console.log('Listening on port 8080'));
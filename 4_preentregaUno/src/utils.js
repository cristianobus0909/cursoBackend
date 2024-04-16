import {fileURLToPath} from 'url'
import path, { dirname } from 'path';
import multer from "multer"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, path.join(__dirname, 'public', 'uploads'),)},
    filename: (req, file, cb) => {

        cb(null, `${Date.now()}.${file.originalname}`)
    }
});

export const uploader = multer({storage, onError: (err, next)=>{
    console.log(err,'Ocurrio un error al procesar la carga del archivo');
    next();
}});
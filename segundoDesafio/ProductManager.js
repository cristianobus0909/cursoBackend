
import * as fs from 'fs';


class ProductManager  {
    constructor(path){
        this.path = path;
        this.products = [];
        this.autoIncrementId = 1;
    }
    //obtener o leer  el archivo de productos 
    getProducts = async()=>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error(error, 'No se pudo obtener ningún archivo');
            return []
        }
                
        
    }
    //agregar un producto
    addProduct = async(title,description,price,thumbnail,code,stock)=>{
        try {
            if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
                console.log("Todos los campos son obligatorios.");
                return;
            }
                
            if (this.products.some((product) => product.code === code)) {
                console.log(`El producto con código ${code} ya existe.`);
                return;
            }
            const newProduct = {
                id: this.autoIncrementId++,
                title,
                description,
                price,  
                thumbnail,
                code,
                stock,
            };
            this.products.push(newProduct);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
            return `Nuevo producto agregado:${newProduct}`;
        } catch (error) {
            console.error(error, 'No se pudo agregar el producto')
        }
    }
    //obtener producto por id
    getProductById = async(productId)=>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const productById = products.find((e)=>e.id === productId)
            if (!productById) {
                return console.log('No se encontró el producto');
            }else {
                console.log(`Producto con el Id: ${productById.id} fue encontrado exitosamente`);
                return productById;
            }
        } catch (error) {
            console.error(error, 'No se encontro el id del producto')
            return null;
        }
        
    }
    //actualizar
    updateProduct = async (id, updatedFields)=>{
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            let productsFromFile = JSON.parse(data);
            let index = productsFromFile.findIndex((element) => element.id == id);
            if (index === -1) {
                console.log(`El producto con el id:${id}, es inexistente `)
                return;
            }
            productsFromFile[index] = {
                ...productsFromFile[index],
                ...updatedFields
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productsFromFile, null, 2), 'utf8')
        } catch (error) {
            console.error('No se pudo actualizar el producto')
        }
        
    };
    deleteProduct = async (id) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            let productsFromFile = JSON.parse(data);
            
            const productIndex = productsFromFile.findIndex((product) => product.id === id);
            if (productIndex === -1) {
            console.log("Producto no encontrado.");
            return;
            }
            
            productsFromFile.splice(productIndex, 1);
            
            fs.writeFileSync(this.path, JSON.stringify(productsFromFile, null, 2), 'utf8');
        } catch (error) {
            console.error("Error al leer o escribir en el archivo:", error);
        }
    };
}
const productManager = new ProductManager('../products.json')

export default productManager;




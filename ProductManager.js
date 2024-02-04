class ProductManager  {
    constructor(){
        this.products = [];
        this.autoIncrementId = 1;
    }
    getProducts(){
        return this.products;
    }
    addProduct(title,description,price,thumbnail,code,stock){
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

    }
    getProductById(productId){
        const productById = this.products.find((e)=>e.id === productId)
        if (!productById) {
            return console.log('No se encontró el producto');
        }else {
            console.log(`Producto con el Id: ${productById.id} fue encontrado exitosamente`);
            return productById;
        }
    }
}

const productManager = new ProductManager()
console.log(productManager.getProducts());

productManager.addProduct(
    "Camara Nikon",
    "Camara Nikon reflex 24mp",
    3000,
    'https://i.ibb.co/ZzXvqPV/nik',
    'CAM-01',
    10
)
productManager.addProduct(
    "Camara Cannon",
    "Camara Canon DSLR 45mp",
    6000,
    'https://i.ibb.co/JxhjHgQ/c',
    'CAN-01',
    8

)

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));


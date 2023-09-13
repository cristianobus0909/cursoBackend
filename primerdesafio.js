class ProductManager {
    constructor() {
        this.products = [];
        this.nextProductId = 1;
    }

    addProduct(product) {
    
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }


        const codeExists = this.products.some((existingProduct) => existingProduct.code === product.code);
        if (codeExists) {
            console.error("El código ya existe");
            return;
        }


        product.id = this.nextProductId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.error("Producto no encontrado");
        }
        return product;
    }
}




const productManager = new ProductManager();


productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 10.99,
    thumbnail: "imagen1.jpg",
    code: "P1",
    stock: 100,
});

productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 19.99,
    thumbnail: "imagen2.jpg",
    code: "P2",
    stock: 50,
});


const products = productManager.getProducts();
console.log(products);


const productById = productManager.getProductById(1);
console.log(productById);
const fs = require('fs'); 

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.autoIncrementId = 1;
    }
    
    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
        console.log("Todos los campos son obligatorios.");
        return;
        }
        
        if (this.products.some((product) => product.code === code)) {
            console.log(`El producto con código ${code} ya existe.`);
            return;
        }
        
        const product = {
            id: this.autoIncrementId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const productsFromFile = JSON.parse(data);

            const product = productsFromFile.find((product) => product.id === id);
            if (!product) {
            console.log("Producto no encontrado.");
            }
            return product;
            } catch (error) {
            console.error("Error al leer el archivo:", error);
            return null;
        }
    }
    updateProduct(id, updatedFields) {
        
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            let productsFromFile = JSON.parse(data);
            
            const productIndex = productsFromFile.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                console.log("Producto no encontrado.");
                return;
            }
            
            productsFromFile[productIndex] = {
                ...productsFromFile[productIndex],
                ...updatedFields,
            };
            
            fs.writeFileSync(this.path, JSON.stringify(productsFromFile, null, 2), 'utf8');
        } catch (error) {
            console.error("Error al leer o escribir en el archivo:", error);
        }
    }
    deleteProduct(id) {
        
        try {
            const data = fs.readFileSync(this.path, 'utf8');
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
    }
}


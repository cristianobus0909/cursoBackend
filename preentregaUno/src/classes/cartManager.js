
import fs from 'fs'


class CartManager {
    constructor(cartDataPath) {
        this.cartDataPath = cartDataPath;
        this.carts = [];
    };

    createCart() {
        try {
            const generateUniqueId = Math.floor(Math.random() * 1000000);
            const newCart = { id: generateUniqueId, products: [] };
            const existCart =  this.carts.find((item) => item.id === newCart.id);
            if (existCart) {
                return  `El carrito con el Id: ${generateUniqueId} ya existe.`;
            } else  {
                this.carts.push(newCart);
                console.log(`Se ha creado un nuevo carrito con la siguiente información:`, newCart);
            }
            fs.writeFileSync(this.cartDataPath, JSON.stringify(newCart, null, 2), 'utf-8');
            return newCart;
            } catch (error) {
            console.error('Error al crear el carrito', error);
            }  
    };
    readCarts(cartId) {
        try {
            const data = fs.readFileSync(this.cartDataPath, 'utf-8');
            const cartsFromFile = JSON.parse(data);
            const cartFound = cartsFromFile.find((cart) => cart.id === cartId);
            if(!cartFound){
                console.log(`Carrito con id:${cartId} no encontrado.`);
                return;
            }else{
                console.log('Carrito encontrado')
            }
            return cartFound;
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return [];
        }
    };

    addProductToCart = async (cartId, productId, quantity)=> {
        try {
            const data = fs.readFileSync(this.cartDataPath, 'utf-8');
            const cartsFromFile = JSON.parse(data);
            const cartFound = cartsFromFile.find((cart) => cart.id === cartId);
    
            if (!cartFound) {
                console.log(`Carrito con id: ${cartId} no encontrado.`);
                return false;
            }
            const existingProduct = cartFound.products.find((product) => product.id === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cartFound.products.push({ id: productId, quantity });
            }

            fs.writeFileSync(this.cartDataPath, JSON.stringify(cartsFromFile, null, 2), 'utf-8');

            console.log(`Producto con id: ${productId} agregado al carrito con id: ${cartId}`);
            return true;
        } catch (error) {
            console.error("Error al leer o escribir en el archivo:", error);
            return false;
        }
    }
    

}
const cartManager = new CartManager('../carts.json');

export default cartManager;
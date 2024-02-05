import productManager from "./ProductManager.js";




// productManager.addProduct(
//     "Camara Nikon",
//     "Camara Nikon reflex 24mp",
//     3000,
//     'https://i.ibb.co/ZzXvqPV/nik',
//     'CAM-01',
//     10
// )
productManager.addProduct(
    "Camara Cannon",
    "Camara Canon DSLR 45mp",
    6000,
    'https://i.ibb.co/JxhjHgQ/c',
    'CAN-01',
    8

)
// productManager.addProduct(
//     "Camara Kodak",
//     "Camara Kodak film 35mm",
//     1000,
//     'https://i.ibb.co/Y7WGdTK/kodak.jpg',
//     'KOD-01',
//     5
// )

// console.log(productManager.updateProduct(
//     1,
//     "Camara Nikon Red",
//     "Camara Nikon reflex 24mp",
//     3000,
//     'https://i.ibb.co/ZzXvqPV/nik',
//     'CAM-01',
//     10
// ));


// console.log(productManager.getProductById(1));
// console.log(productManager.deleteProduct());
console.log(productManager.getProducts());
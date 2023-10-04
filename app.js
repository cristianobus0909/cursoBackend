import express from express
import productRouter from "./src/routes/products.routes";



const app = express();

app.use('api/products', productRouter);


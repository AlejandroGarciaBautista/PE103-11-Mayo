import express from "express";
import { connect } from 'mongoose';
import usuarios from "./usuario_route.js";
import productos from "./producto_route.js";

connect('mongodb://127.0.0.1:27017/pe-103').then(() => {
  console.log('Conectado a la base de datos');
}).catch(() => {
  console.log('Error al conectarse a la base de datos');
});

const app = express();
app.use(express.json());

usuarios(app)
productos(app)

app.listen(12345)
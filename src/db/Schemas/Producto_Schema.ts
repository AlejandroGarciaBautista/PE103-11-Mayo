import { Schema, Types } from 'mongoose';
import { ProductoInterfaz } from '../Interfaces/Producto_Interfaz.js';

export const ProductoSchema = new Schema<ProductoInterfaz> ({
  nombre: {
    type: String,
    required: true,
    unique: true
  }, 
  descripcion: {
    type: String,
    required: false
  },
  precio: {
    type: Number,
    required: true
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Deportes", "Videojuegos", "Ropa", "Calzado"]
  },
  compradores: {
    type: [Types.ObjectId],
    required: false
  }
})
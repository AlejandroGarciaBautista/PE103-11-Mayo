import { Schema } from 'mongoose';
import { UsuarioInterfaz } from '../Interfaces/Usuario_Interfaz.js';

export const UsuarioSchema = new Schema<UsuarioInterfaz> ({
  nombre: {
    type: String,
    required: true,
  }, 
  mail: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  preferencias: {
    type: String,
    required: true,
    enum: ["Deportes", "Videojuegos", "Ropa", "Calzado"]
  }
})
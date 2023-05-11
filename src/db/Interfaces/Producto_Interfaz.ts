import { Document, ObjectId } from 'mongoose';
import { Categoria } from "./Usuario_Interfaz.js"

export interface ProductoInterfaz extends Document {
  nombre: string,
  descripcion: string,
  precio: number,
  categoria: Categoria,
  compradores: ObjectId[]
}
import { Document } from 'mongoose';

export enum Categoria {
  DEPORTES = "Deportes",
  VIDEOJUEGOS = "Videojuegos",
  ROPA = "Ropa",
  CALZADO = "Calzado"
}

export interface UsuarioInterfaz extends Document {
  nombre: string,
  mail: string,
  username: string,
  preferencias: Categoria
}
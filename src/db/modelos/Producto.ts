import { model } from 'mongoose';
import { ProductoSchema } from '../Schemas/Producto_Schema.js';
import { ProductoInterfaz } from '../Interfaces/Producto_Interfaz.js';

export const Producto = model<ProductoInterfaz>("products", ProductoSchema);
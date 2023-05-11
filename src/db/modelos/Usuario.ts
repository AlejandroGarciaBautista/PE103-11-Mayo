import { model } from 'mongoose';
import { UsuarioSchema } from '../Schemas/Usuario_Schema.js';
import { UsuarioInterfaz } from '../Interfaces/Usuario_Interfaz.js';

export const Usuario = model<UsuarioInterfaz>("users", UsuarioSchema);
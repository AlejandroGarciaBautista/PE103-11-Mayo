import { Express } from 'express';
import { Usuario } from '../db/modelos/Usuario.js';

export default function usuarios(app: Express) {
  app.post('/users', async (req, res) => {
    const usuario = new Usuario(req.body);

    try {
      await usuario.save();
      return res.status(201).send(usuario);
    } catch (error) {
      return res.status(500).send(error);
    }

  });
  
  app.get('/users', async (req, res) => {
    const filtro = req.query.username?{username: req.query.username.toString()}:{};
  
    try {
      const usuario = await Usuario.find(filtro);
  
      if (usuario.length !== 0) {
        return res.send(usuario);
      }

      return res.status(404).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  
  app.patch('/users', async (req, res) => {
    if (!req.query.username) {
      return res.status(400).send({
        error: 'Debes indicar el nombre de usuario',
      });
    }
  
    const allowedUpdates = ['nombre', 'mail', 'username', 'preferencias'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidUpdate) {
      return res.status(400).send({
        error: 'Actualización NO permitida',
      });
    }
  
    try {
      const usuario = await Usuario.findOneAndUpdate({
        username: req.query.username.toString()
      },
      req.body,
      {
        new: true,
        runValidators: true
      });
  
      if (usuario) {
        return res.send(usuario);
      }
      return res.status(404).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  
  app.delete('/users', async (req, res) => {
    if (!req.query.username) {
      return res.status(400).send({
        error: 'Debes indicar un username de un usuario del sistema',
      });
    }
  
    try {
      const usuario = await Usuario.findOne({
        username: req.query.username.toString()
      });
  
      if (!usuario) {
        return res.status(404).send();
      }

      await Usuario.findByIdAndDelete(usuario._id);
      return res.send(usuario);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
}

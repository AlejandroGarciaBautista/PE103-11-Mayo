import { Express } from 'express';
import { Producto } from '../db/modelos/Producto.js';

export default function productos(app: Express) {
  app.post('/products', async (req, res) => {
    const producto = new Producto(req.body);

    try {
      await producto.save();
      return res.status(201).send(producto);
    } catch (error) {
      return res.status(500).send(error);
    }

  });
  
  app.get('/products', async (req, res) => {
    const filtro = req.query.nombre?{nombre: req.query.nombre.toString()}:{};
  
    try {
      const producto = await Producto.find(filtro);
  
      if (producto.length !== 0) {
        return res.send(producto);
      }

      return res.status(404).send();
    } catch (error) {
      return res.status(500).send(error);
    }

  });
  
  app.patch('/products', async (req, res) => {
    if (!req.query.nombre) {
      return res.status(400).send({
        error: 'Debes indicar el nombre de un producto',
      });
    }
  
    const allowedUpdates = ['nombre', 'descripcion', 'precio', 'categoria', 'compradores'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidUpdate) {
      return res.status(400).send({
        error: 'Actualización NO permitida',
      });
    }
  
    try {
      const prodcuto = await Producto.findOneAndUpdate({
        nombre: req.query.nombre.toString()
      },
      req.body,
      {
        new: true,
        runValidators: true
      });
  
      if (prodcuto) {
        return res.send(prodcuto);
      }
      return res.status(404).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  
  app.delete('/products', async (req, res) => {
    if (!req.query.nombre) {
      return res.status(400).send({
        error: 'Debes indicar un nombre de un producto',
      });
    }
  
    try {
      const producto = await Producto.findOne({
        nombre: req.query.nombre.toString()
      });
  
      if (!producto) {
        return res.status(404).send();
      }
  
      await Producto.findByIdAndDelete(producto._id);
      return res.send(producto);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
}

const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req, res) => {
  conexion.query('SELECT * FROM votaciones', (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

router.post('/', (req, res) => {
  const { titulo, fecha_inicio, fecha_fin, estado } = req.body;
  conexion.query(
    'INSERT INTO votaciones (titulo, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?)',
    [titulo, fecha_inicio, fecha_fin, estado],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Votación creada correctamente', id: resultado.insertId });
    }
  );
});

router.put('/:id', (req, res) => {
  const { titulo, fecha_inicio, fecha_fin, estado } = req.body;
  conexion.query(
    'UPDATE votaciones SET titulo = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE votacion_id = ?',
    [titulo, fecha_inicio, fecha_fin, estado, req.params.id],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Votación actualizada correctamente' });
    }
  );
});

module.exports = router;

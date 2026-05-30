const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req, res) => {
  conexion.query('SELECT * FROM polling_stations', (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

router.post('/', (req, res) => {
  const { name, address, capacity, status } = req.body;
  conexion.query(
    'INSERT INTO polling_stations (name, address, capacity, status) VALUES (?, ?, ?, ?)',
    [name, address, capacity, status],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Mesa creada correctamente', id: resultado.insertId });
    }
  );
});

module.exports = router;

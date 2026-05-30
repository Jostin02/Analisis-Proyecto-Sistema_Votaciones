const express = require('express');
const router = express.Router();
const conexion = require('../db');

// Listar votantes
router.get('/', (req, res) => {
  conexion.query('SELECT * FROM voters', (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

// Insertar votante
router.post('/', (req, res) => {
  const { first_name, last_name, id_number, polling_station_id, registration_date } = req.body;
  conexion.query(
    'INSERT INTO voters (first_name, last_name, id_number, polling_station_id, registration_date) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, id_number, polling_station_id, registration_date],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Votante registrado correctamente', id: resultado.insertId });
    }
  );
});

module.exports = router;

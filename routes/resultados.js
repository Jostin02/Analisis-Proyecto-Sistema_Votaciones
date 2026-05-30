const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req, res) => {
  conexion.query('SELECT * FROM resultados', (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

router.post('/', (req, res) => {
  const payload = req.body;

  if (Array.isArray(payload)) {
    if (payload.length === 0) {
      return res.status(400).json({ error: 'No hay resultados para insertar' });
    }

    const values = payload.map(result => [
      result.station_id,
      result.votacion_id,
      result.candidate_id,
      result.votos
    ]);

    conexion.query(
      'INSERT INTO resultados (station_id, votacion_id, candidate_id, votos) VALUES ?',
      [values],
      (err, resultado) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ mensaje: 'Resultados registrados correctamente', affectedRows: resultado.affectedRows });
      }
    );
    return;
  }

  const { station_id, votacion_id, candidate_id, votos } = payload;
  conexion.query(
    'INSERT INTO resultados (station_id, votacion_id, candidate_id, votos) VALUES (?, ?, ?, ?)',
    [station_id, votacion_id, candidate_id, votos],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Resultado registrado correctamente', id: resultado.insertId });
    }
  );
});

module.exports = router;

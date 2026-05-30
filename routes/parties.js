const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/', (req, res) => {
  conexion.query('SELECT * FROM political_parties', (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

router.post('/', (req, res) => {
  const { name, abbr, color } = req.body;
  conexion.query(
    'INSERT INTO political_parties (name, abbr, color) VALUES (?, ?, ?)',
    [name, abbr, color],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Partido registrado correctamente', id: resultado.insertId });
    }
  );
});

router.put('/:id', (req, res) => {
  const { name, abbr, color } = req.body;
  conexion.query(
    'UPDATE political_parties SET name = ?, abbr = ?, color = ? WHERE party_id = ?',
    [name, abbr, color, req.params.id],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Partido actualizado correctamente' });
    }
  );
});

module.exports = router;

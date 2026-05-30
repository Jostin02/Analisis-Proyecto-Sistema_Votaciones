const express = require('express');
const router = express.Router();
const conexion = require('../db');

// Listar candidatos
router.get('/', (req, res) => {
  const { votacion_id } = req.query;
  let query = 'SELECT * FROM candidates';
  const params = [];

  if (votacion_id) {
    query += ' WHERE votacion_id = ?';
    params.push(votacion_id);
  }

  conexion.query(query, params, (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

const validateCandidatePayload = (payload) => {
  const { first_name, last_name, position, party, votacion_id } = payload;
  if (!first_name || !last_name || !position || !party || !votacion_id) {
    return 'Los campos first_name, last_name, position, party y votacion_id son obligatorios.';
  }
  return null;
};

// Insertar candidato
router.post('/', (req, res) => {
  const validationError = validateCandidatePayload(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { first_name, last_name, party, position, votacion_id } = req.body;
  conexion.query(
    'INSERT INTO candidates (first_name, last_name, party, position, votacion_id) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, party, position, votacion_id],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Candidato registrado correctamente', id: resultado.insertId });
    }
  );
});

router.put('/:id', (req, res) => {
  const validationError = validateCandidatePayload(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { first_name, last_name, party, position, votacion_id } = req.body;
  conexion.query(
    'UPDATE candidates SET first_name = ?, last_name = ?, party = ?, position = ?, votacion_id = ? WHERE candidate_id = ?',
    [first_name, last_name, party, position, votacion_id, req.params.id],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Candidato actualizado correctamente' });
    }
  );
});

module.exports = router;

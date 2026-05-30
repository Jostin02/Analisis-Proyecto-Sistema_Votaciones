const express = require('express');
const router = express.Router();
const conexion = require('../db');

router.get('/votes-per-candidate', (req, res) => {
  const query = `
    SELECT c.candidate_id,
           CONCAT(c.first_name, ' ', c.last_name) AS name,
           c.party,
           IFNULL(SUM(r.votos), 0) AS votes
    FROM candidates c
    LEFT JOIN resultados r ON c.candidate_id = r.candidate_id
    GROUP BY c.candidate_id, c.first_name, c.last_name, c.party
    ORDER BY votes DESC
  `;

  conexion.query(query, (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

router.get('/voter-turnout', (req, res) => {
  const query = `
    SELECT 
      IFNULL(SUM(r.votos), 0) AS voted,
      (SELECT COUNT(*) FROM voters) AS registered
    FROM resultados r
  `;

  conexion.query(query, (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    const result = resultados[0] || { voted: 0, registered: 0 };
    const voted = Number(result.voted ?? 0);
    const registered = Number(result.registered ?? 0);
    const notVoted = Math.max(registered - voted, 0);
    res.json([
      { name: 'Votaron', value: voted, color: '#22c55e' },
      { name: 'No votaron', value: notVoted, color: '#3b82f6' }
    ]);
  });
});

router.get('/turnout-by-station', (req, res) => {
  const query = `
    SELECT ps.station_id,
           ps.name AS station,
           IFNULL(SUM(r.votos), 0) AS turnout
    FROM polling_stations ps
    LEFT JOIN resultados r ON ps.station_id = r.station_id
    GROUP BY ps.station_id, ps.name
    ORDER BY turnout DESC
  `;

  conexion.query(query, (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
});

module.exports = router;

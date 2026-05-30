const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());
/** este es el index donde se redirigen las rutas del archivo */


app.use(express.json());

// Importar rutas
app.use('/voters', require('./routes/voters'));
app.use('/candidates', require('./routes/candidates'));
app.use('/parties', require('./routes/parties'));
app.use('/votaciones', require('./routes/votaciones'));
app.use('/polling-stations', require('./routes/pollingStations'));
app.use('/resultados', require('./routes/resultados'));
app.use('/analytics', require('./routes/analytics'));

// Mostrar rutas registradas (diagnóstico)
const listRoutes = () => {
  console.log('=== Rutas registradas ===');
  if (app && app._router && app._router.stack) {
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        const methods = Object.keys(r.route.methods).map(m => m.toUpperCase()).join(',');
        console.log(methods.padEnd(6), r.route.path);
      }
    });
  }
  console.log('=========================');
};

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  listRoutes();
});

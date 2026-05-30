const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'sistema_votaciones'
});

conexion.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a sistema_votaciones');
  console.log('Esta funcionando bien ');
});

module.exports = conexion;

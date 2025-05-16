require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');

// Inicializar la aplicación
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Conexión a la base de datos
connectDB();

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Pedido360 - Sistema de Gestión de Pedidos para Restaurantes',
    version: '1.0.0',
    status: 'online'
  });
});

// Rutas API
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/tables', require('./routes/tables'));
// app.use('/api/menu', require('./routes/menu'));
// app.use('/api/categories', require('./routes/categories'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/reservations', require('./routes/reservations'));
// app.use('/api/stats', require('./routes/stats'));

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Error interno del servidor'
  });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}`);
}); 
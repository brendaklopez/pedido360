const mongoose = require('mongoose');

// Opciones de conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/pedido360';
    
    const conn = await mongoose.connect(connectionString, options);
    
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    
    return conn;
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 
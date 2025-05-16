const mongoose = require('mongoose');

// Esquema de Mesa
const tableSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: [true, 'El número de mesa es obligatorio'],
      unique: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, 'La capacidad de la mesa es obligatoria'],
      min: [1, 'La capacidad debe ser al menos 1']
    },
    status: {
      type: String,
      enum: ['libre', 'ocupada', 'reservada', 'mantenimiento'],
      default: 'libre'
    },
    location: {
      type: String,
      enum: ['interior', 'exterior', 'terraza', 'vip'],
      default: 'interior'
    },
    currentOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      default: null
    },
    assignedServer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    qrCode: {
      type: String,
      default: null
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para obtener todos los pedidos históricos de la mesa
tableSchema.virtual('orderHistory', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'table'
});

// Middleware para actualizar el estado de la mesa según el pedido actual
tableSchema.pre('save', async function(next) {
  if (this.isModified('currentOrder')) {
    if (this.currentOrder) {
      this.status = 'ocupada';
    } else if (this.status === 'ocupada') {
      this.status = 'libre';
    }
  }
  next();
});

// Método para asignar un mesero a la mesa
tableSchema.methods.assignServer = async function(serverId) {
  this.assignedServer = serverId;
  return this.save();
};

// Método para liberar la mesa (quitar pedido actual y cambiar estado)
tableSchema.methods.release = async function() {
  this.currentOrder = null;
  this.status = 'libre';
  return this.save();
};

// Método para reservar la mesa
tableSchema.methods.reserve = async function() {
  if (this.status !== 'ocupada') {
    this.status = 'reservada';
    return this.save();
  }
  throw new Error('No se puede reservar una mesa ocupada');
};

const Table = mongoose.model('Table', tableSchema);

module.exports = Table; 
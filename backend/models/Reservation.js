const mongoose = require('mongoose');

// Esquema de Reserva
const reservationSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio'],
        trim: true
      },
      phone: {
        type: String,
        required: [true, 'El teléfono del cliente es obligatorio'],
        trim: true
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, introduce un email válido']
      }
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: [true, 'La mesa es obligatoria']
    },
    date: {
      type: Date,
      required: [true, 'La fecha de reserva es obligatoria']
    },
    time: {
      type: String,
      required: [true, 'La hora de reserva es obligatoria'],
      validate: {
        validator: function(v) {
          return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: props => `${props.value} no es un formato de hora válido!`
      }
    },
    duration: {
      type: Number,
      default: 120, // Duración en minutos, por defecto 2 horas
      min: [30, 'La duración mínima es de 30 minutos']
    },
    partySize: {
      type: Number,
      required: [true, 'El número de personas es obligatorio'],
      min: [1, 'El número mínimo de personas es 1']
    },
    status: {
      type: String,
      enum: ['pendiente', 'confirmada', 'completada', 'cancelada', 'no_show'],
      default: 'pendiente'
    },
    notes: {
      type: String,
      default: ''
    },
    specialRequests: {
      type: String,
      default: ''
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reminderSent: {
      type: Boolean,
      default: false
    },
    confirmationCode: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Generación de código de confirmación único
reservationSchema.pre('save', async function(next) {
  if (this.isNew && !this.confirmationCode) {
    // Generar un código alfanumérico aleatorio
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Verificar que sea único
    const existingReservation = await this.constructor.findOne({ confirmationCode: code });
    if (!existingReservation) {
      this.confirmationCode = code;
    } else {
      // Intentar de nuevo con recursión (raro que ocurra, pero por seguridad)
      return this.save();
    }
  }
  next();
});

// Índices para búsquedas eficientes
reservationSchema.index({ date: 1 });
reservationSchema.index({ "customer.name": 1 });
reservationSchema.index({ "customer.phone": 1 });
reservationSchema.index({ table: 1, date: 1 }, { unique: true });

// Método para confirmar la reserva
reservationSchema.methods.confirm = async function() {
  if (this.status === 'pendiente') {
    this.status = 'confirmada';
    return this.save();
  }
  throw new Error(`No se puede confirmar una reserva con estado ${this.status}`);
};

// Método para cancelar la reserva
reservationSchema.methods.cancel = async function(reason) {
  if (this.status !== 'completada' && this.status !== 'cancelada') {
    this.status = 'cancelada';
    this.notes = this.notes ? `${this.notes}\nCancelación: ${reason}` : `Cancelación: ${reason}`;
    
    // Actualizar la mesa si está reservada para esta reserva
    const Table = mongoose.model('Table');
    const table = await Table.findById(this.table);
    if (table && table.status === 'reservada') {
      await table.release();
    }
    
    return this.save();
  }
  throw new Error(`No se puede cancelar una reserva con estado ${this.status}`);
};

// Método para marcar como completada
reservationSchema.methods.complete = async function() {
  if (this.status === 'confirmada') {
    this.status = 'completada';
    return this.save();
  }
  throw new Error(`No se puede completar una reserva con estado ${this.status}`);
};

// Método para marcar como no-show
reservationSchema.methods.markAsNoShow = async function() {
  if (this.status === 'confirmada' || this.status === 'pendiente') {
    this.status = 'no_show';
    
    // Liberar la mesa
    const Table = mongoose.model('Table');
    const table = await Table.findById(this.table);
    if (table && table.status === 'reservada') {
      await table.release();
    }
    
    return this.save();
  }
  throw new Error(`No se puede marcar como no-show una reserva con estado ${this.status}`);
};

// Método para verificar disponibilidad (estático)
reservationSchema.statics.checkAvailability = async function(date, time, duration, partySize) {
  // Convertir la fecha y hora a un objeto Date
  const reservationDate = new Date(`${date}T${time}`);
  
  // Calcular fin de la reserva
  const endTime = new Date(reservationDate.getTime() + duration * 60000);
  
  // Encontrar mesas disponibles con capacidad suficiente
  const Table = mongoose.model('Table');
  const allTables = await Table.find({ 
    capacity: { $gte: partySize },
    isActive: true
  });
  
  const tableIds = allTables.map(table => table._id);
  
  // Buscar reservas que coincidan con el rango de tiempo
  const overlappingReservations = await this.find({
    table: { $in: tableIds },
    date: { $gte: new Date(date) }, // Misma fecha
    status: { $in: ['pendiente', 'confirmada'] },
    $or: [
      // Caso 1: La nueva reserva está dentro de una existente
      {
        date: { $lte: reservationDate },
        endTime: { $gte: endTime }
      },
      // Caso 2: El inicio de la nueva está dentro de una existente
      {
        date: { $lte: reservationDate },
        endTime: { $gte: reservationDate }
      },
      // Caso 3: El fin de la nueva está dentro de una existente
      {
        date: { $lte: endTime },
        endTime: { $gte: endTime }
      }
    ]
  });
  
  // Extraer las mesas que ya están reservadas
  const reservedTableIds = overlappingReservations.map(res => res.table.toString());
  
  // Filtrar las mesas disponibles
  const availableTables = allTables.filter(table => 
    !reservedTableIds.includes(table._id.toString())
  );
  
  return availableTables;
};

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation; 
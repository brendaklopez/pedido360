const mongoose = require('mongoose');

// Esquema para un elemento individual de un pedido
const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad mínima es 1']
    },
    price: {
      type: Number,
      required: true
    },
    variant: {
      type: String,
      default: null
    },
    extras: [{
      name: String,
      price: Number
    }],
    notes: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pendiente', 'preparando', 'listo', 'entregado', 'cancelado'],
      default: 'pendiente'
    },
    preparedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    preparationStartTime: {
      type: Date,
      default: null
    },
    preparationEndTime: {
      type: Date,
      default: null
    }
  },
  { _id: true }
);

// Esquema principal de Pedido
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true
    },
    customer: {
      name: String,
      phone: String,
      email: String
    },
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: ['confirmado', 'en_preparacion', 'listo', 'entregado', 'pagado', 'cancelado'],
      default: 'confirmado'
    },
    priority: {
      type: String,
      enum: ['normal', 'alta', 'urgente'],
      default: 'normal'
    },
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      default: 0
    },
    tip: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['efectivo', 'tarjeta', 'movil', 'credito_casa', 'otro'],
      default: 'efectivo'
    },
    paymentStatus: {
      type: String,
      enum: ['pendiente', 'pagado', 'reembolsado'],
      default: 'pendiente'
    },
    paymentDate: {
      type: Date,
      default: null
    },
    notes: {
      type: String,
      default: ''
    },
    isDelivery: {
      type: Boolean,
      default: false
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      instructions: String
    },
    estimatedDeliveryTime: {
      type: Date,
      default: null
    },
    deliveryDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para calcular el tiempo total de preparación
orderSchema.virtual('preparationTime').get(function() {
  if (!this.items || this.items.length === 0) return 0;
  
  const startTimes = this.items
    .filter(item => item.preparationStartTime)
    .map(item => item.preparationStartTime.getTime());
  
  const endTimes = this.items
    .filter(item => item.preparationEndTime)
    .map(item => item.preparationEndTime.getTime());
  
  if (startTimes.length === 0 || endTimes.length === 0) return 0;
  
  const firstStart = Math.min(...startTimes);
  const lastEnd = Math.max(...endTimes);
  
  return Math.round((lastEnd - firstStart) / 60000); // En minutos
});

// Pre middleware para generar el número de pedido
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generar formato #YYMMDD-XXX (año, mes, día, contador secuencial)
    const date = new Date();
    const today = `${date.getFullYear().toString().slice(-2)}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    
    // Encontrar el último pedido del día para incrementar el contador
    const lastOrder = await this.constructor.findOne(
      { orderNumber: new RegExp(`^#${today}-`) },
      { orderNumber: 1 },
      { sort: { orderNumber: -1 } }
    );
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.split('-')[1]);
      sequence = isNaN(lastSequence) ? 1 : lastSequence + 1;
    }
    
    this.orderNumber = `#${today}-${sequence.toString().padStart(3, '0')}`;
  }
  next();
});

// Middleware para actualizar el estado general según los ítems
orderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    const allStatuses = this.items.map(item => item.status);
    
    if (allStatuses.every(status => status === 'entregado' || status === 'cancelado')) {
      this.status = 'entregado';
    } else if (allStatuses.every(status => status === 'listo')) {
      this.status = 'listo';
    } else if (allStatuses.some(status => status === 'preparando')) {
      this.status = 'en_preparacion';
    }
  }
  next();
});

// Middleware para calcular el total
orderSchema.pre('save', function(next) {
  if (this.isModified('items') || this.isModified('discount') || this.isModified('tax') || this.isModified('tip')) {
    // Calcular subtotal
    this.subtotal = this.items.reduce((sum, item) => {
      const extrasTotal = item.extras.reduce((sum, extra) => sum + (extra.price * item.quantity), 0);
      return sum + ((item.price * item.quantity) + extrasTotal);
    }, 0);
    
    // Calcular total con impuestos, propina y descuento
    this.total = this.subtotal + this.tax + this.tip - this.discount;
  }
  next();
});

// Método para cancelar un pedido
orderSchema.methods.cancel = async function(reason) {
  this.status = 'cancelado';
  this.notes = this.notes ? `${this.notes}\nCancelado: ${reason}` : `Cancelado: ${reason}`;
  
  // Cancelar todos los ítems pendientes
  this.items.forEach(item => {
    if (item.status === 'pendiente' || item.status === 'preparando') {
      item.status = 'cancelado';
    }
  });
  
  return this.save();
};

// Método para actualizar el estado de un ítem
orderSchema.methods.updateItemStatus = async function(itemId, newStatus) {
  const item = this.items.id(itemId);
  if (!item) throw new Error('Ítem no encontrado');
  
  item.status = newStatus;
  
  // Actualizar tiempos de preparación
  if (newStatus === 'preparando' && !item.preparationStartTime) {
    item.preparationStartTime = new Date();
  } else if (newStatus === 'listo' && !item.preparationEndTime) {
    item.preparationEndTime = new Date();
  }
  
  return this.save();
};

// Método para procesar el pago
orderSchema.methods.processPayment = async function(method, amount) {
  if (amount < this.total) {
    throw new Error('El monto del pago es insuficiente');
  }
  
  this.paymentMethod = method;
  this.paymentStatus = 'pagado';
  this.paymentDate = new Date();
  
  // Si hubiera cambio en efectivo, se podría calcular aquí
  
  return this.save();
};

// Índices para búsquedas eficientes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ table: 1 });
orderSchema.index({ server: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 
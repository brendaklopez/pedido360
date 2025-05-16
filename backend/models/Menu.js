const mongoose = require('mongoose');

// Esquema para variantes de un plato (ej: tamaños, opciones, etc.)
const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'El precio no puede ser negativo']
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { _id: true }
);

// Esquema para extras o complementos de un plato
const extraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'El precio no puede ser negativo']
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  { _id: true }
);

// Esquema principal para un elemento del menú
const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del plato es obligatorio'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'La categoría es obligatoria']
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    variants: [variantSchema],
    extras: [extraSchema],
    image: {
      type: String,
      default: null
    },
    preparationTime: {
      type: Number, // En minutos
      default: 15
    },
    available: {
      type: Boolean,
      default: true
    },
    isSpecial: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: String,
      trim: true
    }],
    allergens: [{
      type: String,
      enum: ['gluten', 'lacteos', 'huevos', 'frutos_secos', 'pescado', 'mariscos', 'soja', 'sulfitos', 'apio', 'mostaza', 'sesamo', 'altramuces', 'otros']
    }],
    nutritionalInfo: {
      calories: Number,
      proteins: Number,
      carbohydrates: Number,
      fats: Number,
      sodium: Number
    },
    popularity: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para calcular el precio con IVA
menuItemSchema.virtual('priceWithTax').get(function() {
  // Suponiendo un IVA del 10%
  return (this.price * 1.1).toFixed(2);
});

// Método para marcar como disponible/no disponible
menuItemSchema.methods.toggleAvailability = async function() {
  this.available = !this.available;
  return this.save();
};

// Método para actualizar la popularidad basada en pedidos
menuItemSchema.methods.updatePopularity = async function(orderCount) {
  // Algoritmo simple: 0-5 escala según cantidad de pedidos
  // Esto podría ser más sofisticado en una implementación real
  this.popularity = Math.min(5, Math.floor(orderCount / 10));
  return this.save();
};

// Índice para búsquedas más eficientes
menuItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem; 
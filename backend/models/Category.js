const mongoose = require('mongoose');

// Esquema de Categoría
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    order: {
      type: Number,
      default: 0 // Para controlar el orden de visualización
    },
    isActive: {
      type: Boolean,
      default: true
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null // Para categorías anidadas
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para obtener los platos de una categoría
categorySchema.virtual('menuItems', {
  ref: 'MenuItem',
  localField: '_id',
  foreignField: 'category'
});

// Virtual para obtener subcategorías
categorySchema.virtual('subCategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Método para activar/desactivar la categoría
categorySchema.methods.toggleActive = async function() {
  this.isActive = !this.isActive;
  return this.save();
};

// Método para contar los platos en esta categoría
categorySchema.methods.countMenuItems = async function() {
  return await mongoose.model('MenuItem').countDocuments({ category: this._id });
};

// Método para reorganizar el orden de las categorías
categorySchema.statics.reorderCategories = async function(categoryIds) {
  const updates = categoryIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { order: index }
    }
  }));
  
  return this.bulkWrite(updates);
};

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 
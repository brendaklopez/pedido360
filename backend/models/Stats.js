const mongoose = require('mongoose');

// Esquema para estadísticas diarias
const dailyStatsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true
    },
    orderCount: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    },
    averageOrderValue: {
      type: Number,
      default: 0
    },
    tipTotal: {
      type: Number,
      default: 0
    },
    taxTotal: {
      type: Number,
      default: 0
    },
    discountTotal: {
      type: Number,
      default: 0
    },
    itemsSold: {
      type: Number,
      default: 0
    },
    tablesServed: {
      type: Number,
      default: 0
    },
    averagePreparationTime: {
      type: Number,
      default: 0 // En minutos
    },
    peakHours: [{
      hour: Number, // 0-23
      orderCount: Number
    }],
    topItems: [{
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
      },
      name: String,
      quantity: Number,
      revenue: Number
    }],
    topCategories: [{
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
      name: String,
      quantity: Number,
      revenue: Number
    }],
    paymentMethods: {
      efectivo: { count: Number, amount: Number },
      tarjeta: { count: Number, amount: Number },
      movil: { count: Number, amount: Number },
      credito_casa: { count: Number, amount: Number },
      otro: { count: Number, amount: Number }
    },
    canceledOrders: {
      count: Number,
      amount: Number
    },
    serverPerformance: [{
      server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String,
      ordersServed: Number,
      tablesServed: Number,
      revenue: Number,
      tipAmount: Number
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Método para actualizar estadísticas al procesar un pedido
dailyStatsSchema.statics.updateWithOrder = async function(order, isNew = true) {
  // Obtener la fecha (solo año, mes, día)
  const orderDate = new Date(order.createdAt);
  orderDate.setHours(0, 0, 0, 0);
  
  // Buscar el registro de estadísticas del día o crear uno nuevo
  let stats = await this.findOne({ date: orderDate });
  if (!stats) {
    stats = new this({ date: orderDate });
    
    // Inicializar las estructuras de pago
    stats.paymentMethods = {
      efectivo: { count: 0, amount: 0 },
      tarjeta: { count: 0, amount: 0 },
      movil: { count: 0, amount: 0 },
      credito_casa: { count: 0, amount: 0 },
      otro: { count: 0, amount: 0 }
    };
    
    stats.canceledOrders = { count: 0, amount: 0 };
  }
  
  if (isNew) {
    // Actualizar contadores generales
    stats.orderCount += 1;
    stats.revenue += order.total;
    
    // Actualizar detalles financieros
    stats.tipTotal += order.tip;
    stats.taxTotal += order.tax;
    stats.discountTotal += order.discount;
    
    // Contar items vendidos
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    stats.itemsSold += itemCount;
    
    // Marcar la mesa como servida (si no se ha contado ya)
    if (!stats.tablesServed) stats.tablesServed = 0;
    stats.tablesServed += 1;
    
    // Registrar la hora del pedido para análisis de horas pico
    const orderHour = order.createdAt.getHours();
    let hourStat = stats.peakHours.find(h => h.hour === orderHour);
    if (!hourStat) {
      stats.peakHours.push({ hour: orderHour, orderCount: 1 });
    } else {
      hourStat.orderCount += 1;
    }
    
    // Procesar los items para las estadísticas de popularidad
    if (order.items && order.items.length > 0) {
      for (const item of order.items) {
        // Top Items
        let topItem = stats.topItems.find(i => 
          i.menuItem && i.menuItem.toString() === item.menuItem.toString()
        );
        
        if (!topItem) {
          stats.topItems.push({
            menuItem: item.menuItem,
            name: item.name,
            quantity: item.quantity,
            revenue: item.price * item.quantity
          });
        } else {
          topItem.quantity += item.quantity;
          topItem.revenue += item.price * item.quantity;
        }
        
        // Actualizar categorías después
        // Esto requeriría una consulta adicional a MenuItem para obtener la categoría
      }
      
      // Ordenar por cantidad
      stats.topItems.sort((a, b) => b.quantity - a.quantity);
      
      // Limitar a los 10 principales
      if (stats.topItems.length > 10) {
        stats.topItems = stats.topItems.slice(0, 10);
      }
    }
    
    // Actualizar rendimiento del mesero
    if (order.server) {
      let serverStat = stats.serverPerformance.find(s => 
        s.server && s.server.toString() === order.server.toString()
      );
      
      if (!serverStat) {
        // Obtener el nombre del servidor (requiere una consulta adicional)
        const User = mongoose.model('User');
        const serverUser = await User.findById(order.server);
        const serverName = serverUser ? 
          (serverUser.fullName || serverUser.username) : 'Desconocido';
        
        stats.serverPerformance.push({
          server: order.server,
          name: serverName,
          ordersServed: 1,
          tablesServed: 1,
          revenue: order.total,
          tipAmount: order.tip
        });
      } else {
        serverStat.ordersServed += 1;
        serverStat.tablesServed += 1;
        serverStat.revenue += order.total;
        serverStat.tipAmount += order.tip;
      }
    }
    
    // Actualizar tiempo promedio de preparación si está disponible
    if (order.preparationTime) {
      if (!stats.averagePreparationTime) {
        stats.averagePreparationTime = order.preparationTime;
      } else {
        // Media ponderada para dar más peso a las órdenes recientes
        stats.averagePreparationTime = 
          (stats.averagePreparationTime * 0.7) + (order.preparationTime * 0.3);
      }
    }
  } else if (order.status === 'cancelado') {
    // Actualizar estadísticas de pedidos cancelados
    stats.canceledOrders.count += 1;
    stats.canceledOrders.amount += order.total;
    
    // Si el pedido se cancela después de ser contado, ajustar las estadísticas
    stats.orderCount -= 1;
    stats.revenue -= order.total;
    // ... otros ajustes según sea necesario
  } else if (order.paymentStatus === 'pagado' && order.paymentMethod) {
    // Actualizar estadísticas de métodos de pago
    const method = order.paymentMethod; // 'efectivo', 'tarjeta', etc.
    if (stats.paymentMethods[method]) {
      stats.paymentMethods[method].count += 1;
      stats.paymentMethods[method].amount += order.total;
    }
  }
  
  // Calcular valor promedio de pedido
  if (stats.orderCount > 0) {
    stats.averageOrderValue = stats.revenue / stats.orderCount;
  }
  
  // Guardar las estadísticas actualizadas
  await stats.save();
  return stats;
};

// Método para generar informe semanal
dailyStatsSchema.statics.getWeeklyReport = async function(endDate = new Date()) {
  // Calcular fecha de inicio (7 días antes de la fecha de fin)
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6); // 7 días en total
  startDate.setHours(0, 0, 0, 0);
  
  endDate.setHours(23, 59, 59, 999);
  
  const stats = await this.find({
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: 1 });
  
  // Agregar datos diarios
  const dailyData = stats.map(day => ({
    date: day.date,
    orderCount: day.orderCount,
    revenue: day.revenue,
    averageOrderValue: day.averageOrderValue
  }));
  
  // Calcular totales
  const totals = stats.reduce((acc, day) => {
    acc.orderCount += day.orderCount;
    acc.revenue += day.revenue;
    acc.itemsSold += day.itemsSold;
    acc.tablesServed += day.tablesServed;
    return acc;
  }, { orderCount: 0, revenue: 0, itemsSold: 0, tablesServed: 0 });
  
  // Calcular promedio de valor de pedido
  if (totals.orderCount > 0) {
    totals.averageOrderValue = totals.revenue / totals.orderCount;
  } else {
    totals.averageOrderValue = 0;
  }
  
  // Obtener top items de la semana (combinando los datos diarios)
  const itemMap = new Map();
  stats.forEach(day => {
    day.topItems.forEach(item => {
      const key = item.menuItem.toString();
      if (itemMap.has(key)) {
        const existing = itemMap.get(key);
        existing.quantity += item.quantity;
        existing.revenue += item.revenue;
      } else {
        itemMap.set(key, {
          menuItem: item.menuItem,
          name: item.name,
          quantity: item.quantity,
          revenue: item.revenue
        });
      }
    });
  });
  
  // Convertir a array y ordenar
  const topItems = Array.from(itemMap.values()).sort((a, b) => b.quantity - a.quantity).slice(0, 10);
  
  return {
    period: {
      start: startDate,
      end: endDate
    },
    dailyData,
    totals,
    topItems
  };
};

// Método para generar informe mensual
dailyStatsSchema.statics.getMonthlyReport = async function(year, month) {
  // Calcular fecha de inicio y fin del mes
  const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  
  const stats = await this.find({
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: 1 });
  
  // El resto es similar al informe semanal, pero con más datos
  // ...
  
  return {
    // Datos del informe
  };
};

// Índices para consultas eficientes
dailyStatsSchema.index({ date: 1 }, { unique: true });

const DailyStats = mongoose.model('DailyStats', dailyStatsSchema);

module.exports = DailyStats; 
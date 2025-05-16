const mongoose = require('mongoose');
const connectDB = require('../config/database');
const { 
  User, 
  Table, 
  Category, 
  MenuItem, 
  Order, 
  Reservation 
} = require('../models');
const bcrypt = require('bcryptjs');

// Función para limpiar la base de datos
const clearDatabase = async () => {
  console.log('🗑️  Limpiando base de datos...');
  
  await Promise.all([
    User.deleteMany({}),
    Table.deleteMany({}),
    Category.deleteMany({}),
    MenuItem.deleteMany({}),
    Order.deleteMany({}),
    Reservation.deleteMany({})
  ]);
  
  console.log('✅ Base de datos limpia');
};

// Crear usuarios
const seedUsers = async () => {
  console.log('👤 Creando usuarios...');
  
  const salt = await bcrypt.genSalt(10);
  const passwordAdmin = await bcrypt.hash('admin123', salt);
  const passwordMesero = await bcrypt.hash('mesero123', salt);
  const passwordCocina = await bcrypt.hash('cocina123', salt);
  
  const users = [
    {
      username: 'admin',
      email: 'admin@pedido360.com',
      password: passwordAdmin,
      firstName: 'Administrador',
      lastName: 'Sistema',
      role: 'admin',
      isActive: true
    },
    {
      username: 'mesero',
      email: 'mesero@pedido360.com',
      password: passwordMesero,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      role: 'mesero',
      isActive: true
    },
    {
      username: 'mesero2',
      email: 'mesero2@pedido360.com',
      password: passwordMesero,
      firstName: 'Ana',
      lastName: 'Gómez',
      role: 'mesero',
      isActive: true
    },
    {
      username: 'cocina',
      email: 'cocina@pedido360.com',
      password: passwordCocina,
      firstName: 'Miguel',
      lastName: 'López',
      role: 'cocina',
      isActive: true
    }
  ];
  
  const createdUsers = await User.insertMany(users);
  console.log(`✅ ${createdUsers.length} usuarios creados`);
  
  return {
    admin: createdUsers[0],
    mesero: createdUsers[1],
    mesero2: createdUsers[2],
    cocina: createdUsers[3]
  };
};

// Crear mesas
const seedTables = async () => {
  console.log('🪑 Creando mesas...');
  
  const tables = [];
  
  // Mesas interiores (1-12)
  for (let i = 1; i <= 12; i++) {
    tables.push({
      number: `Mesa ${i}`,
      capacity: i <= 8 ? 4 : 6, // Las primeras 8 mesas son para 4 personas, el resto para 6
      status: 'libre',
      location: 'interior',
      isActive: true
    });
  }
  
  // Mesas exteriores (13-20)
  for (let i = 13; i <= 20; i++) {
    tables.push({
      number: `Mesa ${i}`,
      capacity: 4,
      status: 'libre',
      location: 'exterior',
      isActive: true
    });
  }
  
  // Mesas en terraza (21-25)
  for (let i = 21; i <= 25; i++) {
    tables.push({
      number: `Mesa ${i}`,
      capacity: i === 25 ? 8 : 2, // La última mesa es grande
      status: 'libre',
      location: 'terraza',
      isActive: true
    });
  }
  
  // Mesas VIP (26-30)
  for (let i = 26; i <= 30; i++) {
    tables.push({
      number: `Mesa ${i}`,
      capacity: 6,
      status: 'libre',
      location: 'vip',
      isActive: true
    });
  }
  
  const createdTables = await Table.insertMany(tables);
  console.log(`✅ ${createdTables.length} mesas creadas`);
  
  return createdTables;
};

// Crear categorías
const seedCategories = async () => {
  console.log('📋 Creando categorías...');
  
  const categories = [
    {
      name: 'Entradas',
      description: 'Aperitivos y platos para compartir',
      order: 1,
      isActive: true
    },
    {
      name: 'Platos Principales',
      description: 'Platos fuertes y especialidades de la casa',
      order: 2,
      isActive: true
    },
    {
      name: 'Pastas',
      description: 'Pastas frescas con salsas caseras',
      order: 3,
      isActive: true
    },
    {
      name: 'Pizzas',
      description: 'Pizzas artesanales a la leña',
      order: 4,
      isActive: true
    },
    {
      name: 'Ensaladas',
      description: 'Ensaladas frescas y saludables',
      order: 5,
      isActive: true
    },
    {
      name: 'Postres',
      description: 'Dulces y delicias para terminar',
      order: 6,
      isActive: true
    },
    {
      name: 'Bebidas',
      description: 'Refrescos, jugos y más',
      order: 7,
      isActive: true
    }
  ];
  
  const createdCategories = await Category.insertMany(categories);
  console.log(`✅ ${createdCategories.length} categorías creadas`);
  
  // Crear un mapa para facilitar el acceso a las categorías por nombre
  const categoryMap = {};
  createdCategories.forEach(category => {
    categoryMap[category.name] = category._id;
  });
  
  return categoryMap;
};

// Crear menú
const seedMenu = async (categoryMap) => {
  console.log('🍽️  Creando menú...');
  
  const menuItems = [
    // Entradas
    {
      name: 'Nachos con Guacamole',
      description: 'Nachos crujientes con guacamole casero',
      category: categoryMap['Entradas'],
      price: 12.50,
      preparationTime: 10,
      available: true,
      tags: ['mexicano', 'para compartir']
    },
    {
      name: 'Tabla de Quesos',
      description: 'Selección de quesos premium con frutos secos y miel',
      category: categoryMap['Entradas'],
      price: 18.90,
      preparationTime: 8,
      available: true,
      tags: ['gourmet', 'para compartir']
    },
    {
      name: 'Calamares Fritos',
      description: 'Aros de calamar fritos con salsa alioli',
      category: categoryMap['Entradas'],
      price: 14.75,
      preparationTime: 12,
      available: true,
      tags: ['mariscos', 'frito']
    },
    
    // Platos Principales
    {
      name: 'Lomo Saltado',
      description: 'Tradicional plato peruano con tiras de lomo fino salteadas con cebolla, tomate y papas fritas',
      category: categoryMap['Platos Principales'],
      price: 22.50,
      preparationTime: 20,
      available: true,
      tags: ['peruano', 'carne', 'especialidad']
    },
    {
      name: 'Pollo a la Parrilla',
      description: 'Pechuga de pollo a la parrilla con hierbas aromáticas, acompañada de puré de papas',
      category: categoryMap['Platos Principales'],
      price: 18.90,
      preparationTime: 18,
      available: true,
      tags: ['light', 'pollo', 'saludable']
    },
    {
      name: 'Salmón Grillado',
      description: 'Filete de salmón fresco a la parrilla con salsa de limón y hierbas',
      category: categoryMap['Platos Principales'],
      price: 24.90,
      preparationTime: 15,
      available: true,
      tags: ['pescado', 'saludable']
    },
    
    // Pastas
    {
      name: 'Spaghetti Carbonara',
      description: 'Pasta con salsa cremosa de huevo, panceta, queso pecorino y pimienta negra',
      category: categoryMap['Pastas'],
      price: 16.50,
      preparationTime: 15,
      available: true,
      tags: ['italiano', 'clásico']
    },
    {
      name: 'Fettuccine Alfredo',
      description: 'Pasta con salsa cremosa de mantequilla y queso parmesano',
      category: categoryMap['Pastas'],
      price: 15.90,
      preparationTime: 12,
      available: true,
      tags: ['italiano', 'vegetariano']
    },
    
    // Pizzas
    {
      name: 'Pizza Margarita',
      description: 'La clásica pizza italiana con salsa de tomate, mozzarella y albahaca',
      category: categoryMap['Pizzas'],
      price: 14.50,
      preparationTime: 18,
      available: true,
      tags: ['italiano', 'vegetariano', 'clásico'],
      variants: [
        { name: 'Individual', price: 14.50, isDefault: true },
        { name: 'Mediana', price: 18.50, isDefault: false },
        { name: 'Familiar', price: 22.50, isDefault: false }
      ]
    },
    {
      name: 'Pizza Pepperoni',
      description: 'Pizza con abundante pepperoni y queso mozzarella',
      category: categoryMap['Pizzas'],
      price: 16.50,
      preparationTime: 18,
      available: true,
      tags: ['italiano', 'picante'],
      variants: [
        { name: 'Individual', price: 16.50, isDefault: true },
        { name: 'Mediana', price: 20.50, isDefault: false },
        { name: 'Familiar', price: 25.50, isDefault: false }
      ]
    },
    
    // Ensaladas
    {
      name: 'Ensalada César',
      description: 'Lechuga romana, crutones, queso parmesano y aderezo César casero',
      category: categoryMap['Ensaladas'],
      price: 13.90,
      preparationTime: 8,
      available: true,
      tags: ['clásico', 'saludable']
    },
    {
      name: 'Ensalada Mediterránea',
      description: 'Mix de lechugas, tomate, pepino, aceitunas, queso feta y vinagreta de limón',
      category: categoryMap['Ensaladas'],
      price: 14.50,
      preparationTime: 8,
      available: true,
      tags: ['vegetariano', 'saludable']
    },
    
    // Postres
    {
      name: 'Cheesecake',
      description: 'Tarta de queso con base de galleta y cobertura de frutos rojos',
      category: categoryMap['Postres'],
      price: 8.90,
      preparationTime: 5,
      available: true,
      tags: ['dulce', 'frío']
    },
    {
      name: 'Tiramisú',
      description: 'Clásico postre italiano con capas de bizcocho, café y crema de mascarpone',
      category: categoryMap['Postres'],
      price: 9.50,
      preparationTime: 5,
      available: true,
      tags: ['italiano', 'café']
    },
    
    // Bebidas
    {
      name: 'Agua Mineral',
      description: 'Botella de agua mineral de 500ml',
      category: categoryMap['Bebidas'],
      price: 2.50,
      preparationTime: 1,
      available: true,
      tags: ['sin alcohol', 'refrescante']
    },
    {
      name: 'Refresco',
      description: 'Variedad de refrescos en lata',
      category: categoryMap['Bebidas'],
      price: 3.50,
      preparationTime: 1,
      available: true,
      tags: ['sin alcohol', 'frío'],
      variants: [
        { name: 'Cola', price: 3.50, isDefault: true },
        { name: 'Naranja', price: 3.50, isDefault: false },
        { name: 'Limón', price: 3.50, isDefault: false },
        { name: 'Zero', price: 3.75, isDefault: false }
      ]
    },
    {
      name: 'Café Americano',
      description: 'Café suave y aromático',
      category: categoryMap['Bebidas'],
      price: 3.20,
      preparationTime: 3,
      available: true,
      tags: ['caliente', 'cafeína']
    },
    {
      name: 'Vino de la Casa',
      description: 'Copa de vino tinto o blanco de la casa',
      category: categoryMap['Bebidas'],
      price: 5.90,
      preparationTime: 2,
      available: true,
      tags: ['alcohol', 'vino'],
      variants: [
        { name: 'Tinto', price: 5.90, isDefault: true },
        { name: 'Blanco', price: 5.90, isDefault: false }
      ]
    }
  ];
  
  const createdMenuItems = await MenuItem.insertMany(menuItems);
  console.log(`✅ ${createdMenuItems.length} platos creados`);
  
  // Crear un mapa para facilitar el acceso a los platos por nombre
  const menuItemMap = {};
  createdMenuItems.forEach(item => {
    menuItemMap[item.name] = item;
  });
  
  return menuItemMap;
};

// Crear algunos pedidos de ejemplo
const seedOrders = async (users, tables, menuItems) => {
  console.log('🧾 Creando pedidos de ejemplo...');
  
  // Ocupar algunas mesas para los pedidos activos
  await tables[1].updateOne({ status: 'ocupada' });
  await tables[3].updateOne({ status: 'ocupada' });
  await tables[7].updateOne({ status: 'ocupada' });
  
  // Crear pedidos con estados variados
  const orderData = [
    {
      table: tables[1]._id,
      server: users.mesero._id,
      items: [
        {
          menuItem: menuItems['Nachos con Guacamole']._id,
          name: 'Nachos con Guacamole',
          quantity: 1,
          price: menuItems['Nachos con Guacamole'].price,
          status: 'entregado'
        },
        {
          menuItem: menuItems['Pollo a la Parrilla']._id,
          name: 'Pollo a la Parrilla',
          quantity: 2,
          price: menuItems['Pollo a la Parrilla'].price,
          status: 'preparando',
          preparedBy: users.cocina._id,
          preparationStartTime: new Date()
        },
        {
          menuItem: menuItems['Agua Mineral']._id,
          name: 'Agua Mineral',
          quantity: 2,
          price: menuItems['Agua Mineral'].price,
          status: 'entregado'
        }
      ],
      status: 'en_preparacion',
      priority: 'normal',
      subtotal: 0, // Se calculará automáticamente
      total: 0 // Se calculará automáticamente
    },
    {
      table: tables[3]._id,
      server: users.mesero2._id,
      items: [
        {
          menuItem: menuItems['Pizza Pepperoni']._id,
          name: 'Pizza Pepperoni (Familiar)',
          quantity: 1,
          price: 25.50, // Precio de variante familiar
          variant: 'Familiar',
          status: 'pendiente'
        },
        {
          menuItem: menuItems['Ensalada César']._id,
          name: 'Ensalada César',
          quantity: 1,
          price: menuItems['Ensalada César'].price,
          status: 'pendiente'
        },
        {
          menuItem: menuItems['Refresco']._id,
          name: 'Refresco (Cola)',
          quantity: 3,
          price: menuItems['Refresco'].price,
          variant: 'Cola',
          status: 'pendiente'
        }
      ],
      status: 'confirmado',
      priority: 'alta', // Pedido con prioridad alta
      subtotal: 0,
      total: 0
    },
    {
      table: tables[7]._id,
      server: users.mesero._id,
      items: [
        {
          menuItem: menuItems['Spaghetti Carbonara']._id,
          name: 'Spaghetti Carbonara',
          quantity: 1,
          price: menuItems['Spaghetti Carbonara'].price,
          status: 'listo',
          preparedBy: users.cocina._id,
          preparationStartTime: new Date(Date.now() - 1000 * 60 * 15), // 15 min atrás
          preparationEndTime: new Date()
        },
        {
          menuItem: menuItems['Tiramisú']._id,
          name: 'Tiramisú',
          quantity: 1,
          price: menuItems['Tiramisú'].price,
          status: 'pendiente'
        },
        {
          menuItem: menuItems['Café Americano']._id,
          name: 'Café Americano',
          quantity: 1,
          price: menuItems['Café Americano'].price,
          status: 'pendiente'
        }
      ],
      status: 'confirmado',
      priority: 'normal',
      subtotal: 0,
      total: 0
    }
  ];
  
  // Insertar pedidos
  const orders = [];
  for (const data of orderData) {
    const order = new Order(data);
    await order.save(); // Esto disparará los middleware para calcular totales y generar número de pedido
    orders.push(order);
    
    // Actualizar mesa con el pedido actual
    await Table.findByIdAndUpdate(order.table, { currentOrder: order._id });
  }
  
  console.log(`✅ ${orders.length} pedidos creados`);
  return orders;
};

// Crear algunas reservas
const seedReservations = async (tables, users) => {
  console.log('📅 Creando reservas de ejemplo...');
  
  // Fechas para las próximas reservas
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
  
  // Marcar una mesa como reservada
  await tables[5].updateOne({ status: 'reservada' });
  
  const reservationsData = [
    {
      customer: {
        name: 'Juan Pérez',
        phone: '987654321',
        email: 'juan@example.com'
      },
      table: tables[5]._id,
      date: new Date(),
      time: '20:00',
      partySize: 4,
      status: 'confirmada',
      notes: 'Celebración de aniversario',
      createdBy: users.admin._id
    },
    {
      customer: {
        name: 'María González',
        phone: '123456789',
        email: 'maria@example.com'
      },
      table: tables[9]._id,
      date: tomorrow,
      time: '13:30',
      partySize: 6,
      status: 'pendiente',
      notes: 'Mesa preferiblemente junto a la ventana',
      createdBy: users.mesero._id
    },
    {
      customer: {
        name: 'Roberto Silva',
        phone: '555123456',
        email: 'roberto@example.com'
      },
      table: tables[26]._id, // Mesa VIP
      date: dayAfterTomorrow,
      time: '21:00',
      partySize: 6,
      status: 'confirmada',
      specialRequests: 'Botella de champagne en hielo al llegar',
      createdBy: users.admin._id
    }
  ];
  
  const reservations = await Reservation.insertMany(reservationsData);
  console.log(`✅ ${reservations.length} reservas creadas`);
  
  return reservations;
};

// Función principal para ejecutar todas las semillas
const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Limpiar datos existentes
    await clearDatabase();
    
    // Sembrar datos
    const users = await seedUsers();
    const tables = await seedTables();
    const categoryMap = await seedCategories();
    const menuItems = await seedMenu(categoryMap);
    await seedOrders(users, tables, menuItems);
    await seedReservations(tables, users);
    
    console.log('🌱 Datos de ejemplo generados exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al generar datos de ejemplo:', error);
    process.exit(1);
  }
};

// Ejecutar la función de semilla
seedDatabase(); 
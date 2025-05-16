# Pedido360 - Backend

Este directorio contiene la implementación del backend para el sistema de gestión de pedidos de restaurantes Pedido360, utilizando MongoDB como base de datos.

## Estructura de la Base de Datos

### Modelos

El sistema utiliza los siguientes modelos de datos:

#### 1. User (Usuario)
- Gestiona los usuarios del sistema con diferentes roles (admin, mesero, cocina).
- Campos principales: username, email, password, role, firstName, lastName.
- Funcionalidades: autenticación, encriptación de contraseñas, seguimiento de último login.

#### 2. Table (Mesa)
- Representa las mesas del restaurante.
- Campos principales: number, capacity, status, location, currentOrder.
- Funcionalidades: asignar mesero, liberar mesa, reservar mesa.

#### 3. MenuItem (Plato del Menú)
- Gestiona los elementos del menú del restaurante.
- Campos principales: name, description, category, price, variants, extras, image.
- Funcionalidades: seguimiento de disponibilidad, cálculo de precio con IVA, actualización de popularidad.

#### 4. Category (Categoría)
- Categoriza los platos del menú.
- Campos principales: name, description, icon, order, parentCategory.
- Funcionalidades: categorías anidadas, control de activación, reordenamiento.

#### 5. Order (Pedido)
- Gestiona los pedidos de los clientes.
- Campos principales: orderNumber, table, server, items, status, priority, subtotal, total.
- Funcionalidades: generación automática de número de pedido, cálculo de totales, seguimiento de estados.

#### 6. Reservation (Reserva)
- Gestiona las reservas de mesas.
- Campos principales: customer, table, date, time, partySize, status.
- Funcionalidades: generación de código de confirmación, verificación de disponibilidad.

#### 7. DailyStats (Estadísticas Diarias)
- Almacena estadísticas operativas y financieras del restaurante.
- Campos principales: orderCount, revenue, topItems, serverPerformance.
- Funcionalidades: actualización automática con nuevos pedidos, generación de informes.

## Relaciones entre Modelos

- **User → Order**: Un mesero (user) puede estar asociado a múltiples pedidos.
- **Table → Order**: Una mesa puede tener un pedido actual y un historial de pedidos.
- **Table → Reservation**: Una mesa puede tener reservas programadas.
- **Category → MenuItem**: Una categoría contiene múltiples elementos del menú.
- **MenuItem → Order**: Los platos forman parte de los pedidos como "order items".
- **Order → Stats**: Los pedidos alimentan las estadísticas diarias.

## Características Técnicas

- **Middleware**: Uso extensivo de middleware de Mongoose para cálculos automáticos y validaciones.
- **Virtuals**: Campos virtuales para relaciones y cálculos derivados.
- **Statics & Methods**: Métodos estáticos y de instancia para operaciones comunes.
- **Índices**: Optimización con índices para consultas frecuentes.
- **Hooks**: Pre y post hooks para operaciones automáticas (encriptación, generación de códigos, etc.).

## Requerimientos

- MongoDB 4.4 o superior
- Node.js 14 o superior
- mongoose (ODM para MongoDB)
- bcryptjs (para encriptación de contraseñas)

## Configuración

La conexión a la base de datos se configura en `config/database.js`. Por defecto, se conecta a `mongodb://localhost:27017/pedido360`, pero puede ser modificado mediante la variable de entorno `MONGODB_URI`. 
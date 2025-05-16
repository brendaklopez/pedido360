# Pedido360 - Sistema de Gestión de Pedidos para Restaurantes

Pedido360 es una aplicación web completa para la gestión de pedidos en restaurantes, diseñada para mejorar la eficiencia operativa, reducir errores y optimizar la comunicación entre el personal.

## Características Principales

- **Sistema de Roles**: Administrador, Mesero y Personal de Cocina, cada uno con acceso a un dashboard específico
- **Gestión de Mesas**: Vista en tiempo real del estado de cada mesa
- **Gestión de Pedidos**: Creación, seguimiento y actualización de pedidos
- **Menú Digital**: Gestión completa del menú con categorías, variantes y extras
- **Comunicación en Tiempo Real**: Notificaciones instantáneas entre cocina y meseros
- **Reservas**: Sistema de reservas de mesas con confirmaciones
- **Estadísticas**: Informes detallados de ventas, productos más vendidos y rendimiento del personal

## Tecnologías Utilizadas

### Frontend
- **Next.js 13+**: Framework React con App Router
- **TailwindCSS**: Para estilos y diseño responsivo
- **Framer Motion**: Para animaciones fluidas
- **Local Storage**: Para simulación de autenticación (en producción se usaría JWT)

### Backend
- **Node.js y Express**: Para la API RESTful
- **MongoDB**: Como base de datos NoSQL
- **Mongoose**: ODM para modelado de datos
- **bcryptjs**: Para encriptación de contraseñas
- **JSON Web Token**: Para autenticación (implementación futura)

## Estructura del Proyecto

```
pedido360/
├── frontend/             # Aplicación Next.js
│   ├── src/
│   │   ├── app/          # Páginas principales
│   │   │   ├── dashboard/ # Dashboards por rol
│   │   │   ├── login/     # Página de inicio de sesión
│   │   ├── components/   # Componentes reutilizables
│   │   └── ...
├── backend/              # API REST con Express
│   ├── config/           # Configuración (DB, env)
│   ├── models/           # Modelos Mongoose
│   ├── routes/           # Rutas de la API
│   ├── controllers/      # Controladores
│   ├── scripts/          # Scripts (semillas, etc.)
│   └── ...
└── ...
```

## Modelos de Datos

### Usuarios (User)
- Gestión de personal del restaurante con diferentes roles
- Autenticación segura con contraseñas encriptadas

### Mesas (Table)
- Administración del espacio físico del restaurante
- Control de estados: libre, ocupada, reservada, mantenimiento

### Menú (MenuItem y Category)
- Categorización de platos
- Precios, variantes, extras y disponibilidad

### Pedidos (Order)
- Sistema central de pedidos con estado, prioridad y seguimiento
- Cálculo automático de totales e impuestos

### Reservas (Reservation)
- Gestión de reservas con confirmaciones
- Verificación de disponibilidad de mesas

### Estadísticas (DailyStats)
- Recopilación automática de métricas importantes
- Informes diarios, semanales y mensuales

## Instalación y Ejecución

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Accede a `http://localhost:3000/login` y utiliza las siguientes credenciales de demostración:

- **Administrador**: usuario `admin` / contraseña `admin123`
- **Mesero**: usuario `mesero` / contraseña `mesero123`
- **Cocina**: usuario `cocina` / contraseña `cocina123`

### Backend

```bash
cd backend
npm install
npm run dev  # Para desarrollo con nodemon
```

Para inicializar la base de datos con datos de ejemplo:

```bash
npm run seed
```

El servidor API estará disponible en `http://localhost:5000`.

## Estado del Proyecto

El proyecto actualmente tiene implementado:

- ✅ Frontend con Next.js completo para los tres roles
- ✅ Estructura de base de datos con MongoDB
- ✅ Modelos completos con relaciones y validaciones
- ✅ Datos de demostración para pruebas
- ⏳ Implementación de rutas API (en progreso)
- ⏳ Autenticación JWT (en progreso)
- ⏳ Comunicación en tiempo real (planificado)

## Contribución

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/caracteristica-increible`)
3. Commit de tus cambios (`git commit -m 'Añadir alguna característica increíble'`)
4. Push a la rama (`git push origin feature/caracteristica-increible`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. 
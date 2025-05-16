'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import OrdersTable from '@/components/dashboard/OrdersTable';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Datos simulados para mostrar en el dashboard
  const stats = [
    { title: 'Pedidos Hoy', value: '45', change: '+12%', status: 'up' },
    { title: 'Tiempo Promedio', value: '18 min', change: '-5%', status: 'down' },
    { title: 'Satisfacción', value: '94%', change: '+2%', status: 'up' },
    { title: 'Mesas Activas', value: '24/30', change: '80%', status: 'neutral' },
  ];

  const recentOrders = [
    { id: '#1089', table: 'Mesa 12', items: '3 platos', status: 'Completado', time: '12:30', total: '$78.50' },
    { id: '#1088', table: 'Mesa 8', items: '5 platos', status: 'En preparación', time: '12:25', total: '$102.75' },
    { id: '#1087', table: 'Mesa 15', items: '2 platos', status: 'Entregado', time: '12:18', total: '$45.00' },
    { id: '#1086', table: 'Mesa 4', items: '4 platos', status: 'Confirmado', time: '12:10', total: '$65.25' },
    { id: '#1085', table: 'Mesa 9', items: '2 platos', status: 'Completado', time: '11:55', total: '$32.50' },
    { id: '#1084', table: 'Mesa 6', items: '3 platos', status: 'Completado', time: '11:45', total: '$56.25' },
    { id: '#1083', table: 'Mesa 11', items: '6 platos', status: 'Completado', time: '11:30', total: '$124.00' },
  ];

  // Verificar si el usuario está autenticado como administrador
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === 'admin') {
          setUser(parsedUser);
          setIsLoading(false);
        } else {
          // Redirigir si no es administrador
          router.push('/login');
        }
      } else {
        // Redirigir si no hay usuario
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout
      user={user}
      title="Panel de Administrador"
      onLogout={handleLogout}
    >
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Bienvenido, {user?.username}
        </motion.h1>
        <p className="text-gray-600">Aquí tienes un resumen de la actividad del restaurante.</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            status={stat.status as any}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Gestión de Usuarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-soft p-6 mb-8"
      >
        <h2 className="text-lg font-bold mb-4">Gestión de Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">A</div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">admin</div>
                      <div className="text-sm text-gray-500">admin@pedido360.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Administrador
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Hoy, 12:45 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activo
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">M</div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">mesero</div>
                      <div className="text-sm text-gray-500">mesero@pedido360.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Mesero
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Hoy, 12:30 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activo
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">C</div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">cocina</div>
                      <div className="text-sm text-gray-500">cocina@pedido360.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    Cocina
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Hoy, 11:50 AM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-primary-50 text-primary-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-100 transition-colors duration-150">
            Gestionar Usuarios
          </button>
        </div>
      </motion.div>

      {/* Pedidos recientes */}
      <OrdersTable 
        title="Pedidos Recientes"
        orders={recentOrders}
        actionButton={{
          text: "Ver todos los pedidos",
          onClick: () => console.log("Ver todos los pedidos")
        }}
      />
    </DashboardLayout>
  );
} 
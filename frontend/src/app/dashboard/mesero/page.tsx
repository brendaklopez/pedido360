'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OrdersTable from '@/components/dashboard/OrdersTable';

export default function MeseroDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mesas' | 'pedidos'>('mesas');
  
  // Datos simulados para las mesas
  const tables = [
    { id: 1, number: 'Mesa 1', status: 'Ocupada', capacity: 4, orderStatus: 'Servido' },
    { id: 2, number: 'Mesa 2', status: 'Ocupada', capacity: 2, orderStatus: 'Esperando' },
    { id: 3, number: 'Mesa 3', status: 'Libre', capacity: 6, orderStatus: '-' },
    { id: 4, number: 'Mesa 4', status: 'Ocupada', capacity: 4, orderStatus: 'En preparación' },
    { id: 5, number: 'Mesa 5', status: 'Ocupada', capacity: 4, orderStatus: 'Servido' },
    { id: 6, number: 'Mesa 6', status: 'Reservada', capacity: 8, orderStatus: '-' },
    { id: 7, number: 'Mesa 7', status: 'Libre', capacity: 2, orderStatus: '-' },
    { id: 8, number: 'Mesa 8', status: 'Ocupada', capacity: 4, orderStatus: 'Esperando' },
  ];

  // Datos simulados para los pedidos activos
  const activeOrders = [
    { id: '#1088', table: 'Mesa 8', items: '5 platos', status: 'En preparación', time: '12:25', total: '$102.75' },
    { id: '#1086', table: 'Mesa 4', items: '4 platos', status: 'Confirmado', time: '12:10', total: '$65.25' },
    { id: '#1087', table: 'Mesa 15', items: '2 platos', status: 'Entregado', time: '12:18', total: '$45.00' },
    { id: '#1078', table: 'Mesa 2', items: '3 platos', status: 'Esperando', time: '11:55', total: '$58.50' },
  ];

  // Verificar si el usuario está autenticado como mesero
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === 'mesero') {
          setUser(parsedUser);
          setIsLoading(false);
        } else {
          // Redirigir si no es mesero
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

  const getTableStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ocupada':
        return 'bg-yellow-100 text-yellow-800';
      case 'libre':
        return 'bg-green-100 text-green-800';
      case 'reservada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en preparación':
        return 'bg-yellow-100 text-yellow-800';
      case 'servido':
        return 'bg-green-100 text-green-800';
      case 'esperando':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      title="Panel de Mesero"
      onLogout={handleLogout}
    >
      <div className="mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Bienvenido, {user?.username}
        </motion.h1>
        <p className="text-gray-600">Gestiona las mesas y pedidos del restaurante.</p>
      </div>

      {/* Pestañas de navegación */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('mesas')}
            className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'mesas'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mesas
          </button>
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'pedidos'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pedidos Activos
          </button>
        </nav>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'mesas' ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tables.map((table) => (
              <motion.div
                key={table.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-soft p-5 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{table.number}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTableStatusColor(table.status)}`}>
                    {table.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Capacidad:</span>
                    <span className="text-sm font-medium">{table.capacity} personas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Estado de pedido:</span>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded ${table.orderStatus !== '-' ? getOrderStatusColor(table.orderStatus) : ''}`}>
                      {table.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Ver detalles
                  </button>
                  {table.status === 'Ocupada' && (
                    <button className="text-sm bg-primary-50 text-primary-600 px-3 py-1 rounded hover:bg-primary-100">
                      Tomar pedido
                    </button>
                  )}
                  {table.status === 'Libre' && (
                    <button className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded hover:bg-green-100">
                      Asignar mesa
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <OrdersTable 
            title="Pedidos Activos"
            orders={activeOrders}
            actionButton={{
              text: "Nuevo Pedido",
              onClick: () => console.log("Nuevo pedido")
            }}
          />
        </motion.div>
      )}
    </DashboardLayout>
  );
} 
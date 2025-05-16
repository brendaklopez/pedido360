'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  notes?: string;
  status: 'pendiente' | 'preparando' | 'listo';
}

interface Order {
  id: string;
  table: string;
  time: string;
  items: OrderItem[];
  priority: 'normal' | 'alta';
}

export default function CocinaDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Datos simulados para las órdenes de cocina
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#1088',
      table: 'Mesa 8',
      time: '12:25',
      priority: 'alta',
      items: [
        { id: '1', name: 'Ensalada César', quantity: 2, status: 'pendiente' },
        { id: '2', name: 'Pasta Carbonara', quantity: 1, status: 'preparando', notes: 'Sin tocino' },
        { id: '3', name: 'Pizza Margarita', quantity: 2, status: 'pendiente' },
      ]
    },
    {
      id: '#1086',
      table: 'Mesa 4',
      time: '12:10',
      priority: 'normal',
      items: [
        { id: '4', name: 'Hamburguesa clásica', quantity: 2, status: 'listo' },
        { id: '5', name: 'Papas fritas', quantity: 2, status: 'listo' },
      ]
    },
    {
      id: '#1087',
      table: 'Mesa 15',
      time: '12:18',
      priority: 'normal',
      items: [
        { id: '6', name: 'Sopa de tomate', quantity: 1, status: 'preparando' },
        { id: '7', name: 'Filete de salmón', quantity: 1, status: 'pendiente', notes: 'Término medio' },
      ]
    },
  ]);

  // Verificar si el usuario está autenticado como personal de cocina
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === 'cocina') {
          setUser(parsedUser);
          setIsLoading(false);
        } else {
          // Redirigir si no es personal de cocina
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

  // Actualizar el estado de un elemento del pedido
  const updateItemStatus = (orderId: string, itemId: string, newStatus: 'pendiente' | 'preparando' | 'listo') => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map(item => {
          if (item.id === itemId) {
            return { ...item, status: newStatus };
          }
          return item;
        });
        return { ...order, items: updatedItems };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  // Comprobar si todos los elementos de un pedido están listos
  const isOrderComplete = (order: Order) => {
    return order.items.every(item => item.status === 'listo');
  };

  // Contador de elementos por estado
  const countItems = () => {
    let pending = 0;
    let inProgress = 0;
    let ready = 0;

    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.status === 'pendiente') pending += item.quantity;
        if (item.status === 'preparando') inProgress += item.quantity;
        if (item.status === 'listo') ready += item.quantity;
      });
    });

    return { pending, inProgress, ready };
  };

  const { pending, inProgress, ready } = countItems();

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
      title="Panel de Cocina"
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
        <p className="text-gray-600">Gestiona los pedidos de cocina en tiempo real.</p>
      </div>

      {/* Resumen de pedidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 p-4 rounded-xl shadow-soft"
        >
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-red-800">Pendientes</p>
              <p className="text-2xl font-bold text-red-900">{pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 p-4 rounded-xl shadow-soft"
        >
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-800">En preparación</p>
              <p className="text-2xl font-bold text-yellow-900">{inProgress}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 p-4 rounded-xl shadow-soft"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-800">Listos</p>
              <p className="text-2xl font-bold text-green-900">{ready}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cola de pedidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Cola de Pedidos</h2>
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className={`bg-white rounded-xl shadow-soft p-5 border-l-4 ${
                order.priority === 'alta' ? 'border-red-500' : 'border-blue-500'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{order.id}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">{order.table}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">{order.time}</span>
                  </div>
                  {order.priority === 'alta' && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1 inline-block">
                      Prioridad Alta
                    </span>
                  )}
                </div>
                {isOrderComplete(order) ? (
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Completado
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                    En proceso
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="flex items-start space-x-2">
                      <div className="bg-gray-100 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                        {item.quantity}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.notes && (
                          <p className="text-sm text-gray-500 italic">{item.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'pendiente' 
                            ? 'bg-red-100 text-red-800' 
                            : item.status === 'preparando' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {item.status === 'pendiente' ? 'Pendiente' : item.status === 'preparando' ? 'Preparando' : 'Listo'}
                      </span>
                      <div className="flex space-x-1">
                        {item.status === 'pendiente' && (
                          <button 
                            onClick={() => updateItemStatus(order.id, item.id, 'preparando')}
                            className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 p-1.5 rounded-md"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                            </svg>
                          </button>
                        )}
                        {item.status === 'preparando' && (
                          <button 
                            onClick={() => updateItemStatus(order.id, item.id, 'listo')}
                            className="bg-green-50 hover:bg-green-100 text-green-800 p-1.5 rounded-md"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {isOrderComplete(order) && (
                <div className="mt-4 text-right">
                  <button className="bg-green-50 text-green-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-100 transition-colors duration-150">
                    Marcar como enviado
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
} 
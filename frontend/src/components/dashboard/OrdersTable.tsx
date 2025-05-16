'use client';

import { motion } from 'framer-motion';

interface Order {
  id: string;
  table: string;
  items: string;
  status: string;
  time: string;
  total: string;
}

interface ActionButton {
  text: string;
  onClick: () => void;
}

interface OrdersTableProps {
  title: string;
  orders: Order[];
  actionButton?: ActionButton;
}

export default function OrdersTable({ title, orders, actionButton }: OrdersTableProps) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'en preparación':
        return 'bg-yellow-100 text-yellow-800';
      case 'entregado':
        return 'bg-blue-100 text-blue-800';
      case 'confirmado':
        return 'bg-purple-100 text-purple-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-soft p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {actionButton && (
          <button 
            onClick={actionButton.onClick}
            className="bg-primary-50 text-primary-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-100 transition-colors duration-150"
          >
            {actionButton.text}
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mesa
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Artículos
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hora
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary-600">
                  {order.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {order.table}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {order.items}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {order.time}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.total}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-800 mr-3">
                    Ver
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 
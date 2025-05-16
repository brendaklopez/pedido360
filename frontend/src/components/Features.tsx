'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Seguimiento en Tiempo Real",
      description: "Visualiza el estado de cada pedido al instante. Los clientes, meseros y cocineros pueden ver en qué etapa se encuentra cada orden, reduciendo la incertidumbre y las consultas repetitivas.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: "Alertas y Notificaciones",
      description: "Alertas automáticas que notifican a los meseros cuando los platos están listos para servir y avisan a la cocina sobre nuevos pedidos, eliminando retrasos y confusiones.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Gestión de Menú Digital",
      description: "Actualiza fácilmente el menú desde un panel centralizado. Marca platos como no disponibles instantáneamente, evitando pedidos de ítems agotados y la consecuente frustración del cliente.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Comunicación Integrada",
      description: "Canal de comunicación directo entre cocina y meseros, permitiendo aclarar especificaciones de los pedidos sin abandonar las estaciones de trabajo, mejorando la precisión y reduciendo errores.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Análisis y Reportes",
      description: "Obtén insights valiosos sobre tiempos de preparación, platos más populares y horas pico. Optimiza la operación de tu restaurante basado en datos reales y patrones de consumo.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Pagos Simplificados",
      description: "Integración con sistemas de pago que permiten a los clientes dividir la cuenta, pagar desde la mesa o solicitar la factura sin esperas, mejorando la rotación de mesas y la satisfacción.",
    },
  ];

  return (
    <section id="caracteristicas" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-primary-600 font-semibold">CARACTERÍSTICAS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Solución completa para tu restaurante</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestro sistema está diseñado específicamente para resolver los problemas comunes en la gestión de pedidos de restaurantes, conectando todos los departamentos y mejorando la experiencia del cliente.
          </p>
        </motion.div>
        
        <div 
          ref={featuresRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, root: featuresRef }}
              whileHover={{ y: -5 }}
            >
              <div className="rounded-full bg-primary-100 p-3 w-fit mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors duration-200">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 md:p-12 text-white text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para transformar la experiencia en tu restaurante?</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Únete a cientos de restaurantes que ya han eliminado la confusión, reducido los errores y mejorado la satisfacción de sus clientes con Pedido360.
          </p>
          <button className="bg-white text-primary-600 hover:bg-gray-100 transition-colors duration-200 px-6 py-3 rounded-md font-medium">
            Solicitar Demo Gratuita
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 
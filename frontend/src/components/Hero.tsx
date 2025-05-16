'use client';

import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="inicio" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
            >
              Revoluciona la gestión de <span className="text-primary-600">pedidos</span> en tu restaurante
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8"
            >
              Elimina errores, retrasos y confusiones con nuestro sistema centralizado que conecta a meseros, cocina y clientes en tiempo real, mejorando la eficiencia y la satisfacción del cliente.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#contacto" className="btn-primary">
                Solicitar Demo
              </a>
              <a href="#caracteristicas" className="btn-outline">
                Conocer Solución
              </a>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200"></div>
                ))}
              </div>
              <p className="ml-4 text-gray-600">Más de <span className="font-bold text-primary-600">500+</span> restaurantes confían en nosotros</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden bg-gradient-to-r from-primary-50 to-secondary-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-xl"></div>
              <div className="relative z-10 w-4/5 h-4/5 bg-white rounded-lg shadow-2xl p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="h-12 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-700 font-medium">
                  Panel de Control - Pedidos en Tiempo Real
                </div>
                
                <div className="flex-1 grid grid-cols-1 gap-4 mb-4 overflow-y-auto">
                  <div className="bg-green-100 rounded-md p-3 border-l-4 border-green-500 flex justify-between items-center">
                    <div>
                      <p className="font-bold">Mesa 4 - Orden #103</p>
                      <p className="text-sm text-gray-600">2 Platos Principales, 1 Entrada</p>
                    </div>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Entregado</span>
                  </div>
                  
                  <div className="bg-yellow-100 rounded-md p-3 border-l-4 border-yellow-500 flex justify-between items-center">
                    <div>
                      <p className="font-bold">Mesa 7 - Orden #104</p>
                      <p className="text-sm text-gray-600">4 Platos Principales, 2 Postres</p>
                    </div>
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">En preparación</span>
                  </div>
                  
                  <div className="bg-blue-100 rounded-md p-3 border-l-4 border-blue-500 flex justify-between items-center">
                    <div>
                      <p className="font-bold">Mesa 2 - Orden #105</p>
                      <p className="text-sm text-gray-600">3 Platos Principales, 3 Bebidas</p>
                    </div>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Confirmado</span>
                  </div>
                </div>
                
                <div className="h-8 bg-primary-500 text-white rounded-md flex items-center justify-center text-sm font-medium">
                  Ver todos los pedidos
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: "Reducción de Errores", value: "85%" },
            { label: "Tiempo de Servicio", value: "-30%" },
            { label: "Satisfacción Cliente", value: "+40%" },
            { label: "Soporte 24/7", value: "100%" },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-xl bg-white shadow-soft hover:shadow-hover transition-shadow duration-200">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 
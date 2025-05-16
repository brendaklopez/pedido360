'use client';

import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl relative">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 z-0"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute top-20 right-10 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Eleva la experiencia en tu restaurante hoy mismo</h2>
              <p className="text-white/80 mb-6">
                Deja atrás los errores, las confusiones y la frustración de los clientes. Optimiza tu servicio, mejora la comunicación entre personal y ofrece información en tiempo real sobre los pedidos.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Implementación rápida sin interrumpir operaciones',
                  'Capacitación completa para todo tu personal',
                  'Integración con sistemas existentes',
                  'Soporte técnico 24/7 dedicado a restaurantes'
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <svg className="h-5 w-5 mr-2 text-secondary-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">Solicita una Demostración Gratuita</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="input" 
                      placeholder="Tu nombre" 
                    />
                  </div>
                  <div>
                    <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Restaurante</label>
                    <input 
                      type="text" 
                      id="restaurant" 
                      className="input" 
                      placeholder="Nombre de tu restaurante" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="input" 
                      placeholder="tu@restaurante.com" 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="input" 
                      placeholder="+34 000 000 000" 
                    />
                  </div>
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Tamaño del Restaurante</label>
                    <select id="size" className="input">
                      <option value="" disabled selected>Selecciona una opción</option>
                      <option value="small">Pequeño (hasta 50 comensales)</option>
                      <option value="medium">Mediano (50-100 comensales)</option>
                      <option value="large">Grande (más de 100 comensales)</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full btn-primary py-3"
                  >
                    Solicitar Demostración
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-4">
                    Te contactaremos en 24 horas para coordinar tu demostración personalizada.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 
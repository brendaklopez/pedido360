'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      content: "Desde que implementamos Pedido360, los errores en nuestros pedidos se han reducido en más del 80%. La comunicación entre el personal de servicio y la cocina es mucho más fluida, y nuestros clientes están encantados con poder ver en tiempo real el estado de su pedido.",
      author: "Mariana Torres",
      position: "Gerente General",
      company: "Restaurante El Jardín",
      avatar: "/placeholder-avatar.png"
    },
    {
      content: "Antes teníamos constantes confusiones y retrasos, especialmente en las horas pico. Con Pedido360, hemos logrado servir un 30% más de mesas en el mismo tiempo, sin sacrificar la calidad del servicio. La satisfacción de nuestros clientes ha aumentado notablemente.",
      author: "Carlos Mendoza",
      position: "Chef Ejecutivo",
      company: "Bistró Gourmet",
      avatar: "/placeholder-avatar.png"
    },
    {
      content: "Lo que más me gusta es que los clientes ya no tienen que preguntar constantemente por sus pedidos. El sistema les mantiene informados y esto nos ha permitido enfocarnos en ofrecer un mejor servicio. Además, las analíticas nos ayudan a optimizar nuestro menú y operaciones diarias.",
      author: "Patricia Herrera",
      position: "Propietaria",
      company: "Café del Puerto",
      avatar: "/placeholder-avatar.png"
    }
  ];
  
  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="beneficios" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-primary-600 font-semibold">TESTIMONIOS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Lo que dicen nuestros restaurantes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo Pedido360 ha transformado la operación diaria de restaurantes como el tuyo, eliminando errores y mejorando la experiencia del cliente.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-primary-50 rounded-3xl transform rotate-1 scale-105 z-0"></div>
          <div className="absolute inset-0 bg-secondary-50 rounded-3xl transform -rotate-1 scale-105 z-0"></div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-soft p-8 md:p-10 relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex justify-center">
              <svg className="text-primary-500 w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
            
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl font-medium text-gray-800 mb-8">
                "{testimonials[activeTestimonial].content}"
              </p>
              
              <div className="flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  {/* Avatar placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-primary-600 font-bold">
                    {testimonials[activeTestimonial].author.charAt(0)}
                  </div>
                </div>
                <div className="ml-4 text-left">
                  <h4 className="font-bold text-gray-900">{testimonials[activeTestimonial].author}</h4>
                  <p className="text-gray-600">{testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}</p>
                </div>
              </div>
            </motion.div>
            
            <div className="mt-10 flex justify-center gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-200 ${
                    index === activeTestimonial ? 'bg-primary-600 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-5">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-primary-50 transition-colors duration-200"
                aria-label="Testimonio anterior"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-5">
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 hover:bg-primary-50 transition-colors duration-200"
                aria-label="Testimonio siguiente"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {['La Trattoria', 'Fusion Asian Grill', 'Café Parisien', 'Mar y Tierra'].map((company, index) => (
            <motion.div
              key={index}
              className="h-24 bg-gray-100 rounded-md flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-xl font-bold text-gray-500">{company}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 
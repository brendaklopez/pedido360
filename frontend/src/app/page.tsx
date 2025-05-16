'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Navegación */}
      <nav className="bg-white shadow-sm py-4 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="h-10 w-10 relative">
                <div className="absolute inset-0 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  P
                </div>
              </div>
              <span className="text-xl font-heading font-bold text-gray-900">Pedido360</span>
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['Inicio', 'Características', 'Beneficios', 'Contacto'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-primary-600 font-medium transition duration-150 ease-in-out"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <button className="btn-primary">Solicitar Demo</button>
            </motion.div>
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-primary-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Menú móvil */}
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                {['Inicio', 'Características', 'Beneficios', 'Contacto'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-primary-600 font-medium transition duration-150 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="btn-primary w-full">Solicitar Demo</button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
      
      {/* Espacio para el navbar fijo */}
      <div className="h-16"></div>
      
      {/* Secciones principales */}
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-10 w-10 relative">
                  <div className="absolute inset-0 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    P
                  </div>
                </div>
                <span className="text-xl font-heading font-bold text-white">Pedido360</span>
              </div>
              <p className="text-sm">Simplificando la gestión de pedidos para restaurantes. Mejorando la experiencia tanto para el personal como para los clientes.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                {['Inicio', 'Características', 'Beneficios', 'Contacto'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Términos de Servicio', 'Política de Privacidad', 'Cookies'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-8.486 8.486l4.243 4.243 4.243-4.243a6 6 0 000-8.486zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                  </svg>
                  <span>123 Calle Ejemplo, Ciudad</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>contacto@pedido360.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} Pedido360. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-150 ease-in-out"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
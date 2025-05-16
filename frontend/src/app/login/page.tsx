'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Usuarios de demostración para cada rol
  const demoUsers = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    mesero: { username: 'mesero', password: 'mesero123', role: 'mesero' },
    cocina: { username: 'cocina', password: 'cocina123', role: 'cocina' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular verificación con los usuarios de demostración
    setTimeout(() => {
      let userFound = false;
      
      for (const [role, user] of Object.entries(demoUsers)) {
        if (user.username === username && user.password === password) {
          userFound = true;
          // Guardar información de sesión en localStorage (en producción usar métodos más seguros)
          localStorage.setItem('user', JSON.stringify({
            username,
            role: user.role
          }));
          
          // Redirigir al dashboard según el rol
          router.push(`/dashboard/${user.role}`);
          break;
        }
      }
      
      if (!userFound) {
        setError('Usuario o contraseña incorrectos');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 relative mb-4">
            <div className="absolute inset-0 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              P
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Acceso a Pedido360
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de gestión de pedidos para restaurantes
          </p>
          
          <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-md p-3">
            <p className="text-sm text-yellow-700">
              <strong className="font-medium">Usuarios de demostración:</strong>
            </p>
            <ul className="mt-2 text-xs text-yellow-700 space-y-1">
              <li>Admin: usuario <span className="font-mono">admin</span> / contraseña <span className="font-mono">admin123</span></li>
              <li>Mesero: usuario <span className="font-mono">mesero</span> / contraseña <span className="font-mono">mesero123</span></li>
              <li>Cocina: usuario <span className="font-mono">cocina</span> / contraseña <span className="font-mono">cocina123</span></li>
            </ul>
          </div>
        </motion.div>
        
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-soft"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-500">
              Volver a la página principal
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
} 
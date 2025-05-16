'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  status: 'up' | 'down' | 'neutral';
  delay?: number;
}

export default function StatsCard({ title, value, change, status, delay = 0 }: StatsCardProps) {
  const getStatusColors = () => {
    switch (status) {
      case 'up':
        return {
          text: 'text-green-700',
          bg: 'bg-green-100',
          icon: (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          )
        };
      case 'down':
        return {
          text: 'text-red-700',
          bg: 'bg-red-100',
          icon: (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          )
        };
      default:
        return {
          text: 'text-gray-700',
          bg: 'bg-gray-100',
          icon: null
        };
    }
  };

  const { text, bg, icon } = getStatusColors();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-soft p-6 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`px-2 py-1 rounded-full ${bg} ${text} text-xs flex items-center space-x-1`}>
          {icon}
          <span>{change}</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </motion.div>
  );
} 
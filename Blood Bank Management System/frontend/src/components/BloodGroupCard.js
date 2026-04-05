import React from 'react';
import { motion } from 'framer-motion';

const BloodGroupCard = ({ group, units, color, onCardClick, isLowStock }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const pulseVariants = {
    pulse: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
      onClick={onCardClick}
    >
      <div
        className={`rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-2xl ${
          isLowStock ? 'ring-2 ring-yellow-400' : ''
        }`}
        style={{
          background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`,
          borderLeft: `5px solid ${color}`
        }}
      >
        <motion.div
          className="p-6"
          animate={isLowStock ? 'pulse' : 'initial'}
          variants={pulseVariants}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{group}</h3>
              <p className="text-sm text-gray-500">Blood Type</p>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: color }}
            >
              {group.charAt(0)}
            </div>
          </div>

          {/* Units */}
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-2">Available Units</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold" style={{ color }}>
                {units}
              </span>
              <span className="text-gray-500">units</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            {isLowStock ? (
              <>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-yellow-600">Low Stock ⚠️</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-green-600">Adequate</span>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((units / 50) * 100, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BloodGroupCard;

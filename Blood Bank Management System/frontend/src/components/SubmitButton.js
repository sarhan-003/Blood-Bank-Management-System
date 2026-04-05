import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const SubmitButton = ({ label, loading = false, onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full bg-gradient-to-r from-blood-600 to-blood-500 text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${className}`}
    >
      {loading ? (
        <>
          <FiLoader className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </motion.button>
  );
};

export default SubmitButton;

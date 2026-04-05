import React from 'react';
import { motion } from 'framer-motion';

const FormInput = ({ label, type = 'text', value, onChange, placeholder, required = false }) => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-blood-600 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blood-600 transition-colors"
      />
    </motion.div>
  );
};

export default FormInput;

import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin">
        <FiLoader className="text-blood-600 text-4xl" />
      </div>
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

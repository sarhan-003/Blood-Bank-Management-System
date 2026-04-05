import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import BloodGroupCard from '../components/BloodGroupCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [bloodStocks, setBloodStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    fetchBloodStocks();
  }, []);

  const fetchBloodStocks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/stock');
      if (response.data.success) {
        setBloodStocks(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch blood stocks: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (group) => {
    setSelectedGroup(group);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return <LoadingSpinner message="Fetching blood stocks..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🩸 Blood Bank Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time inventory of available blood units
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blood-600">
            <p className="text-gray-600 text-sm">Total Units</p>
            <p className="text-3xl font-bold text-blood-600 mt-2">
              {bloodStocks.reduce((sum, group) => sum + group.units, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm">Blood Groups</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{bloodStocks.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
            <p className="text-gray-600 text-sm">Low Stock Items</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {bloodStocks.filter(g => g.units < 5).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm">Adequate Stock</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {bloodStocks.filter(g => g.units >= 5).length}
            </p>
          </div>
        </motion.div>

        {/* Blood Groups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {bloodStocks.map((group) => (
            <BloodGroupCard
              key={group.id}
              group={group.group}
              units={group.units}
              color={group.color}
              isLowStock={group.units < 5}
              onCardClick={() => handleCardClick(group)}
            />
          ))}
        </motion.div>

        {/* Selected Group Detail */}
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedGroup.group} Details</h2>
                <p className="text-gray-600 mt-2">Blood Type: {selectedGroup.group}</p>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blood-100 to-pink-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Current Stock</p>
                <p className="text-3xl font-bold text-blood-600 mt-2">{selectedGroup.units}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Total Donated</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{selectedGroup.donated}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-yellow-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Total Requested</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{selectedGroup.requested}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Refresh Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={fetchBloodStocks}
            className="bg-blood-600 hover:bg-blood-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
          >
            ↻ Refresh Data
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

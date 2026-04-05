import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';
import FormSelect from '../components/FormSelect';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';

const DonatePage = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    quantity: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bloodGroups, setBloodGroups] = useState([]);

  useEffect(() => {
    fetchBloodGroups();
  }, []);

  const fetchBloodGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/stock');
      if (response.data.success) {
        const groups = response.data.data.map(group => ({
          value: group.group,
          label: group.group
        }));
        setBloodGroups(groups);
      }
    } catch (error) {
      toast.error('Failed to fetch blood groups');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.bloodGroup) {
      toast.error('Please select a blood group');
      return;
    }
    if (!formData.quantity || formData.quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    if (formData.quantity > 5) {
      toast.error('Maximum donation is 5 units at a time');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/donate', {
        bloodGroup: formData.bloodGroup,
        quantity: parseInt(formData.quantity)
      });

      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message);
        setFormData({ bloodGroup: '', quantity: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blood-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            ❤️ Donate Blood
          </h1>
          <p className="text-gray-600 text-lg">
            Your donation can save lives. Choose your blood group and donate now.
          </p>
        </motion.div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center space-x-3 bg-green-100 border-l-4 border-green-600 p-4 rounded-lg"
            >
              <FiCheck className="text-green-600 text-2xl" />
              <div>
                <p className="text-green-800 font-semibold">Thank you for your donation!</p>
                <p className="text-green-700 text-sm">Your donation has been recorded successfully.</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blood Group Select */}
            <FormSelect
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              options={bloodGroups}
              required
            />

            {/* Quantity Input */}
            <FormInput
              label="Quantity (Units)"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity (1-5 units)"
              required
            />

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg flex items-start space-x-3">
              <FiAlertCircle className="text-blue-600 text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-semibold">Important Information</p>
                <p className="text-blue-700 text-sm mt-1">
                  💧 Maximum donation: 5 units per session
                  <br />
                  ⏱️ Typical donation time: 8-15 minutes
                  <br />
                  🍎 Eat and drink plenty of fluids before donating
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <SubmitButton
              label="🩸 Donate Now"
              loading={loading}
              onClick={handleSubmit}
            />
          </form>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">Why Donate?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '❤️', title: 'Save Lives', desc: 'One donation can help up to 3 people' },
                { icon: '🏥', title: 'Healthcare', desc: 'Free health check-up & screening' },
                { icon: '👥', title: 'Community', desc: 'Be part of a larger cause' },
                { icon: '🎖️', title: 'Recognition', desc: 'Recognized as a blood donor' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;

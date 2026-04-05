import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCheck, FiAlertCircle, FiXCircle } from 'react-icons/fi';
import FormSelect from '../components/FormSelect';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';

const RequestPage = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    quantity: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
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
          label: `${group.group} (${group.units} units available)`
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
    setError(false);

    // Validation
    if (!formData.bloodGroup) {
      toast.error('Please select a blood group');
      return;
    }
    if (!formData.quantity || formData.quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/request', {
        bloodGroup: formData.bloodGroup,
        quantity: parseInt(formData.quantity)
      });

      if (response.data.success) {
        setSuccess(true);
        setError(false);
        toast.success(response.data.message);
        setFormData({ bloodGroup: '', quantity: '' });
        fetchBloodGroups();

        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setError(true);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🏥 Request Blood
          </h1>
          <p className="text-gray-600 text-lg">
            Need blood? Request the blood group you require and we'll process it immediately.
          </p>
        </motion.div>

        {/* Request Form */}
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
              className="mb-8 flex items-start space-x-3 bg-green-100 border-l-4 border-green-600 p-4 rounded-lg"
            >
              <FiCheck className="text-green-600 text-2xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-semibold">Blood Request Approved!</p>
                <p className="text-green-700 text-sm">
                  Your blood request has been processed. Please collect from the blood bank counter.
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-start space-x-3 bg-red-100 border-l-4 border-red-600 p-4 rounded-lg"
            >
              <FiXCircle className="text-red-600 text-2xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Request Failed</p>
                <p className="text-red-700 text-sm">
                  Please check the selected blood group and quantity.
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blood Group Select */}
            <FormSelect
              label="Blood Group Needed"
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
              placeholder="Enter quantity needed"
              required
            />

            {/* Critical Info Box */}
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg flex items-start space-x-3">
              <FiAlertCircle className="text-yellow-600 text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-semibold">Important Notice</p>
                <p className="text-yellow-700 text-sm mt-1">
                  ⚠️ Blood requests are subject to availability
                  <br />
                  📋 Valid medical prescription/documents required
                  <br />
                  🕐 Processing time: 15-30 minutes
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <SubmitButton
              label="🏥 Request Blood"
              loading={loading}
              onClick={handleSubmit}
            />
          </form>

          {/* Process Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-6">How the Process Works</h3>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Submit Request', desc: 'Select blood group and quantity' },
                { step: '2', title: 'Verification', desc: 'Our staff verifies your request & documents' },
                { step: '3', title: 'Processing', desc: 'Blood is prepared and tested' },
                { step: '4', title: 'Collection', desc: 'Collect blood from our counter' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (idx + 1) }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blood-600 text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">Need Help?</h3>
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <p className="text-gray-700">
                📞 Call: <span className="font-semibold">+1 (555) 123-4567</span>
                <br />
                📧 Email: <span className="font-semibold">support@bloodbank.com</span>
                <br />
                🕐 Available: Monday - Sunday, 9 AM - 8 PM
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestPage;

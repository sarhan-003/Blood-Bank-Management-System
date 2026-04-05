const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to data file
const dataFilePath = path.join(__dirname, 'data', 'blood_stock.json');

// Read data from JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return { blood_groups: [] };
  }
};

// Write data to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
  }
};

// GET - Get all blood stock
app.get('/stock', (req, res) => {
  try {
    const data = readData();
    res.status(200).json({
      success: true,
      message: 'Blood stock retrieved successfully',
      data: data.blood_groups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving blood stock',
      error: error.message
    });
  }
});

// POST - Donate blood
app.post('/donate', (req, res) => {
  try {
    const { bloodGroup, quantity } = req.body;

    // Validation
    if (!bloodGroup || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Blood group and quantity are required'
      });
    }

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number'
      });
    }

    if (quantity > 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum donation is 5 units at a time'
      });
    }

    const data = readData();
    const bloodGroupData = data.blood_groups.find(bg => bg.group === bloodGroup);

    if (!bloodGroupData) {
      return res.status(404).json({
        success: false,
        message: 'Blood group not found'
      });
    }

    // Update stock
    bloodGroupData.units += parseInt(quantity);
    bloodGroupData.donated += parseInt(quantity);

    writeData(data);

    res.status(200).json({
      success: true,
      message: `Successfully donated ${quantity} units of ${bloodGroup}`,
      new_units: bloodGroupData.units
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing donation',
      error: error.message
    });
  }
});

// POST - Request blood
app.post('/request', (req, res) => {
  try {
    const { bloodGroup, quantity } = req.body;

    // Validation
    if (!bloodGroup || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Blood group and quantity are required'
      });
    }

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number'
      });
    }

    const data = readData();
    const bloodGroupData = data.blood_groups.find(bg => bg.group === bloodGroup);

    if (!bloodGroupData) {
      return res.status(404).json({
        success: false,
        message: 'Blood group not found'
      });
    }

    // Check stock availability
    if (bloodGroupData.units < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${bloodGroupData.units} units, Requested: ${quantity} units`,
        available: bloodGroupData.units
      });
    }

    // Update stock
    bloodGroupData.units -= parseInt(quantity);
    bloodGroupData.requested += parseInt(quantity);

    writeData(data);

    res.status(200).json({
      success: true,
      message: `Successfully requested ${quantity} units of ${bloodGroup}`,
      new_units: bloodGroupData.units
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing request',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🩸 Blood Bank Backend running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/stock`);
  console.log(`   POST http://localhost:${PORT}/donate`);
  console.log(`   POST http://localhost:${PORT}/request`);
});

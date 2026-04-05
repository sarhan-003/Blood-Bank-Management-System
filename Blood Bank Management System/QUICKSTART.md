# Quick Start Guide

## System Requirements
- **Node.js** v14+ (includes npm)
- **Recommended**: npm v6+

## Installation Steps

### Option 1: Automatic Setup (Recommended)

#### Windows:
```bash
# Double-click setup.bat
# OR run in Command Prompt:
setup.bat
```

#### Mac/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

#### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Running the Application

### Terminal 1 - Start Backend:
```bash
cd backend
npm start
```

Expected output:
```
🩸 Blood Bank Backend running on http://localhost:5000
📊 Available endpoints:
   GET  http://localhost:5000/stock
   POST http://localhost:5000/donate
   POST http://localhost:5000/request
```

### Terminal 2 - Start Frontend:
```bash
cd frontend
npm start
```

This will automatically open your browser at `http://localhost:3000`

## ✅ Verification

The application is working correctly when:
1. ✓ Backend is running on http://localhost:5000
2. ✓ Frontend opens at http://localhost:3000
3. ✓ Dashboard displays blood groups with units
4. ✓ You can navigate between pages
5. ✓ Toast notifications appear when performing actions

## Troubleshooting

### Port Already in Use
If you see "port 5000 already in use":
```bash
# Edit backend/server.js and change PORT = 5000 to another number
# Then update API URLs in frontend components
```

### Dependencies Install Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Frontend Can't Connect to Backend
1. Ensure backend is running on port 5000
2. Check that CORS is enabled (it is by default)
3. Verify API URL: http://localhost:5000

## Development

### Useful NPM Scripts

**Backend:**
```bash
npm start          # Start server
npm run dev        # Start with nodemon (auto-restart)
```

**Frontend:**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Project Structure

```
Blood Bank Management System/
├── backend/                    # Node.js + Express API
│   ├── data/
│   │   └── blood_stock.json   # Data storage
│   ├── server.js              # Main server file
│   └── package.json
├── frontend/                   # React + Tailwind
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   └── App.js
│   └── package.json
└── README.md
```

## Features to Try

1. **Dashboard**: View all blood groups and their stock levels
2. **Donate**: Add blood units to the inventory
3. **Request**: Request blood units (checks availability)
4. **Real-time Updates**: Refresh dashboard to see changes
5. **Responsive Design**: Resize browser to see mobile view

## Next Steps

- Customize the blood group initial values in `backend/data/blood_stock.json`
- Modify colors and styling in `frontend/tailwind.config.js`
- Add more features from the README suggestions
- Deploy to production

---

**Questions?** See the full README.md for more details!

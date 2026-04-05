# 🩸 COMPLETE STARTUP & INSTALLATION GUIDE

## Prerequisites Check

Before starting, ensure you have:
- ✅ **Node.js** v14 or higher → [Download](https://nodejs.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **Git** (optional, but recommended)

### Verify Installation:
```bash
node --version
npm --version
```

---

## 📋 Project File Structure

```
Blood Bank Management System/
│
├── backend/                          # Express.js API Server
│   ├── data/
│   │   └── blood_stock.json         # JSON data storage
│   ├── server.js                     # Main server file
│   ├── package.json                  # Backend dependencies
│   └── .gitignore
│
├── frontend/                         # React Application
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.js            # Navigation bar
│   │   │   ├── BloodGroupCard.js    # Card component
│   │   │   ├── LoadingSpinner.js    # Loading state
│   │   │   ├── FormInput.js         # Form input
│   │   │   ├── FormSelect.js        # Dropdown input
│   │   │   └── SubmitButton.js      # Button component
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.js         # Home page
│   │   │   ├── DonatePage.js        # Donation form
│   │   │   └── RequestPage.js       # Request form
│   │   ├── App.js                   # Main app component
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS config
│   └── .gitignore
│
├── README.md                         # Full documentation
├── QUICKSTART.md                     # Quick reference
├── API_DOCS.md                       # API documentation
├── setup.sh                          # Mac/Linux setup script
└── setup.bat                         # Windows setup script
```

---

## 🚀 INSTALLATION METHODS

### METHOD 1: Automatic Setup (EASIEST) ⭐

#### On Windows:
1. Navigate to the project folder
2. Double-click `setup.bat`
3. Wait for installation to complete
4. Follow the instructions on screen

#### On Mac/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

---

### METHOD 2: Manual Setup (Recommended for Developers)

#### Step 1: Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Install npm packages
npm install

# Verify installation
npm list

# You should see:
# └── body-parser@1.20.2
# └── cors@2.8.5
# └── express@4.18.2
```

#### Step 2: Install Frontend Dependencies

```bash
# Navigate to frontend folder
cd ../frontend

# Install npm packages
npm install

# Verify installation
npm list

# You should see many packages including:
# ├── react@18.2.0
# ├── react-dom@18.2.0
# ├── react-router-dom@6.14.0
# ├── axios@1.6.0
# ├── tailwindcss@3.3.0
# ├── framer-motion@10.16.4
# ├── react-icons@4.11.0
# └── react-toastify@9.1.3
```

---

## ▶️ RUNNING THE APPLICATION

### Step 1: Start Backend Server

Open **Terminal 1** (Command Prompt / PowerShell / Terminal):

```bash
# Navigate to backend
cd backend

# Start the server
npm start

# Expected output:
# 🩸 Blood Bank Backend running on http://localhost:5000
# 📊 Available endpoints:
#    GET  http://localhost:5000/stock
#    POST http://localhost:5000/donate
#    POST http://localhost:5000/request
```

✅ **Backend is now running!**

Keep this terminal open.

---

### Step 2: Start Frontend Application

Open **Terminal 2** (new terminal/tab):

```bash
# Navigate to frontend
cd frontend

# Start development server
npm start

# Expected output:
# Compiled successfully!
# You can now view blood-bank-frontend in the browser.
#  Local:            http://localhost:3000
#  On Your Network:  http://192.168.x.x:3000
#
# Note that the development build is not optimized.
```

✅ **Frontend should automatically open in your browser at http://localhost:3000**

If it doesn't open automatically, manually navigate to: `http://localhost:3000`

---

## ✅ VERIFICATION CHECKLIST

Confirm everything is working:

- [ ] Backend terminal shows "🩸 Blood Bank Backend running on http://localhost:5000"
- [ ] Frontend opens in browser without errors
- [ ] Dashboard page displays 8 blood groups with colored cards
- [ ] Each card shows unit quantities
- [ ] Navigation bar works (click Dashboard, Donate, Request)
- [ ] O- blood group is highlighted in red (low stock < 5 units)
- [ ] Can click on blood group cards to see details
- [ ] Donate page form works
- [ ] Request page form works
- [ ] Toast notifications appear (try invalid form submission)

---

## 🧪 TESTING THE FEATURES

### Test 1: View Dashboard
1. Go to home page (Dashboard)
2. See all 8 blood groups
3. Check statistics (total units, blood groups, low stock)
4. Click on any card to see details

### Test 2: Donate Blood
1. Click "Donate" in navbar
2. Select blood group "O+" from dropdown
3. Enter quantity "2"
4. Click "🩸 Donate Now"
5. See success message
6. Go back to Dashboard
7. Check O+ units increased from 35 to 37

### Test 3: Request Blood
1. Click "Request" in navbar
2. Select blood group "O+" from dropdown
3. Enter quantity "10"
4. Try to submit - should show error (only 37 available)
5. Change quantity to "5"
6. Click "🏥 Request Blood"
7. See success message
8. Go to Dashboard
9. Check O+ units decreased from 37 to 32

### Test 4: Low Stock Alert
1. Navigate to Dashboard
2. Notice O- is red (less than 5 units)
3. Notice O- card is pulsing
4. Notice yellow "Low Stock ⚠️" badge

---

## 🔧 TROUBLESHOOTING

### Problem: "Port 5000 already in use"

```bash
# Solution 1: Stop the process using port 5000
# Or Solution 2: Use different port

# Edit: backend/server.js
# Change: const PORT = 5000;
# To:     const PORT = 5001;

# Then update frontend URLs to use 5001
```

### Problem: "Frontend can't connect to backend"

**Checklist:**
1. ✓ Backend running on port 5000?
2. ✓ Frontend accessing http://localhost:5000?
3. ✓ CORS enabled in backend?
4. ✓ Both terminals open and showing no errors?

```bash
# Check backend is running:
curl http://localhost:5000/stock
```

### Problem: "npm install fails"

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Try installing again
npm install

# If still fails, check Node version
node --version  # Should be 14+
```

### Problem: "React component not updating"

- Clear browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Restart frontend: Kill terminal (Ctrl+C) and run `npm start` again

### Problem: "Port 3000 already in use (frontend)"

```bash
# Change port in frontend
# Edit: frontend/src/index.js (or use PORT environment variable)

# Or kill process on port 3000:
# Windows:
netstat -ano | findstr :3000

# Mac/Linux:
lsof -i :3000
```

---

## 📊 API ENDPOINTS

Quick reference (full docs in API_DOCS.md):

### GET Blood Stock
```bash
curl http://localhost:5000/stock
```

### POST Donate Blood
```bash
curl -X POST http://localhost:5000/donate \
  -H "Content-Type: application/json" \
  -d '{"bloodGroup": "A+", "quantity": 2}'
```

### POST Request Blood
```bash
curl -X POST http://localhost:5000/request \
  -H "Content-Type: application/json" \
  -d '{"bloodGroup": "O+", "quantity": 3}'
```

---

## 📱 TESTING RESPONSIVE DESIGN

The application is fully responsive:

1. **Desktop**: Open at normal screen width
2. **Tablet**: Press F12 → Toggle device toolbar → Select tablet
3. **Mobile**: Press F12 → Toggle device toolbar → Select mobile

All pages should display correctly at all sizes.

---

## 🛑 STOPPING THE APPLICATION

To stop running:

**Backend Terminal:**
1. Press `Ctrl + C`
2. Wait for process to terminate

**Frontend Terminal:**
1. Press `Ctrl + C`
2. Wait for process to terminate

---

## 🌍 BROWSER COMPATIBILITY

Tested and working on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## 📚 NEXT STEPS

After confirming everything works:

1. **Customize**: Edit colors, fonts, images in `tailwind.config.js`
2. **Add Data**: Modify initial blood groups in `backend/data/blood_stock.json`
3. **Deploy**: Follow deployment guides in README.md
4. **Extend**: Add features from README.md suggestions

---

## 🆘 GETTING HELP

1. Read the **README.md** for full documentation
2. Check **API_DOCS.md** for API details
3. Review code comments in source files
4. Common issues are in TROUBLESHOOTING section above

---

## ⚡ QUICK COMMANDS REFERENCE

```bash
# Backend
cd backend
npm install      # Install dependencies
npm start        # Start server
npm run dev      # Start with auto-reload

# Frontend
cd frontend
npm install      # Install dependencies
npm start        # Start dev server
npm run build    # Build for production
npm test         # Run tests
```

---

## 🎉 YOU'RE ALL SET!

Your Blood Bank Management System is ready to use!

**Happy coding! 🩸**

---

**For more details, see:**
- [README.md](./README.md) - Full documentation
- [API_DOCS.md](./API_DOCS.md) - API documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick reference

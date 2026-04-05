# 🩸 Blood Bank Management System

A modern, full-stack Blood Bank Management System built with React, Node.js, and Express. This application allows users to donate blood, request blood, and view real-time blood inventory with a beautiful, responsive UI.

## ✨ Features

### Frontend (React + Tailwind CSS)
- ✅ Modern, professional dashboard with blood inventory display
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Beautiful animated blood group cards with status indicators
- ✅ Donate blood form with validation
- ✅ Request blood form with real-time stock checking
- ✅ Toast notifications for user feedback
- ✅ Framer Motion animations and transitions
- ✅ Low stock warnings (red highlighting)
- ✅ Real-time data updates
- ✅ React Icons for beautiful iconography

### Backend (Node.js + Express)
- ✅ RESTful API endpoints
- ✅ JSON-based data storage (simple & efficient)
- ✅ Comprehensive error handling
- ✅ CORS support for cross-origin requests
- ✅ Input validation
- ✅ Real-time stock management

### API Endpoints
- `GET /stock` - Get all blood group inventory
- `POST /donate` - Record a blood donation
- `POST /request` - Request blood from inventory

## 🏗️ Project Structure

```
Blood Bank Management System/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── BloodGroupCard.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── FormInput.js
│   │   │   ├── FormSelect.js
│   │   │   └── SubmitButton.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── DonatePage.js
│   │   │   └── RequestPage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
├── backend/
│   ├── data/
│   │   └── blood_stock.json
│   ├── server.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
```

The backend will run on `http://localhost:5000`

You should see:
```
🩸 Blood Bank Backend running on http://localhost:5000
📊 Available endpoints:
   GET  http://localhost:5000/stock
   POST http://localhost:5000/donate
   POST http://localhost:5000/request
```

#### 2. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will automatically open at `http://localhost:3000`

## 🎨 Features Overview

### Dashboard Page
- Display all 8 blood groups (A+, A-, B+, B-, O+, O-, AB+, AB-)
- Show available units for each blood group
- Display statistics (total units, blood groups, low stock items)
- Color-coded status indicators
- Click on any blood group card to see detailed information
- Highlight cards with low stock (less than 5 units) in yellow

### Donate Blood Page
- Select blood group from dropdown
- Enter donation quantity (1-5 units)
- Form validation with error messages
- Success confirmation after donation
- Information about donation benefits
- Toast notification system

### Request Blood Page
- Select required blood group with available units display
- Enter quantity needed
- Real-time validation against available stock
- Clear error messages if stock is insufficient
- Step-by-step process information
- Contact details for support

### Navigation Bar
- Logo and branding
- Navigation links to all pages
- Active page indicators
- Mobile-responsive hamburger menu
- Smooth transitions and hover effects

## 📊 Blood Groups

The system manages 8 common blood groups:
- A+ (25 units)
- A- (12 units)
- B+ (18 units)
- B- (8 units)
- O+ (35 units - Universal donor)
- O- (4 units - Universal donor, critical)
- AB+ (14 units)
- AB- (6 units)

## 🔧 API Usage Examples

### Get Blood Stock
```bash
curl http://localhost:5000/stock
```

**Response:**
```json
{
  "success": true,
  "message": "Blood stock retrieved successfully",
  "data": [
    {
      "id": 1,
      "group": "A+",
      "units": 25,
      "color": "#E53E3E",
      "donated": 0,
      "requested": 0
    },
    ...
  ]
}
```

### Donate Blood
```bash
curl -X POST http://localhost:5000/donate \
  -H "Content-Type: application/json" \
  -d '{"bloodGroup": "A+", "quantity": 2}'
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully donated 2 units of A+",
  "new_units": 27
}
```

### Request Blood
```bash
curl -X POST http://localhost:5000/request \
  -H "Content-Type: application/json" \
  -d '{"bloodGroup": "O+", "quantity": 3}'
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully requested 3 units of O+",
  "new_units": 32
}
```

## 🎨 UI/UX Highlights

### Design Features
- **Color Scheme**: Blood-red gradient theme with modern colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins for professional look
- **Shadows**: Layered shadows for depth and elevation
- **Gradients**: Smooth color gradients for visual appeal
- **Animations**: Framer Motion for smooth transitions
- **Icons**: React Icons for intuitive visual communication
- **Responsiveness**: Mobile-first design that works on all devices

### Interactive Elements
- Hover effects on cards and buttons
- Smooth button transitions with loading states
- Animated progress bars
- Card scaling and elevation on hover
- Toast notifications for user feedback
- Loading spinners during API calls
- Success/error visual indicators

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **CORS** - Cross-origin support
- **Body Parser** - JSON parsing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔒 Error Handling

The system includes comprehensive error handling:
- Input validation for all forms
- Stock availability checking
- Quantity limit validation (max 5 units per donation)
- Error messages displayed via toast notifications
- API response error handling
- Network error management

## 📝 Data Persistence

Blood stock data is stored in `backend/data/blood_stock.json`. The file is automatically updated whenever donations or requests are processed.

## 🚀 Deployment

### For Production:

#### Backend
```bash
# Build for production
# The current setup is ready for production

# Deploy to services like Heroku, AWS, DigitalOcean, etc.
```

#### Frontend
```bash
# Build for production
npm run build

# Deploy to services like Vercel, Netlify, GitHub Pages, etc.
```

## 📚 Additional Features You Can Add

- User authentication and profiles
- Donation history tracking
- Email notifications
- SMS alerts for urgent requests
- Database integration (MongoDB/PostgreSQL)
- Admin dashboard for staff
- Appointment scheduling
- Blood test results upload
- Donor rating system
- Analytics and reports

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Run on a different port by modifying server.js
```

### Frontend won't connect to backend
```bash
# Ensure backend is running on port 5000
# Check CORS configuration in backend
# Verify API URL in frontend components
```

### NPM dependencies issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built with ❤️ for the community

---

**Enjoy managing your blood bank! 🩸**

For questions or support, please reach out to: support@bloodbank.com

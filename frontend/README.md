# FreshTrack - Market Waste Management Frontend

A modern React application for managing market inventory and waste prevention.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd inventory/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The application will automatically open at `http://localhost:3000`

## 📱 Available Pages

- **Dashboard** (`/dashboard`) - Overview of inventory statistics
- **Products** (`/products`) - Manage product inventory
- **Forecast** (`/forecast`) - Stock predictions and waste analysis
- **Alerts** (`/alerts`) - Notifications and alert management

## 🛠️ Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

### Project Structure

```
src/
├── components/          # Reusable components
│   └── navigation/     # Navigation components
├── pages/              # Main page components
├── services/           # API services
├── styles/             # CSS files for pages
├── app.js              # Main App component
├── index.js            # Application entry point
└── App.css             # Main application styles
```

## 🔧 Configuration

The application is configured to proxy API requests to `http://localhost:8000` (backend server).

## 🎨 Features

- **Real-time Data**: All pages fetch data from API endpoints
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with Bootstrap
- **Loading States**: Proper loading indicators for better UX
- **Error Handling**: Comprehensive error handling with retry options

## 📦 Dependencies

- React 18.2.0
- React Router DOM 6.3.0
- React Bootstrap 2.7.0
- Bootstrap 5.2.0
- Font Awesome 6.0.0

## 🚨 Troubleshooting

### Common Issues

1. **Port 3000 is already in use:**
   - The app will automatically try to use port 3001
   - Or kill the process using port 3000

2. **Dependencies not found:**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

3. **API connection errors:**
   - Make sure the backend server is running on port 8000
   - Check the API endpoints in `src/services/api.js`

### Getting Help

If you encounter any issues, check the browser console for error messages. 
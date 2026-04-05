@echo off
REM Blood Bank Management System - Quick Start Script for Windows
REM This script will set up and run both backend and frontend

echo.
echo 🩸 Blood Bank Management System - Setup
echo ========================================

REM Check if Node.js is installed
where /q node
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo   Version: %NODE_VERSION%

REM Setup Backend
echo.
echo Setting up Backend...
cd backend
if exist node_modules (
    echo ✓ Node modules already exist
) else (
    call npm install
)
echo ✓ Backend setup complete

REM Setup Frontend
echo.
echo Setting up Frontend...
cd ..\frontend
if exist node_modules (
    echo ✓ Node modules already exist
) else (
    call npm install
)
echo ✓ Frontend setup complete

echo.
echo ✅ Setup Complete!
echo.
echo To start the application:
echo.
echo 1. Terminal 1 - Start Backend:
echo    cd backend && npm start
echo.
echo 2. Terminal 2 - Start Frontend:
echo    cd frontend && npm start
echo.
echo 3. Open your browser:
echo    http://localhost:3000
echo.
pause

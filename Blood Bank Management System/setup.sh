#!/bin/bash

# Blood Bank Management System - Quick Start Script
# This script will set up and run both backend and frontend

echo "🩸 Blood Bank Management System - Setup"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install it from https://nodejs.org/${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js is installed${NC}"
echo "  Version: $(node --version)"

# Setup Backend
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd backend
if [ -d "node_modules" ]; then
    echo "✓ Node modules already exist"
else
    npm install
fi
echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup Frontend
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd ../frontend
if [ -d "node_modules" ]; then
    echo "✓ Node modules already exist"
else
    npm install
fi
echo -e "${GREEN}✓ Frontend setup complete${NC}"

echo -e "\n${GREEN}✅ Setup Complete!${NC}"
echo -e "\n${YELLOW}To start the application:${NC}"
echo -e "\n1. ${YELLOW}Terminal 1 - Start Backend:${NC}"
echo "   cd backend && npm start"
echo -e "\n2. ${YELLOW}Terminal 2 - Start Frontend:${NC}"
echo "   cd frontend && npm start"
echo -e "\n3. ${YELLOW}Open your browser:${NC}"
echo "   http://localhost:3000"

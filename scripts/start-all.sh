#!/bin/bash
# Rendezvous Full Stack Startup Script (Linux/Mac)
# Starts both frontend and backend servers, and checks database connection

echo "========================================"
echo "  Rendezvous Full Stack Startup"
echo "========================================"
echo ""

# Check if Node.js is installed
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Error: Node.js not found. Please install Node.js first"
    echo "Download: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✓ Node.js version: $NODE_VERSION"

# Check if npm is installed
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "✗ Error: npm not found"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✓ npm version: $NPM_VERSION"
echo ""

# Check environment variables
echo "Checking environment variables..."

# Check frontend .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠ Warning: .env.local not found!"
    echo "Please create .env.local from .env.example"
else
    if ! grep -q "REACT_APP_GOOGLE_MAPS_API_KEY=.*[^=]$" .env.local 2>/dev/null; then
        echo "⚠ Warning: REACT_APP_GOOGLE_MAPS_API_KEY is empty in .env.local"
    else
        echo "✓ Frontend environment variables configured"
    fi
fi

# Check backend .env
if [ ! -f "backend/.env" ]; then
    echo "✗ Error: backend/.env not found!"
    echo "Please create backend/.env from backend/.env.example"
    exit 1
else
    if ! grep -q "JWT_SECRET=.*[^=]$" backend/.env 2>/dev/null; then
        echo "⚠ Warning: JWT_SECRET is empty in backend/.env"
    fi
    if ! grep -q "DATABASE_URL=.*[^=]$" backend/.env 2>/dev/null; then
        echo "✗ Error: DATABASE_URL is empty in backend/.env"
        echo "Please configure DATABASE_URL in backend/.env"
        exit 1
    else
        echo "✓ Backend environment variables configured"
    fi
fi

echo ""

# Check and install frontend dependencies
echo "Checking frontend dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "✗ Failed to install frontend dependencies!"
        exit 1
    fi
    echo "✓ Frontend dependencies installed"
else
    echo "✓ Frontend dependencies found"
fi

# Check and install backend dependencies
echo "Checking backend dependencies..."
if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    if [ $? -ne 0 ]; then
        echo "✗ Failed to install backend dependencies!"
        cd ..
        exit 1
    fi
    cd ..
    echo "✓ Backend dependencies installed"
else
    echo "✓ Backend dependencies found"
fi

echo ""

# Check database connection
echo "Checking database connection..."
cd backend
node -e "require('dotenv').config(); const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); pool.query('SELECT NOW()', (err, res) => { if (err) { console.error('DB_ERROR:', err.message); process.exit(1); } else { console.log('DB_OK'); pool.end(); } });" 2>&1
DB_CHECK=$?
cd ..

if [ $DB_CHECK -eq 0 ]; then
    echo "✓ Database connection successful"
else
    echo "⚠ Warning: Database connection failed"
    echo "Please check your DATABASE_URL in backend/.env"
    echo "Continuing anyway..."
fi

echo ""

# Start servers
echo "========================================"
echo "  Starting Servers"
echo "========================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start backend in background
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend (this will block)
echo "Starting frontend server..."
echo ""

npm start

# Cleanup: Stop backend when frontend stops
kill $BACKEND_PID 2>/dev/null


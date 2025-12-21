# Rendezvous Full Stack Startup Script (PowerShell)
# Starts both frontend and backend servers, and checks database connection

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Rendezvous Full Stack Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: Node.js not found. Please install Node.js first" -ForegroundColor Red
    Write-Host "Download: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check environment variables
Write-Host "Checking environment variables..." -ForegroundColor Yellow

# Check and create frontend .env.local
if (-not (Test-Path ".env.local")) {
    Write-Host "Creating .env.local from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env.local" -Force
        Write-Host "✓ .env.local created - Please fill in REACT_APP_GOOGLE_MAPS_API_KEY" -ForegroundColor Green
    } else {
        Write-Host "⚠ Warning: .env.example not found!" -ForegroundColor Yellow
    }
} else {
    $frontendEnv = Get-Content ".env.local" -Raw -ErrorAction SilentlyContinue
    if ($frontendEnv -and $frontendEnv -match "REACT_APP_GOOGLE_MAPS_API_KEY=\S+") {
        Write-Host "✓ Frontend environment variables configured" -ForegroundColor Green
    } else {
        Write-Host "⚠ Warning: REACT_APP_GOOGLE_MAPS_API_KEY is empty in .env.local" -ForegroundColor Yellow
    }
}

# Check and create backend .env
if (-not (Test-Path "backend/.env")) {
    Write-Host "Creating backend/.env from backend/.env.example..." -ForegroundColor Yellow
    if (Test-Path "backend/.env.example") {
        Copy-Item "backend/.env.example" "backend/.env" -Force
        Write-Host "✓ backend/.env created - Please fill in JWT_SECRET and DATABASE_URL" -ForegroundColor Green
    } else {
        Write-Host "✗ Error: backend/.env.example not found!" -ForegroundColor Red
        exit 1
    }
} else {
    $backendEnv = Get-Content "backend/.env" -Raw -ErrorAction SilentlyContinue
    $hasJWT = $backendEnv -and $backendEnv -match "JWT_SECRET=\S+"
    $hasDB = $backendEnv -and $backendEnv -match "DATABASE_URL=\S+"
    
    if (-not $hasJWT) {
        Write-Host "⚠ Warning: JWT_SECRET is empty in backend/.env" -ForegroundColor Yellow
    }
    if (-not $hasDB) {
        Write-Host "✗ Error: DATABASE_URL is empty in backend/.env" -ForegroundColor Red
        Write-Host "Please configure DATABASE_URL in backend/.env" -ForegroundColor Yellow
        Write-Host "Continuing anyway (you can configure it later)..." -ForegroundColor Yellow
    } else {
        Write-Host "✓ Backend environment variables configured" -ForegroundColor Green
    }
}

Write-Host ""

# Check and install frontend dependencies
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install frontend dependencies!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend dependencies found" -ForegroundColor Green
}

# Check and install backend dependencies
Write-Host "Checking backend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "backend/node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install backend dependencies!" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Backend dependencies found" -ForegroundColor Green
}

Write-Host ""

# Check database connection
Write-Host "Checking database connection..." -ForegroundColor Yellow
Set-Location backend
$dbCheck = node -e "require('dotenv').config(); const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); pool.query('SELECT NOW()', (err, res) => { if (err) { console.error('DB_ERROR:', err.message); process.exit(1); } else { console.log('DB_OK'); pool.end(); } });"
Set-Location ..

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database connection successful" -ForegroundColor Green
} else {
    Write-Host "⚠ Warning: Database connection failed" -ForegroundColor Yellow
    Write-Host "Please check your DATABASE_URL in backend/.env" -ForegroundColor Yellow
    Write-Host "Continuing anyway..." -ForegroundColor Yellow
}

Write-Host ""

# Start servers
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Gray
Write-Host ""

# Start backend in a new window
Write-Host "Starting backend server in new window..." -ForegroundColor Yellow
$backendScript = @"
cd `"$PWD\backend`"
npm run dev
pause
"@
$backendScript | Out-File -FilePath "$env:TEMP\start-backend.ps1" -Encoding UTF8
Start-Process powershell -ArgumentList "-NoExit", "-File", "$env:TEMP\start-backend.ps1" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in current window
Write-Host "Starting frontend server..." -ForegroundColor Yellow
Write-Host ""

# Start frontend (this will block)
npm start


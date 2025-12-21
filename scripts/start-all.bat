@echo off
REM Rendezvous Full Stack Startup Script (Windows Batch)
REM Starts both frontend and backend servers, and checks database connection

REM Change to project root directory (parent of scripts folder)
cd /d "%~dp0.."

echo ========================================
echo   Rendezvous Full Stack Startup
echo ========================================
echo.
echo Project directory: %CD%
echo.

REM Check if Node.js is installed
echo Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install Node.js first
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%

REM Check if npm is installed
echo Checking npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm version: %NPM_VERSION%
echo.

REM Check environment variables
echo Checking environment variables...

REM Check frontend .env.local
if not exist ".env.local" (
    echo [INFO] Creating .env.local from .env.example...
    if exist ".env.example" (
        copy /Y ".env.example" ".env.local" >nul 2>&1
        if exist ".env.local" (
            echo [OK] .env.local created - Please fill in REACT_APP_GOOGLE_MAPS_API_KEY
        ) else (
            echo [WARNING] Failed to create .env.local
            echo Please create .env.local from .env.example manually
        )
    ) else (
        echo [WARNING] .env.example not found!
    )
) else (
    echo [OK] Frontend environment file found
)

REM Check backend .env
if not exist "backend\.env" (
    echo [INFO] Creating backend\.env from backend\.env.example...
    if exist "backend\.env.example" (
        copy /Y "backend\.env.example" "backend\.env"
        if %errorlevel% equ 0 (
            if exist "backend\.env" (
                echo [OK] backend\.env created - Please fill in JWT_SECRET and DATABASE_URL
            ) else (
                echo [ERROR] Failed to create backend\.env
                echo Please create backend\.env from backend\.env.example manually
                pause
                exit /b 1
            )
        ) else (
            echo [ERROR] Copy command failed with error code %errorlevel%
            pause
            exit /b 1
        )
    ) else (
        echo [ERROR] backend\.env.example not found!
        echo Current directory: %CD%
        echo Trying alternative path check...
        cd backend
        if exist ".env.example" (
            echo Found .env.example in backend directory
            copy /Y ".env.example" ".env"
            cd ..
            if exist "backend\.env" (
                echo [OK] backend\.env created successfully
            ) else (
                echo [ERROR] Still failed to create backend\.env
                cd ..
                pause
                exit /b 1
            )
        ) else (
            echo [ERROR] .env.example not found in backend directory either
            cd ..
            pause
            exit /b 1
        )
    )
) else (
    echo [OK] Backend environment file found
)

echo.

REM Check and install frontend dependencies
echo Checking frontend dependencies...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install frontend dependencies!
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies found
)

REM Check and install backend dependencies
echo Checking backend dependencies...
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install backend dependencies!
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Backend dependencies installed
) else (
    echo [OK] Backend dependencies found
)

echo.

REM Start servers
echo ========================================
echo   Starting Servers
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start backend in a new window
echo Starting backend server...
start "Rendezvous Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in current window
echo Starting frontend server...
echo.

call npm start

REM If we get here, user stopped the frontend
echo.
echo Stopping backend server...
taskkill /FI "WindowTitle eq Rendezvous Backend*" /T /F >nul 2>&1

pause


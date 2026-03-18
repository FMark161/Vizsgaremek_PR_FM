@echo off
title Harmonia Zeneiskola - Indito
color 0A

echo ========================================
echo    HARMONIA ZENEISKOLA - INDITO
echo ========================================
echo.

echo [1/4] Docker adatbazis inditasa...
docker-compose up -d
if %errorlevel% neq 0 (
  echo HIBA: Docker inditasa sikertelen!
  pause
  exit /b
)
echo OK - Adatbazis fut
echo.

echo [2/4] Varakozas az adatbazisra (5 mp)...
timeout /t 5 /nobreak >nul
echo OK
echo.

echo [3/4] Backend inditasa...
start "Backend" cmd /k "cd Backend && npm run dev"
echo OK - Backend indul
echo.

echo [4/4] Frontend inditasa...
start "Frontend" cmd /k "cd Frontend && npm run dev"
echo OK - Frontend indul
echo.

echo ========================================
echo            MINDEN ELINDULT!
echo ========================================
echo.
echo - Adatbazis: http://localhost:8081 (phpMyAdmin)
echo - Backend:   http://localhost:5000
echo - Frontend:  http://localhost:5173
echo.
echo A backned es frontend kulon ablakban fut.
echo Zarhato: Ctrl+C minden ablakban, majd:
echo   docker-compose down
echo.
pause
@echo off
title Harmonia Zeneiskola - Leallito
color 0C

echo ========================================
echo    HARMONIA ZENEISKOLA - LEALLITO
echo ========================================
echo.

echo [1/2] Backend es frontend leallitasa...
echo (Zard be a Backend es Frontend ablakokat kezzel)
echo.
pause

echo [2/2] Docker adatbazis leallitasa...
docker-compose down
echo OK - Adatbazis leallt
echo.

echo ========================================
echo            MINDEN LEALLT!
echo ========================================
pause
@echo off
echo ===================================================
echo   CRM Git Push Tool
echo ===================================================
echo.

git rm -r --cached . >nul 2>nul
git add .
git commit -m "Update CRM application"
git branch -M main
git push origin main

if %ERRORLEVEL% equ 0 (
    echo SUCCESS! Pushed to GitHub.
) else (
    echo ERROR: Push failed.
)
pause

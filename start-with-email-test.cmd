@echo off
echo ========================================
echo   LANGLEAGUE EMAIL TEST SETUP
echo ========================================
echo.

REM Check if Docker is running
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not running
    echo Please install Docker Desktop and try again
    pause
    exit /b 1
)

echo [1/3] Starting MailHog container...
docker ps -a | findstr mailhog >nul 2>&1
if %errorlevel% equ 0 (
    echo MailHog container exists, restarting...
    docker rm -f mailhog >nul 2>&1
)

docker run -d -p 3025:1025 -p 8025:8025 --name mailhog mailhog/mailhog
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start MailHog
    pause
    exit /b 1
)

echo [SUCCESS] MailHog is running!
echo.

echo [2/3] Building application (skipping tests)...
call mvn clean install -DskipTests
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    docker stop mailhog >nul 2>&1
    pause
    exit /b 1
)

echo [SUCCESS] Build completed!
echo.

echo [3/3] Starting application...
echo.
echo ========================================
echo   IMPORTANT URLS:
echo ========================================
echo   Application:  http://localhost:8080
echo   MailHog UI:   http://localhost:8025
echo   API Docs:     http://localhost:8080/swagger-ui/
echo ========================================
echo.
echo Press Ctrl+C to stop the application
echo.

call mvn spring-boot:run -Dspring-boot.run.profiles=dev

REM Clean up on exit
echo.
echo Stopping MailHog...
docker stop mailhog >nul 2>&1
echo Done!
pause


-- Reset database script for LangLeague
-- This will drop and recreate the database to fix Liquibase issues

-- Drop the database if it exists
DROP DATABASE IF EXISTS langleague;

-- Create the database
CREATE DATABASE langleague CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE langleague;

-- Display success message
SELECT 'Database langleague has been reset successfully' AS status;


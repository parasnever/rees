

-- creating a database

CREATE DATABASE db_name;

-- showing the list of dbs

SHOW DATABASES;


--using a database

USE db_name 

--creating tables in db

CREATE TABLE table_name (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('NOT_STARTED','IN_PROGRESS', 'COMPLETED') DEFAULT 'NOT_STARTED' ,
    due_date DATE,
    created_at TIMESTAMP DEFAULT NOW()



);

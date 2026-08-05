<?php
/**
 * setup.php — Run this ONCE to create the database tables.
 * After running, DELETE this file from the server immediately.
 * Access: https://afroretrogames.com/api/setup.php
 */

$host = 'localhost';
$db   = 'afroretrogames_db';
$user = 'afroretrogames_db';
$pass = 'Z8kT7WSwcUY2XEZEnAra';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Bookings table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS bookings (
            id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
            package_name  VARCHAR(100),
            games         TEXT NOT NULL,
            first_name    VARCHAR(100) NOT NULL,
            last_name     VARCHAR(100) NOT NULL,
            phone         VARCHAR(50)  NOT NULL,
            email         VARCHAR(150) NOT NULL,
            event_date    DATE         NOT NULL,
            event_time    TIME         NOT NULL,
            address       VARCHAR(255) NOT NULL,
            city          VARCHAR(100) NOT NULL,
            location_type VARCHAR(100) NOT NULL,
            occasion      VARCHAR(100) NOT NULL,
            guests        VARCHAR(20),
            notes         TEXT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Contact messages table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS contact_messages (
            id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            name       VARCHAR(100) NOT NULL,
            email      VARCHAR(150),
            phone      VARCHAR(50),
            message    TEXT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    echo json_encode(['success' => true, 'message' => 'Tables created. DELETE this file now.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

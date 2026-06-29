<?php
// api/db.php
error_reporting(0);
@ini_set('display_errors', 0);
// Database configuration for GoDaddy Shared Hosting

// Update these with your actual GoDaddy database credentials
define('DB_HOST', '127.0.0.1'); // Using 127.0.0.1 instead of localhost avoids DNS resolution delays on GoDaddy
define('DB_USER', 'samor');
define('DB_PASS', 'S@mor21783667');
define('DB_NAME', 'samor_db');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_PERSISTENT         => false,
        ]
    );
} catch (PDOException $e) {
    // If connection fails, return a JSON error to avoid breaking frontend parsing
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed. Please run setup.php or check db.php credentials.',
        'error' => $e->getMessage()
    ]);
    exit;
}
?>

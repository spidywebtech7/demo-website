<?php
// api/setup.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Require db.php first to use the live credentials
require_once 'db.php';


try {
    // 1. Create app_users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS app_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
    )");

    // 2. Create site_data table
    $pdo->exec("CREATE TABLE IF NOT EXISTS site_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section_key VARCHAR(50) UNIQUE NOT NULL,
        section_name VARCHAR(100) NOT NULL,
        description TEXT DEFAULT NULL,
        images LONGTEXT NOT NULL
    )");

    // Ensure description column exists (migration for existing databases)
    $checkColumn = $pdo->query("SHOW COLUMNS FROM site_data LIKE 'description'");
    if (!$checkColumn->fetch()) {
        $pdo->exec("ALTER TABLE site_data ADD COLUMN description TEXT DEFAULT NULL");
    }

    // 3. Create default admin user (spidy / spidy) if not exists
    $stmt = $pdo->prepare("SELECT id FROM app_users WHERE username = 'spidy'");
    $stmt->execute();
    if (!$stmt->fetch()) {
        $hash = password_hash('spidy', PASSWORD_DEFAULT);
        $insertUser = $pdo->prepare("INSERT INTO app_users (username, password_hash) VALUES (?, ?)");
        $insertUser->execute(['spidy', $hash]);
        echo "Default admin user 'spidy' created successfully.<br>";
    }

    // 4. Import data.json into MySQL
    $jsonPath = '../data.json';
    if (file_exists($jsonPath)) {
        $jsonData = file_get_contents($jsonPath);
        $data = json_decode($jsonData, true);

        if ($data) {
            $insertData = $pdo->prepare("INSERT IGNORE INTO site_data (section_key, section_name, description, images) VALUES (?, ?, ?, ?)");
            $updateSectionNameOnly = $pdo->prepare("UPDATE site_data SET section_name = ?, description = ? WHERE section_key = ?");

            foreach ($data as $key => $val) {
                $desc = $val['description'] ?? null;
                // Check if exists
                $check = $pdo->prepare("SELECT id FROM site_data WHERE section_key = ?");
                $check->execute([$key]);
                
                if ($check->fetch()) {
                    // Update section name and description only. DO NOT overwrite images to preserve custom uploads from admin panel!
                    $updateSectionNameOnly->execute([$val['name'], $desc, $key]);
                } else {
                    // Insert
                    $insertData->execute([$key, $val['name'], $desc, json_encode($val['images'])]);
                }
            }
            echo "Successfully imported data.json into MySQL.<br>";
        } else {
            echo "data.json is empty or invalid.<br>";
        }
    } else {
        echo "data.json not found. Skipping JSON import.<br>";
    }

    echo "<h3>Setup Complete!</h3>";
    echo "<p>Please delete setup.php and data.json from your server for security.</p>";

} catch (PDOException $e) {
    echo "<h3>Setup Error:</h3>";
    echo $e->getMessage();
}
?>

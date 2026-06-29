<?php
// update_section_name.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'api/db.php';

try {
    // 1. Ensure description column exists (migration for existing databases)
    $checkColumn = $pdo->query("SHOW COLUMNS FROM site_data LIKE 'description'");
    if (!$checkColumn->fetch()) {
        $pdo->exec("ALTER TABLE site_data ADD COLUMN description TEXT DEFAULT NULL");
        echo "Column 'description' added to site_data table successfully.<br>";
    } else {
        echo "Column 'description' already exists.<br>";
    }

    // 2. Update section names & descriptions based on data.json
    $jsonPath = 'data.json';
    if (file_exists($jsonPath)) {
        $jsonData = file_get_contents($jsonPath);
        $data = json_decode($jsonData, true);

        if ($data) {
            $updateStmt = $pdo->prepare("UPDATE site_data SET section_name = ?, description = ? WHERE section_key = ?");
            foreach ($data as $key => $val) {
                $desc = $val['description'] ?? null;
                $updateStmt->execute([$val['name'], $desc, $key]);
            }
            echo "Successfully updated section names and default descriptions from data.json.<br>";
        } else {
            echo "data.json is empty or invalid.<br>";
        }
    } else {
        // Fallback manually if data.json is not found in the root
        $pdo->exec("UPDATE site_data SET section_name = 'Timeless Elegance' WHERE section_key = 'elegant'");
        echo "Fallback: Timeless Elegance title updated successfully.<br>";
    }
    
    echo "<h3>Setup Complete!</h3>";
    echo "<p>Please delete update_section_name.php from your server for security.</p>";
} catch (PDOException $e) {
    echo "<h3>Error:</h3>";
    echo $e->getMessage();
}
?>

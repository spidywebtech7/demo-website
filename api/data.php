<?php
// api/data.php
error_reporting(0);
@ini_set('display_errors', 0);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');
header('X-LiteSpeed-Cache-Control: no-cache');

require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT section_key, section_name, description, images FROM site_data");
    $results = $stmt->fetchAll();
    
    $data = [];
    foreach ($results as $row) {
        $data[$row['section_key']] = [
            'name' => $row['section_name'],
            'description' => $row['description'] ?? '',
            'images' => json_decode($row['images'], true)
        ];
    }
    
    $jsonOutput = json_encode(['success' => true, 'data' => $data], JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE);
    if ($jsonOutput === false) {
        echo json_encode(['success' => false, 'message' => 'JSON encode error: ' . json_last_error_msg()]);
    } else {
        echo $jsonOutput;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to fetch data']);
}
?>

<?php
// api/update_text.php
error_reporting(0);
@ini_set('display_errors', 0);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');
header('X-LiteSpeed-Cache-Control: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';
require_once 'jwt.php';

$user = SimpleJWT::verify_request();

if (!$user) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$section = $input['section'] ?? '';
$name = $input['name'] ?? '';
$description = $input['description'] ?? '';

if ($section === '' || $name === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing section or name']);
    exit;
}

try {
    // Check if section exists in database
    $check = $pdo->prepare("SELECT id FROM site_data WHERE section_key = ?");
    $check->execute([$section]);
    
    if ($check->fetch()) {
        // Update section name and description
        $updateStmt = $pdo->prepare("UPDATE site_data SET section_name = ?, description = ? WHERE section_key = ?");
        $updateStmt->execute([$name, $description, $section]);

        echo json_encode(['success' => true, 'message' => 'Section text updated successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid section key']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error', 'error' => $e->getMessage()]);
}
?>

<?php
// api/upload.php
error_reporting(0);
@ini_set('display_errors', 0);
@ini_set('memory_limit', '256M');
@set_time_limit(120);
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

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    exit;
}

$section = $_POST['section'] ?? '';
$index = $_POST['index'] ?? '';

if ($section === '' || $index === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing section or index']);
    exit;
}

// Ensure upload directory exists
$uploadDir = '../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$file = $_FILES['image'];
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);

// Unique filename: fieldname-timestamp-ext (to match multer logic)
$filename = 'image-' . time() . '.' . $ext;
$targetPath = $uploadDir . $filename;

$isVideo = in_array(strtolower($ext), ['mp4', 'webm', 'mov', 'avi', 'gif', 'svg']);
$uploadSuccess = false;

if ($isVideo) {
    $uploadSuccess = move_uploaded_file($file['tmp_name'], $targetPath);
} else {
    $source = $file['tmp_name'];
    $info = @getimagesize($source);
    
    if ($info) {
        $width = $info[0];
        $height = $info[1];
        $maxWidth = 2000;
        
        // If image is already smaller than or equal to maxWidth, skip GD processing to save CPU/memory
        if ($width <= $maxWidth) {
            $uploadSuccess = move_uploaded_file($source, $targetPath);
        } else {
            $gdAvailable = function_exists('imagecreatetruecolor') && function_exists('imagecopyresampled');
            $image = null;
            
            if ($gdAvailable) {
                if ($info['mime'] == 'image/jpeg' && function_exists('imagecreatefromjpeg')) {
                    $image = @imagecreatefromjpeg($source);
                } elseif ($info['mime'] == 'image/png' && function_exists('imagecreatefrompng')) {
                    $image = @imagecreatefrompng($source);
                } elseif ($info['mime'] == 'image/webp' && function_exists('imagecreatefromwebp')) {
                    $image = @imagecreatefromwebp($source);
                }
            }
            
            if ($image) {
                $newWidth = $maxWidth;
                $newHeight = floor($height * ($maxWidth / $width));
                $newImage = @imagecreatetruecolor($newWidth, $newHeight);
                
                if ($newImage) {
                    if ($info['mime'] == 'image/png' || $info['mime'] == 'image/webp') {
                        @imagealphablending($newImage, false);
                        @imagesavealpha($newImage, true);
                        $transparent = @imagecolorallocatealpha($newImage, 255, 255, 255, 127);
                        if ($transparent !== false) {
                            @imagefilledrectangle($newImage, 0, 0, $newWidth, $newHeight, $transparent);
                        }
                    }
                    
                    @imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                    
                    if ($info['mime'] == 'image/jpeg' && function_exists('imagejpeg')) {
                        $uploadSuccess = @imagejpeg($newImage, $targetPath, 90);
                    } elseif ($info['mime'] == 'image/png' && function_exists('imagepng')) {
                        $uploadSuccess = @imagepng($newImage, $targetPath, 6);
                    } elseif ($info['mime'] == 'image/webp' && function_exists('imagewebp')) {
                        $uploadSuccess = @imagewebp($newImage, $targetPath, 90);
                    }
                    @imagedestroy($newImage);
                }
                @imagedestroy($image);
            }
            
            if (!$uploadSuccess) {
                $uploadSuccess = move_uploaded_file($source, $targetPath);
            }
        }
    } else {
        $uploadSuccess = move_uploaded_file($source, $targetPath);
    }
}

if ($uploadSuccess) {
    // Relative URL for frontend
    $imageUrl = 'uploads/' . $filename;

    try {
        // Fetch current section data
        $stmt = $pdo->prepare("SELECT images FROM site_data WHERE section_key = ?");
        $stmt->execute([$section]);
        $row = $stmt->fetch();

        if ($row) {
            $imagesArray = json_decode($row['images'], true);
            $idx = (int)$index;

            // Update specific index
            if (isset($imagesArray[$idx]) || $idx === count($imagesArray)) {
                $imagesArray[$idx] = $imageUrl;
                
                // Save back to db
                $updateStmt = $pdo->prepare("UPDATE site_data SET images = ? WHERE section_key = ?");
                $updateStmt->execute([json_encode($imagesArray), $section]);

                echo json_encode(['success' => true, 'imageUrl' => $imageUrl, 'message' => 'Media updated successfully']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid index']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid section']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
}
?>

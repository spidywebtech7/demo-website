<?php
// api/jwt.php
// Lightweight JWT implementation for PHP

class SimpleJWT {
    private static $secret = 'super_secret_jayambe_key'; // Use the same key from Node.js

    private static function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64url_decode($data) {
        $padding = strlen($data) % 4;
        $padding !== 0 && $data .= str_repeat('=', 4 - $padding);
        return base64_decode(strtr($data, '-_', '+/'));
    }

    public static function encode($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        
        // Add expiration (24 hours)
        if (!isset($payload['exp'])) {
            $payload['exp'] = time() + (24 * 60 * 60);
        }
        
        $payload_encoded = json_encode($payload);

        $base64UrlHeader = self::base64url_encode($header);
        $base64UrlPayload = self::base64url_encode($payload_encoded);

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret, true);
        $base64UrlSignature = self::base64url_encode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function decode($jwt) {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return false;
        }

        list($header64, $payload64, $signature64) = $parts;

        $valid_signature = hash_hmac('sha256', $header64 . "." . $payload64, self::$secret, true);
        $valid_signature64 = self::base64url_encode($valid_signature);

        if (hash_equals($valid_signature64, $signature64)) {
            $payload = json_decode(self::base64url_decode($payload64), true);
            
            // Check expiration
            if (isset($payload['exp']) && $payload['exp'] < time()) {
                return false; // Token expired
            }
            return $payload;
        }

        return false;
    }

    public static function verify_request() {
        $auth_header = '';
        
        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            if (isset($headers['Authorization'])) {
                $auth_header = $headers['Authorization'];
            }
        }
        
        if (!$auth_header && function_exists('getallheaders')) {
            $headers = getallheaders();
            if (isset($headers['Authorization'])) {
                $auth_header = $headers['Authorization'];
            }
        }

        if (!$auth_header && isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
        }
        
        if (!$auth_header && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            $auth_header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }

        if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
            $token = $matches[1];
            return self::decode($token);
        }
        return false;
    }
}
?>

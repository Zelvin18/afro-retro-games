<?php
/**
 * contact.php — Receives contact form submissions,
 * saves to MySQL, and sends an email notification.
 */

header('Content-Type: application/json');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://afroretrogames.com', 'https://www.afroretrogames.com'];
if (in_array($origin, $allowed)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$host = 'localhost';
$db   = 'afroretrogames_db';
$user = 'afroretrogames_db';
$pass = 'Z8kT7WSwcUY2XEZEnAra';

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || empty($data['name']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and message are required']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (name, email, phone, message)
        VALUES (:name, :email, :phone, :message)
    ");

    $stmt->execute([
        ':name'    => $data['name'],
        ':email'   => $data['email']   ?? null,
        ':phone'   => $data['phone']   ?? null,
        ':message' => $data['message'],
    ]);

    // Send email notification
    $emailBody  = "New Contact Message — AfroRetro Games\n";
    $emailBody .= "======================================\n\n";
    $emailBody .= "Name:    {$data['name']}\n";
    $emailBody .= "Email:   " . ($data['email'] ?? 'Not provided') . "\n";
    $emailBody .= "Phone:   " . ($data['phone'] ?? 'Not provided') . "\n\n";
    $emailBody .= "Message:\n{$data['message']}\n";

    $replyTo  = !empty($data['email']) ? $data['email'] : 'info@afroretrogames.com';
    $headers  = "From: AfroRetro Games Website <info@afroretrogames.com>\r\n";
    $headers .= "Reply-To: {$replyTo}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    mail(
        'info@afroretrogames.com',
        "New Message from {$data['name']}",
        $emailBody,
        $headers
    );

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}

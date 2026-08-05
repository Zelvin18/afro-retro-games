<?php
/**
 * booking.php — Receives booking submissions from the React frontend,
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

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Basic validation
$required = ['first_name','last_name','phone','email','event_date','event_time','address','city','location_type','occasion'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $games = is_array($data['games'] ?? null)
        ? json_encode($data['games'])
        : ($data['games'] ?? '[]');

    $stmt = $pdo->prepare("
        INSERT INTO bookings
            (package_name, games, first_name, last_name, phone, email,
             event_date, event_time, address, city, location_type, occasion, guests, notes)
        VALUES
            (:package_name, :games, :first_name, :last_name, :phone, :email,
             :event_date, :event_time, :address, :city, :location_type, :occasion, :guests, :notes)
    ");

    $stmt->execute([
        ':package_name'  => $data['package_name'] ?? null,
        ':games'         => $games,
        ':first_name'    => $data['first_name'],
        ':last_name'     => $data['last_name'],
        ':phone'         => $data['phone'],
        ':email'         => $data['email'],
        ':event_date'    => $data['event_date'],
        ':event_time'    => $data['event_time'],
        ':address'       => $data['address'],
        ':city'          => $data['city'],
        ':location_type' => $data['location_type'],
        ':occasion'      => $data['occasion'],
        ':guests'        => $data['guests'] ?? null,
        ':notes'         => $data['notes'] ?? null,
    ]);

    // Send email notification
    $gameNames = '';
    if (is_array($data['games'] ?? null)) {
        $gameNames = implode(', ', array_column($data['games'], 'name'));
    }

    $packageLine = !empty($data['package_name']) ? "Package: {$data['package_name']}\n" : '';

    $emailBody = "New Booking Request — AfroRetro Games\n";
    $emailBody .= "======================================\n\n";
    $emailBody .= $packageLine;
    $emailBody .= "Games: {$gameNames}\n\n";
    $emailBody .= "CUSTOMER DETAILS\n";
    $emailBody .= "----------------\n";
    $emailBody .= "Name:   {$data['first_name']} {$data['last_name']}\n";
    $emailBody .= "Phone:  {$data['phone']}\n";
    $emailBody .= "Email:  {$data['email']}\n\n";
    $emailBody .= "EVENT DETAILS\n";
    $emailBody .= "-------------\n";
    $emailBody .= "Date:         {$data['event_date']}\n";
    $emailBody .= "Time:         {$data['event_time']}\n";
    $emailBody .= "Address:      {$data['address']}, {$data['city']}\n";
    $emailBody .= "Venue Type:   {$data['location_type']}\n";
    $emailBody .= "Occasion:     {$data['occasion']}\n";
    $emailBody .= "Guests:       " . ($data['guests'] ?? 'Not specified') . "\n";
    $emailBody .= "Notes:        " . ($data['notes'] ?? 'None') . "\n\n";
    $emailBody .= "======================================\n";
    $emailBody .= "Reply to this email or WhatsApp +256 703 239 422 to confirm.\n";

    $headers  = "From: AfroRetro Games <info@afroretrogames.com>\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    mail(
        'info@afroretrogames.com',
        "New Booking: {$data['first_name']} {$data['last_name']} — {$data['event_date']}",
        $emailBody,
        $headers
    );

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}

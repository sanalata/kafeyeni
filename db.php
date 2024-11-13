<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$host = 'sql111.infinityfree.com';
$dbname = 'if0_37485236_memkafe';
$username = 'if0_37485236';
$password = 'qNoQQ0JXYmP';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

function handleRequest() {
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = trim($path, '/');
    $segments = explode('/', $path);
    $endpoint = $segments[0] ?? '';

    switch ($endpoint) {
        case 'users':
            handleUsers($method);
            break;
        case 'products':
            handleProducts($method);
            break;
        case 'categories':
            handleCategories($method);
            break;
        case 'orders':
            handleOrders($method);
            break;
        case 'auth':
            handleAuth($method);
            break;
        default:
            echo json_encode(['error' => 'Invalid endpoint']);
            break;
    }
}

function handleAuth($method) {
    global $db;
    
    if ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        $stmt = $db->prepare('SELECT * FROM users WHERE username = ? AND password = ?');
        $stmt->execute([$username, $password]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            unset($user['password']);
            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
        }
    }
}

function handleUsers($method) {
    global $db;
    
    switch ($method) {
        case 'GET':
            $stmt = $db->query('SELECT id, username, credits, is_admin FROM users');
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare('INSERT INTO users (username, password, credits, is_admin) VALUES (?, ?, ?, ?)');
            $stmt->execute([
                $data['username'],
                $data['password'],
                $data['credits'],
                $data['isAdmin'] ? 1 : 0
            ]);
            echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare('UPDATE users SET credits = credits + ? WHERE id = ?');
            $stmt->execute([$data['amount'], $data['userId']]);
            echo json_encode(['success' => true]);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
                $stmt->execute([$id]);
                echo json_encode(['success' => true]);
            }
            break;
    }
}

function handleProducts($method) {
    global $db;
    
    switch ($method) {
        case 'GET':
            $stmt = $db->query('SELECT * FROM products');
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare('INSERT INTO products (name, description, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)');
            $stmt->execute([
                $data['name'],
                $data['description'],
                $data['price'],
                $data['category'],
                $data['imageUrl'],
                $data['stock']
            ]);
            echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare('UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, stock = ? WHERE id = ?');
            $stmt->execute([
                $data['name'],
                $data['description'],
                $data['price'],
                $data['category'],
                $data['imageUrl'],
                $data['stock'],
                $data['id']
            ]);
            echo json_encode(['success' => true]);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $db->prepare('DELETE FROM products WHERE id = ?');
                $stmt->execute([$id]);
                echo json_encode(['success' => true]);
            }
            break;
    }
}

function handleCategories($method) {
    global $db;
    
    switch ($method) {
        case 'GET':
            $stmt = $db->query('SELECT * FROM categories');
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare('INSERT INTO categories (name, image_url, description) VALUES (?, ?, ?)');
            $stmt->execute([
                $data['name'],
                $data['imageUrl'],
                $data['description']
            ]);
            echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare('UPDATE categories SET name = ?, image_url = ?, description = ? WHERE id = ?');
            $stmt->execute([
                $data['name'],
                $data['imageUrl'],
                $data['description'],
                $data['id']
            ]);
            echo json_encode(['success' => true]);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $db->prepare('DELETE FROM categories WHERE id = ?');
                $stmt->execute([$id]);
                echo json_encode(['success' => true]);
            }
            break;
    }
}

function handleOrders($method) {
    global $db;
    
    switch ($method) {
        case 'GET':
            $stmt = $db->query('SELECT o.*, u.username FROM orders o JOIN users u ON o.user_id = u.id');
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($orders as &$order) {
                $stmt = $db->prepare('SELECT * FROM order_items WHERE order_id = ?');
                $stmt->execute([$order['id']]);
                $order['items'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            
            echo json_encode($orders);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            $db->beginTransaction();
            try {
                // Create order
                $stmt = $db->prepare('INSERT INTO orders (user_id, status, total_credits, timestamp) VALUES (?, ?, ?, NOW())');
                $stmt->execute([
                    $data['userId'],
                    'Hazırlanıyor',
                    $data['totalCredits']
                ]);
                $orderId = $db->lastInsertId();
                
                // Add order items
                $stmt = $db->prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
                foreach ($data['items'] as $item) {
                    $stmt->execute([
                        $orderId,
                        $item['productId'],
                        $item['quantity'],
                        $item['price']
                    ]);
                    
                    // Update stock
                    $updateStock = $db->prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
                    $updateStock->execute([$item['quantity'], $item['productId']]);
                }
                
                // Update user credits
                $updateCredits = $db->prepare('UPDATE users SET credits = credits - ? WHERE id = ?');
                $updateCredits->execute([$data['totalCredits'], $data['userId']]);
                
                $db->commit();
                echo json_encode(['success' => true, 'orderId' => $orderId]);
            } catch (Exception $e) {
                $db->rollBack();
                echo json_encode(['error' => $e->getMessage()]);
            }
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare('UPDATE orders SET status = ? WHERE id = ?');
            $stmt->execute([$data['status'], $data['orderId']]);
            echo json_encode(['success' => true]);
            break;
    }
}

handleRequest();
?>
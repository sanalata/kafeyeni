-- Set character set
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    credits INT DEFAULT 0,
    is_admin TINYINT(1) DEFAULT 0
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Categories table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image_url TEXT,
    description TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    stock INT DEFAULT 0
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Hazirlanıyor',
    total_credits INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Order items table
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert initial admin user
INSERT INTO users (username, password, credits, is_admin) VALUES ('admin', '123123', 1000, 1);

-- Insert initial customer
INSERT INTO users (username, password, credits, is_admin) VALUES ('ata', '123123', 500, 0);

-- Insert initial categories
INSERT INTO categories (name, image_url, description) VALUES 
('Sıcak İçecekler', 'https://images.unsplash.com/photo-1578374173703-64c2487f37f8', 'Geleneksel Türk kahvesi ve diğer sıcak içecekler'),
('Soğuk İçecekler', 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d', 'Serinleten içecekler ve kahve çeşitleri'),
('Pastane', 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f', 'Taze pasta ve tatlı çeşitleri'),
('Market', 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a', 'Kahve çekirdekleri ve ev için ürünler');
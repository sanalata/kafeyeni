export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'Hazırlanıyor' | 'Hazır' | 'Teslim Edildi';
  timestamp: Date;
  totalCredits: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  productName: string;
  price: number;
}

export interface User {
  id: string;
  username: string;
  credits: number;
  orders: Order[];
  isAdmin: boolean;
}
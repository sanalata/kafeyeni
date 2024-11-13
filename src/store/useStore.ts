import { create } from 'zustand';
import type { Product, Category, Order, User, OrderItem } from '../types';

interface Store {
  users: User[];
  products: Product[];
  categories: Category[];
  cart: OrderItem[];
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  updateUserCredits: (userId: string, amount: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: () => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (userId: string, orderId: string, status: Order['status']) => void;
}

// Initial users
const initialUsers = [
  {
    id: '1',
    username: 'admin',
    password: '123123',
    credits: 1000,
    orders: [],
    isAdmin: true,
  },
  {
    id: '2',
    username: 'ata',
    password: '123123',
    credits: 500,
    orders: [],
    isAdmin: false,
  },
];

// Initial categories
const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Sıcak İçecekler',
    imageUrl: 'https://images.unsplash.com/photo-1578374173703-64c2487f37f8',
    description: 'Geleneksel Türk kahvesi ve diğer sıcak içecekler',
  },
  {
    id: '2',
    name: 'Soğuk İçecekler',
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d',
    description: 'Serinleten içecekler ve kahve çeşitleri',
  },
  {
    id: '3',
    name: 'Pastane',
    imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f',
    description: 'Taze pasta ve tatlı çeşitleri',
  },
  {
    id: '4',
    name: 'Market',
    imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a',
    description: 'Kahve çekirdekleri ve ev için ürünler',
  },
];

// Initial products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Türk Kahvesi',
    description: 'Geleneksel yöntemle hazırlanan özel Türk kahvesi',
    price: 15,
    category: 'Sıcak İçecekler',
    imageUrl: 'https://images.unsplash.com/photo-1578374173703-64c2487f37f8',
    stock: 50
  },
  {
    id: '2',
    name: 'Dibek Kahvesi',
    description: 'Özel dibekte çekilmiş kahve çekirdekleri ile',
    price: 18,
    category: 'Sıcak İçecekler',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
    stock: 30
  },
];

export const useStore = create<Store>((set) => ({
  users: initialUsers,
  user: null,
  products: initialProducts,
  categories: initialCategories,
  cart: [],

  login: (username: string, password: string) => {
    const user = initialUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const { password: _, ...safeUser } = user;
      set({ user: safeUser });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, cart: [] });
  },

  addUser: (userData) => {
    set((state) => ({
      users: [...state.users, { ...userData, id: crypto.randomUUID() }],
    }));
  },

  updateUser: (user) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    }));
  },

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },

  updateUserCredits: (userId: string, amount: number) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? { ...u, credits: u.credits + amount }
          : u
      ),
      user: state.user?.id === userId
        ? { ...state.user, credits: state.user.credits + amount }
        : state.user,
    }));
  },

  addToCart: (product: Product) => {
    set((state) => {
      const existingItem = state.cart.find(item => item.productId === product.id);
      
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            productId: product.id,
            productName: product.name,
            quantity: 1,
            price: product.price,
          },
        ],
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => ({
      cart: state.cart.filter(item => item.productId !== productId),
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  placeOrder: () => {
    set((state) => {
      if (!state.user || state.cart.length === 0) return state;

      const totalCredits = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      if (state.user.credits < totalCredits) return state;

      const newOrder: Order = {
        id: crypto.randomUUID(),
        items: state.cart,
        status: 'Hazırlanıyor',
        timestamp: new Date(),
        totalCredits,
      };

      const updatedUser = {
        ...state.user,
        credits: state.user.credits - totalCredits,
        orders: [...state.user.orders, newOrder],
      };

      return {
        user: updatedUser,
        users: state.users.map(u =>
          u.id === state.user?.id ? updatedUser : u
        ),
        cart: [],
        products: state.products.map(product => {
          const orderItem = state.cart.find(item => item.productId === product.id);
          if (orderItem) {
            return {
              ...product,
              stock: product.stock - orderItem.quantity,
            };
          }
          return product;
        }),
      };
    });
  },

  addCategory: (categoryData) => {
    set((state) => ({
      categories: [...state.categories, { ...categoryData, id: crypto.randomUUID() }],
    }));
  },

  updateCategory: (category) => {
    set((state) => ({
      categories: state.categories.map((c) => (c.id === category.id ? category : c)),
    }));
  },

  deleteCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    }));
  },

  addProduct: (productData) => {
    set((state) => ({
      products: [...state.products, { ...productData, id: crypto.randomUUID() }],
    }));
  },

  updateProduct: (product) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    }));
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  updateOrderStatus: (userId: string, orderId: string, status: Order['status']) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? {
              ...u,
              orders: u.orders.map((order) =>
                order.id === orderId
                  ? { ...order, status }
                  : order
              ),
            }
          : u
      ),
      user: state.user?.id === userId
        ? {
            ...state.user,
            orders: state.user.orders.map((order) =>
              order.id === orderId
                ? { ...order, status }
                : order
            ),
          }
        : state.user,
    }));
  },
}));
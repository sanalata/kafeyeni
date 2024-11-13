import React from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Türk Kahvesi',
    description: 'Geleneksel yöntemle hazırlanan özel Türk kahvesi',
    price: 15,
    category: 'Kahveler',
    imageUrl: 'https://images.unsplash.com/photo-1578374173703-64c2487f37f8?auto=format&fit=crop&q=80',
    stock: 50
  },
  {
    id: '2',
    name: 'Dibek Kahvesi',
    description: 'Özel dibekte çekilmiş kahve çekirdekleri ile',
    price: 18,
    category: 'Kahveler',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80',
    stock: 30
  },
  {
    id: '3',
    name: 'Menengiç Kahvesi',
    description: 'Antep fıstığından üretilen geleneksel içecek',
    price: 20,
    category: 'Kahveler',
    imageUrl: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&q=80',
    stock: 25
  }
];

export default function Menu() {
  const { products } = useStore();
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Menümüz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
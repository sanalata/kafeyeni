import React from 'react';
import { useStore } from '../store/useStore';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, user } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{product.price} Kredi</span>
          <button
            onClick={() => addToCart(product)}
            disabled={!user || product.stock <= 0}
            className="bg-[#D4A574] text-white px-4 py-2 rounded-lg hover:bg-[#2C1810] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock <= 0 ? 'Tükendi' : 'Sepete Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
}
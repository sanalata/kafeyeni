import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Minus } from 'lucide-react';

export default function StockManagement() {
  const { products, updateProduct } = useStore();
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});

  const handleAdjustment = (productId: string, amount: number) => {
    setAdjustments(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + amount,
    }));
  };

  const handleSave = (product: any) => {
    const adjustment = adjustments[product.id] || 0;
    if (adjustment === 0) return;

    const newStock = Math.max(0, product.stock + adjustment);
    updateProduct({
      ...product,
      stock: newStock,
    });

    setAdjustments(prev => {
      const newAdjustments = { ...prev };
      delete newAdjustments[product.id];
      return newAdjustments;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ürün
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mevcut Stok
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stok Ayarla
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlem
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => {
            const adjustment = adjustments[product.id] || 0;
            const newStock = product.stock + adjustment;

            return (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <div className="ml-4">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${product.stock < 10 ? 'text-red-500' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleAdjustment(product.id, -1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={newStock <= 0}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {adjustment > 0 ? `+${adjustment}` : adjustment}
                    </span>
                    <button
                      onClick={() => handleAdjustment(product.id, 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {adjustment !== 0 && (
                    <button
                      onClick={() => handleSave(product)}
                      className="bg-[#D4A574] text-white px-4 py-2 rounded-lg hover:bg-[#2C1810] transition-colors"
                    >
                      Kaydet
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
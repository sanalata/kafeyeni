import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit, Trash } from 'lucide-react';
import ProductForm from './ProductForm';

export default function ProductManagement() {
  const { products, deleteProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ürün Yönetimi</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#D4A574] text-white px-4 py-2 rounded-lg hover:bg-[#2C1810] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Ürün
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">{product.price} Kredi</span>
                <span className={`${
                  product.stock < 10 ? 'text-red-500' : 'text-green-500'
                }`}>
                  Stok: {product.stock}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
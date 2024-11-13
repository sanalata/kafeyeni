import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Category } from '../../types';
import { X } from 'lucide-react';

interface CategoryFormProps {
  category?: Category;
  onClose: () => void;
}

export default function CategoryForm({ category, onClose }: CategoryFormProps) {
  const { addCategory, updateCategory } = useStore();
  const [name, setName] = useState(category?.name ?? '');
  const [imageUrl, setImageUrl] = useState(category?.imageUrl ?? '');
  const [description, setDescription] = useState(category?.description ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = {
      name,
      imageUrl,
      description,
    };

    if (category) {
      updateCategory({ ...categoryData, id: category.id });
    } else {
      addCategory(categoryData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {category ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
          </h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori Adı
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Görsel URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#D4A574] text-white rounded-lg hover:bg-[#2C1810] transition-colors"
            >
              {category ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
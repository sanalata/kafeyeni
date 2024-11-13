import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit, Trash } from 'lucide-react';
import CategoryForm from './CategoryForm';

export default function CategoryManagement() {
  const { categories, deleteCategory } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Kategori Yönetimi</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#D4A574] text-white px-4 py-2 rounded-lg hover:bg-[#2C1810] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
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
        <CategoryForm
          category={editingCategory}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}
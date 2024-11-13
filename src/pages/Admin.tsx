import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Package, Users, Tag, Archive, CreditCard } from 'lucide-react';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import ProductManagement from '../components/admin/ProductManagement';
import CreditManagement from '../components/admin/CreditManagement';
import UserForm from '../components/admin/UserForm';

type ActiveTab = 'orders' | 'users' | 'categories' | 'products' | 'credits';

export default function Admin() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<ActiveTab>('orders');
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(undefined);

  if (!user?.isAdmin) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Erişim Reddedildi</h2>
        <p className="text-gray-600">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Yönetici Paneli</h1>
      
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-b-2 border-[#D4A574] text-[#D4A574]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          <Package className="w-5 h-5" />
          Siparişler
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-b-2 border-[#D4A574] text-[#D4A574]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <Users className="w-5 h-5" />
          Kullanıcılar
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'border-b-2 border-[#D4A574] text-[#D4A574]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('categories')}
        >
          <Tag className="w-5 h-5" />
          Kategoriler
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-b-2 border-[#D4A574] text-[#D4A574]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('products')}
        >
          <Archive className="w-5 h-5" />
          Ürünler
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'credits'
              ? 'border-b-2 border-[#D4A574] text-[#D4A574]'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('credits')}
        >
          <CreditCard className="w-5 h-5" />
          Kredi Yönetimi
        </button>
      </div>

      {activeTab === 'orders' && <OrderManagement />}
      {activeTab === 'users' && (
        <UserManagement
          onAddUser={() => {
            setEditingUser(undefined);
            setShowUserForm(true);
          }}
          onEditUser={(user) => {
            setEditingUser(user);
            setShowUserForm(true);
          }}
        />
      )}
      {activeTab === 'categories' && <CategoryManagement />}
      {activeTab === 'products' && <ProductManagement />}
      {activeTab === 'credits' && <CreditManagement />}

      {showUserForm && (
        <UserForm
          user={editingUser}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(undefined);
          }}
        />
      )}
    </div>
  );
}
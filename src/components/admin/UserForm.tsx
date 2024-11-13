import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';

interface UserFormProps {
  user?: any;
  onClose: () => void;
}

export default function UserForm({ user, onClose }: UserFormProps) {
  const { addUser, updateUser } = useStore();
  const [username, setUsername] = useState(user?.username ?? '');
  const [password, setPassword] = useState('');
  const [credits, setCredits] = useState(user?.credits?.toString() ?? '0');
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      username,
      password,
      credits: Number(credits),
      isAdmin,
      orders: user?.orders ?? [],
    };

    if (user) {
      updateUser({ ...userData, id: user.id });
    } else {
      addUser(userData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {user ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
          </h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required={!user}
              placeholder={user ? 'Boş bırakılırsa değişmez' : ''}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başlangıç Kredisi
            </label>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
              min="0"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">
              Yönetici Yetkisi
            </label>
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
              {user ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
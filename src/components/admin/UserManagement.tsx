import React from 'react';
import { useStore } from '../../store/useStore';
import { Plus, Edit, Trash, CreditCard } from 'lucide-react';

interface UserManagementProps {
  onAddUser: () => void;
  onEditUser: (user: any) => void;
}

export default function UserManagement({ onAddUser, onEditUser }: UserManagementProps) {
  const { users, deleteUser, updateUserCredits } = useStore();
  const [creditAmount, setCreditAmount] = React.useState<Record<string, string>>({});

  const totalCredits = users.reduce((sum, user) => sum + user.credits, 0);

  const handleCreditUpdate = (userId: string) => {
    const amount = parseInt(creditAmount[userId]);
    if (!isNaN(amount)) {
      updateUserCredits(userId, amount);
      setCreditAmount(prev => {
        const newState = { ...prev };
        delete newState[userId];
        return newState;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Kullanıcı Yönetimi</h2>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 bg-[#D4A574] text-white px-4 py-2 rounded-lg hover:bg-[#2C1810] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Kullanıcı
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kullanıcı Adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kredi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kredi Ekle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-gray-500">
                        {user.isAdmin ? 'Yönetici' : 'Müşteri'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium">{user.credits} Kredi</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={creditAmount[user.id] || ''}
                      onChange={(e) => setCreditAmount(prev => ({
                        ...prev,
                        [user.id]: e.target.value
                      }))}
                      placeholder="Miktar"
                      className="w-24 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => handleCreditUpdate(user.id)}
                      className="p-1 rounded hover:bg-gray-100"
                      disabled={!creditAmount[user.id]}
                    >
                      <CreditCard className="w-5 h-5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
                          deleteUser(user.id);
                        }
                      }}
                      className="p-1 rounded hover:bg-gray-100"
                      disabled={user.isAdmin}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-6 py-4 font-medium">
                Toplam Kredi
              </td>
              <td colSpan={2} className="px-6 py-4 font-bold text-[#D4A574]">
                {totalCredits} Kredi
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
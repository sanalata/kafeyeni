import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CreditManagement() {
  const { users, updateUserCredits } = useStore();
  const [amount, setAmount] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');

  const totalCredits = users.reduce((sum, user) => sum + user.credits, 0);
  const averageCredits = Math.round(totalCredits / users.length);

  const handleCreditUpdate = () => {
    if (selectedUser && amount) {
      updateUserCredits(selectedUser, parseInt(amount));
      setAmount('');
      setSelectedUser('');
    }
  };

  // Sample data for the chart
  const chartData = {
    labels: users.map(user => user.username),
    datasets: [
      {
        label: 'Kullanıcı Kredileri',
        data: users.map(user => user.credits),
        borderColor: '#D4A574',
        backgroundColor: 'rgba(212, 165, 116, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Kredi Dağılımı',
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <CreditCard className="w-8 h-8 text-[#D4A574]" />
            <div>
              <h3 className="text-lg font-semibold">Toplam Kredi</h3>
              <p className="text-2xl font-bold">{totalCredits}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Ortalama Kredi</h3>
              <p className="text-2xl font-bold">{averageCredits}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <TrendingDown className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Düşük Kredili Kullanıcılar</h3>
              <p className="text-2xl font-bold">
                {users.filter(user => user.credits < 100).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Kredi Yükle</h3>
        <div className="flex gap-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Kullanıcı Seçin</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} - Mevcut: {user.credits} Kredi
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Miktar"
            className="w-32 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleCreditUpdate}
            disabled={!selectedUser || !amount}
            className="bg-[#D4A574] text-white px-6 py-2 rounded-lg hover:bg-[#2C1810] transition-colors disabled:opacity-50"
          >
            Yükle
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Line options={chartOptions} data={chartData} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Kredi Geçmişi</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kullanıcı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mevcut Kredi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Toplam Harcama
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => {
              const totalSpent = user.orders.reduce(
                (sum, order) => sum + order.totalCredits,
                0
              );

              return (
                <tr key={user.id}>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.credits} Kredi</td>
                  <td className="px-6 py-4">{totalSpent} Kredi</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
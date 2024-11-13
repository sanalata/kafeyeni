import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useStore } from '../../store/useStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StockAnalytics() {
  const { products } = useStore();

  const chartData = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: 'Mevcut Stok',
        data: products.map(p => p.stock),
        backgroundColor: '#D4A574',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ürün Stok Seviyeleri',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lowStockProducts = products.filter(p => p.stock < 10);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Toplam Ürün</h3>
          <p className="text-3xl font-bold text-[#D4A574]">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Düşük Stok</h3>
          <p className="text-3xl font-bold text-yellow-500">{lowStockProducts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Tükenen Ürün</h3>
          <p className="text-3xl font-bold text-red-500">{outOfStockProducts.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Bar data={chartData} options={options} />
      </div>

      {lowStockProducts.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Düşük Stok Uyarıları</h3>
          <div className="space-y-2">
            {lowStockProducts.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
              >
                <span>{product.name}</span>
                <span className="font-semibold text-yellow-600">
                  {product.stock} adet kaldı
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
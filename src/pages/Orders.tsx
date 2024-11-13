import React from 'react';
import { useStore } from '../store/useStore';
import { Clock, CheckCircle, Package } from 'lucide-react';

export default function Orders() {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Lütfen giriş yapın</h2>
        <p className="text-gray-600">Siparişlerinizi görüntülemek için giriş yapmanız gerekmektedir.</p>
      </div>
    );
  }

  const statusIcons = {
    'Hazırlanıyor': <Clock className="w-6 h-6 text-yellow-500" />,
    'Hazır': <CheckCircle className="w-6 h-6 text-green-500" />,
    'Teslim Edildi': <Package className="w-6 h-6 text-blue-500" />
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Siparişlerim</h1>
      
      {user.orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600">Henüz hiç sipariş vermediniz.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {user.orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {statusIcons[order.status]}
                  <span className="font-semibold">{order.status}</span>
                </div>
                <span className="text-gray-600">
                  {new Date(order.timestamp).toLocaleString('tr-TR')}
                </span>
              </div>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.productName}</span>
                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                    </div>
                    <span>{item.price * item.quantity} Kredi</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Toplam</span>
                  <span className="font-semibold">{order.totalCredits} Kredi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
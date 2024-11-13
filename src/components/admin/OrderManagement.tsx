import React from 'react';
import { useStore } from '../../store/useStore';
import { Clock, Truck, CheckCircle } from 'lucide-react';

export default function OrderManagement() {
  const { users, updateOrderStatus } = useStore();

  // Collect all orders from all users
  const allOrders = users.flatMap(user => 
    user.orders.map(order => ({
      ...order,
      username: user.username,
      userId: user.id
    }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleStatusUpdate = (userId: string, orderId: string, status: 'Hazırlanıyor' | 'Hazır' | 'Teslim Edildi') => {
    updateOrderStatus(userId, orderId, status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hazırlanıyor':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Hazır':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'Teslim Edildi':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Aktif Siparişler</h2>
          <div className="space-y-4">
            {allOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium">{order.username}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(order.timestamp).toLocaleString('tr-TR')}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>{item.productName} x{item.quantity}</span>
                      <span>{item.price * item.quantity} Kredi</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="font-medium">
                    Toplam: {order.totalCredits} Kredi
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(order.userId, order.id, 'Hazırlanıyor')}
                      className={`px-3 py-1 rounded ${
                        order.status === 'Hazırlanıyor'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 hover:bg-yellow-50'
                      }`}
                    >
                      Hazırlanıyor
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order.userId, order.id, 'Hazır')}
                      className={`px-3 py-1 rounded ${
                        order.status === 'Hazır'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 hover:bg-blue-50'
                      }`}
                    >
                      Hazır
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order.userId, order.id, 'Teslim Edildi')}
                      className={`px-3 py-1 rounded ${
                        order.status === 'Teslim Edildi'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 hover:bg-green-50'
                      }`}
                    >
                      Teslim Edildi
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {allOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Henüz sipariş bulunmamaktadır.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
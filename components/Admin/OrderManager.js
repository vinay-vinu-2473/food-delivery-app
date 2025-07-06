import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const statusOptions = [
  { value: 'received', label: 'Received' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'ontheway', label: 'On the Way' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call
    const fetchOrders = async () => {
      try {
        const mockOrders = [
          {
            id: '1',
            userId: 'user1',
            items: [
              { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 2 },
              { id: '2', name: 'Garlic Bread', price: 4.99, quantity: 1 },
            ],
            total: 30.97,
            status: 'preparing',
            deliveryAddress: '123 Main St, City, Country',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 3600000).toISOString(),
          },
          // More mock orders...
        ];
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Replace with actual API call
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-3 px-4 border-b border-gray-200">#{order.id}</td>
                <td className="py-3 px-4 border-b border-gray-200">{format(new Date(order.createdAt), 'MMM d, yyyy')}</td>
                <td className="py-3 px-4 border-b border-gray-200">User {order.userId}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
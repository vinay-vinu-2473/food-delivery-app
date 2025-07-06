import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout/Layout';
import OrderCard from '../../components/Orders/OrderCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Replace with actual API call
    const fetchOrders = async () => {
      try {
        const mockOrders = [
          {
            id: '1',
            items: [
              { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
              { id: '3', name: 'Cheeseburger', price: 8.99, quantity: 2 },
            ],
            total: 30.97,
            status: 'delivered',
            createdAt: '2023-05-15T14:32:00Z',
          },
          {
            id: '2',
            items: [
              { id: '4', name: 'Spaghetti Carbonara', price: 11.99, quantity: 1 },
            ],
            total: 11.99,
            status: 'ontheway',
            createdAt: '2023-05-20T18:15:00Z',
          },
        ];
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <Layout title="My Orders">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view your orders</h2>
          <Button 
            onClick={() => router.push('/auth/login?redirect=/orders')}
            className="btn-primary"
          >
            Login
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Orders">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        {loading ? (
          <LoadingSpinner />
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
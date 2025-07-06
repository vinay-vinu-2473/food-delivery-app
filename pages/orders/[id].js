import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import OrderTracking from '../../../components/Orders/OrderTracking';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirect=/orders/' + id);
      return;
    }

    // Fetch order data
    const fetchOrder = async () => {
      try {
        // Replace with actual API call
        const mockOrder = {
          id,
          userId: user.id,
          items: [
            { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2 },
            { id: 2, name: 'Garlic Bread', price: 4.99, quantity: 1 },
          ],
          total: 30.97,
          status: 'preparing',
          deliveryAddress: '123 Main St, City, Country',
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 3600000).toISOString(),
          updates: [
            { status: 'received', timestamp: new Date().toISOString() },
            { status: 'preparing', timestamp: new Date(Date.now() + 600000).toISOString() },
          ]
        };
        setOrder(mockOrder);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id, user, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return <div className="container mx-auto p-4">Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order #{order.id}</h1>
      <OrderTracking order={order} />
    </div>
  );
}
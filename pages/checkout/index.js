import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart, useAuth } from '../../context';
import Layout from '../../components/Layout/Layout';
import CheckoutForm from '../../components/Checkout/CheckoutForm';
import OrderSummary from '../../components/Checkout/OrderSummary';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (paymentData) => {
    setLoading(true);
    setError('');
    
    try {
      // Replace with actual API call
      const orderData = {
        userId: user?.id,
        items: cart,
        total: totalPrice,
        payment: paymentData,
        status: 'received'
      };
      
      console.log('Order submitted:', orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to order confirmation
      router.push(`/order-confirmation/123`); // Replace with actual order ID
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout title="Checkout">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to checkout</h2>
          <Button 
            onClick={() => router.push('/auth/login?redirect=/checkout')}
            className="btn-primary"
          >
            Login
          </Button>
        </div>
      </Layout>
    );
  }

  if (cart.length === 0) {
    return (
      <Layout title="Checkout">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button 
            onClick={() => router.push('/menu')}
            className="btn-primary"
          >
            Browse Menu
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
              <CheckoutForm 
                user={user} 
                onSubmit={handleSubmit} 
                loading={loading}
              />
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <OrderSummary cart={cart} totalPrice={totalPrice} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
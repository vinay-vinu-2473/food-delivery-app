import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import Layout from '../../components/Layout/Layout';

export default function CheckoutSuccess() {
  const { clearCart } = useCart();
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    // Clear cart when success page loads
    clearCart();
  }, [clearCart]);

  return (
    <Layout title="Order Confirmation">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mt-6">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mt-4">
          Thank you for your order #{orderId}
        </p>
        <p className="text-gray-500 mt-2">
          We've sent a confirmation email with your order details.
        </p>
        <div className="mt-10">
          <a
            href="/orders"
            className="btn-primary inline-flex items-center px-6 py-3"
          >
            View Order Status
          </a>
        </div>
        <div className="mt-6">
          <a
            href="/menu"
            className="text-orange-600 hover:text-orange-500 font-medium"
          >
            Continue Shopping →
          </a>
        </div>
      </div>
    </Layout>
  );
}
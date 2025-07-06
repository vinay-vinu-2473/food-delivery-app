import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/UI/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>FoodExpress - Delicious Food Delivered</title>
      </Head>
      
      <section className="py-20 px-4 text-center bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
            Delicious Food Delivered to Your Doorstep
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Order from your favorite restaurants with just a few clicks.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/login">
              <Button className="btn-primary">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="btn-outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="h-12 w-12 mx-auto text-orange-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in under 30 minutes</p>
            </div>
            <div className="text-center p-6">
              <div className="h-12 w-12 mx-auto text-orange-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Wide Selection</h3>
              <p className="text-gray-600">Choose from hundreds of restaurants and dishes</p>
            </div>
            <div className="text-center p-6">
              <div className="h-12 w-12 mx-auto text-orange-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment options</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
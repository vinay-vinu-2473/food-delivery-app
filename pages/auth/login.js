import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/Auth/LoginForm';
import Layout from '../../components/Layout/Layout';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(router.query.redirect || '/menu');
    }
  }, [user, router]);

  return (
    <Layout title="Login">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sign in to your account</h1>
        </div>
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
}
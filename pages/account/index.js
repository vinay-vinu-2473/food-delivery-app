import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout/Layout';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <Layout title="My Account">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Personal Information
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {user?.name || 'Not provided'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {user?.email || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <a
            href="/account/addresses"
            className="bg-white shadow overflow-hidden sm:rounded-lg p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              My Addresses
            </h3>
            <p className="text-sm text-gray-500">
              Manage your delivery addresses
            </p>
          </a>
          <a
            href="/account/payment"
            className="bg-white shadow overflow-hidden sm:rounded-lg p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Payment Methods
            </h3>
            <p className="text-sm text-gray-500">
              Add or update payment options
            </p>
          </a>
          <a
            href="/orders"
            className="bg-white shadow overflow-hidden sm:rounded-lg p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Order History
            </h3>
            <p className="text-sm text-gray-500">
              View your past orders
            </p>
          </a>
        </div>
      </div>
    </Layout>
  );
}
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Layout from '../../../components/Layout/Layout';
import Button from '../../../components/UI/Button';
import Modal from '../../../components/UI/Modal';

const paymentMethods = [
  {
    id: 'card-1',
    type: 'visa',
    last4: '4242',
    expiry: '12/24',
    isDefault: true,
  },
  {
    id: 'card-2',
    type: 'mastercard',
    last4: '5555',
    expiry: '06/23',
    isDefault: false,
  },
];

export default function PaymentMethodsPage() {
  const { user, updateUser } = useAuth();
  const [methods, setMethods] = useState(paymentMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    isDefault: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would tokenize the card with a payment processor
      // and only store the token on your server
      const newMethod = {
        id: `card-${Date.now()}`,
        type: 'visa', // This would be determined from the card number
        last4: formData.cardNumber.slice(-4),
        expiry: formData.expiry,
        isDefault: formData.isDefault,
      };

      let updatedMethods;
      if (formData.isDefault) {
        updatedMethods = methods.map(method => ({
          ...method,
          isDefault: false,
        }));
        updatedMethods.push(newMethod);
      } else {
        updatedMethods = [...methods, newMethod];
      }

      setMethods(updatedMethods);
      setIsModalOpen(false);
      setFormData({
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: '',
        isDefault: false,
      });
    } catch (error) {
      console.error('Failed to add payment method:', error);
    }
  };

  const handleSetDefault = (id) => {
    const updatedMethods = methods.map(method => ({
      ...method,
      isDefault: method.id === id,
    }));
    setMethods(updatedMethods);
  };

  const handleDelete = (id) => {
    const updatedMethods = methods.filter(method => method.id !== id);
    setMethods(updatedMethods);
  };

  return (
    <Layout title="Payment Methods">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Add Payment Method
          </Button>
        </div>

        {methods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't added any payment methods yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {methods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-6 ${
                  method.isDefault ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                      {method.type === 'visa' ? (
                        <span className="text-blue-600 font-bold">VISA</span>
                      ) : (
                        <span className="text-red-600 font-bold">MC</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">
                        **** **** **** {method.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {method.isDefault ? (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-sm text-orange-600 hover:text-orange-800"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-medium mb-4">Add Payment Method</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="4242 4242 4242 4242"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                id="default-payment"
                name="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="default-payment"
                className="ml-2 block text-sm text-gray-900"
              >
                Set as default payment method
              </label>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-outline"
              >
                Cancel
              </Button>
              <Button type="submit" className="btn-primary">
                Add Card
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
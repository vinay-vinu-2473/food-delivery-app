import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Layout from '../../../components/Layout/Layout';
import Button from '../../../components/UI/Button';
import Modal from '../../../components/UI/Modal';

export default function AddressesPage() {
  const { user, updateUser } = useAuth();
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
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
      let updatedAddresses;
      if (currentAddress) {
        // Update existing address
        updatedAddresses = addresses.map(addr =>
          addr.id === currentAddress.id ? formData : addr
        );
      } else {
        // Add new address
        updatedAddresses = [
          ...addresses,
          { ...formData, id: Date.now().toString() },
        ];
      }
      
      // If this is set as default, unset others
      if (formData.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === formData.id ? true : false,
        }));
      }

      setAddresses(updatedAddresses);
      await updateUser({ addresses: updatedAddresses });
      setIsModalOpen(false);
      setCurrentAddress(null);
      setFormData({
        name: '',
        street: '',
        city: '',
        postalCode: '',
        isDefault: false,
      });
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  const handleEdit = (address) => {
    setCurrentAddress(address);
    setFormData(address);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const updatedAddresses = addresses.filter(addr => addr.id !== id);
      setAddresses(updatedAddresses);
      await updateUser({ addresses: updatedAddresses });
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  return (
    <Layout title="My Addresses">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>
          <Button
            onClick={() => {
              setCurrentAddress(null);
              setIsModalOpen(true);
            }}
            className="btn-primary"
          >
            Add New Address
          </Button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't saved any addresses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-6 ${
                  address.isDefault ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    {address.name}
                    {address.isDefault && (
                      <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                        Default
                      </span>
                    )}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{address.street}</p>
                <p className="text-gray-600">
                  {address.city}, {address.postalCode}
                </p>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-medium mb-4">
            {currentAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address Name (e.g., Home, Work)
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="default-address"
                name="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="default-address"
                className="ml-2 block text-sm text-gray-900"
              >
                Set as default delivery address
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
                {currentAddress ? 'Update' : 'Add'} Address
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
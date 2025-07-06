import { useState, useEffect } from 'react';
import { useToast } from '../../../context/ToastContext';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const FoodManager = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFood, setCurrentFood] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });
  const { showToast } = useToast();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      // Replace with actual API call
      const mockFoods = [
        { id: 1, name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce and mozzarella', price: 12.99, category: 'Pizza', image: '/images/food/pizza.jpg' },
        { id: 2, name: 'Cheeseburger', description: 'Juicy beef patty with cheese', price: 8.99, category: 'Burger', image: '/images/food/burger.jpg' },
      ];
      setFoods(mockFoods);
      setLoading(false);
    } catch (error) {
      showToast('Failed to load foods', 'error');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentFood) {
        // Update existing food
        const updatedFoods = foods.map(food => 
          food.id === currentFood.id ? { ...formData, id: currentFood.id } : food
        );
        setFoods(updatedFoods);
        showToast('Food item updated successfully', 'success');
      } else {
        // Add new food
        const newFood = { ...formData, id: foods.length + 1 };
        setFoods([...foods, newFood]);
        showToast('Food item added successfully', 'success');
      }
      setIsModalOpen(false);
      setCurrentFood(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
      });
    } catch (error) {
      showToast('Operation failed', 'error');
    }
  };

  const handleEdit = (food) => {
    setCurrentFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image: food.image
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setFoods(foods.filter(food => food.id !== id));
      showToast('Food item deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete food item', 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Food Items</h2>
        <Button onClick={() => setIsModalOpen(true)} className="btn-primary">
          Add New Food
        </Button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food.id}>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <img src={food.image} alt={food.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">{food.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{food.description}</td>
                  <td className="py-3 px-4 border-b border-gray-200">${food.price}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{food.category}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handleEdit(food)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setCurrentFood(null);
      }}>
        <h3 className="text-lg font-medium mb-4">
          {currentFood ? 'Edit Food Item' : 'Add New Food Item'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setCurrentFood(null);
              }}
              className="btn-outline mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-primary">
              {currentFood ? 'Update' : 'Add'} Food
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FoodManager;
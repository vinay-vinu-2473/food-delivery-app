import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import Layout from '../../components/Layout/Layout';
import FoodList from '../../components/Food/FoodList';
import CategoryFilter from '../../components/Common/CategoryFilter';
import FoodSearch from '../../components/Food/FoodSearch';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

export default function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();
  const { category, search } = router.query;

  useEffect(() => {
    // Replace with actual API call
    const fetchFoods = async () => {
      try {
        const mockFoods = [
          { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce and mozzarella', price: 12.99, category: 'pizza', image: '/images/food/pizza.jpg' },
          { id: '2', name: 'Pepperoni Pizza', description: 'Pizza with tomato sauce, mozzarella and pepperoni', price: 14.99, category: 'pizza', image: '/images/food/pizza2.jpg' },
          { id: '3', name: 'Cheeseburger', description: 'Juicy beef patty with cheese', price: 8.99, category: 'burger', image: '/images/food/burger.jpg' },
          { id: '4', name: 'Spaghetti Carbonara', description: 'Pasta with creamy sauce and bacon', price: 11.99, category: 'pasta', image: '/images/food/pasta.jpg' },
          { id: '5', name: 'Caesar Salad', description: 'Fresh salad with chicken and Caesar dressing', price: 9.99, category: 'salad', image: '/images/food/salad.jpg' },
        ];

        // Filter based on category and search query
        let filteredFoods = mockFoods;
        if (category && category !== 'all') {
          filteredFoods = filteredFoods.filter(food => food.category === category);
        }
        if (search) {
          const searchTerm = search.toLowerCase();
          filteredFoods = filteredFoods.filter(food => 
            food.name.toLowerCase().includes(searchTerm) || 
            food.description.toLowerCase().includes(searchTerm)
          );
        }

        setFoods(filteredFoods);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch foods:', error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, [category, search]);

  return (
    <Layout title="Our Menu">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <FoodSearch initialQuery={search || ''} />
            </div>
            <CategoryFilter />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : foods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No food items found.</p>
          </div>
        ) : (
          <FoodList foods={foods} onAddToCart={addToCart} />
        )}
      </div>
    </Layout>
  );
}
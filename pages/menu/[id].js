import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import Layout from '../../../components/Layout/Layout';
import Button from '../../../components/UI/Button';
import Rating from '../../../components/UI/Rating';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

export default function FoodDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      // Replace with actual API call
      const fetchFood = async () => {
        try {
          const mockFood = {
            id,
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
            price: 12.99,
            rating: 4.5,
            reviewCount: 124,
            category: 'Pizza',
            image: '/images/food/pizza.jpg',
            ingredients: [
              'Pizza dough',
              'Tomato sauce',
              'Fresh mozzarella',
              'Basil leaves',
              'Olive oil',
            ],
          };
          setFood(mockFood);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch food:', error);
          setLoading(false);
        }
      };

      fetchFood();
    }
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      ...food,
      quantity,
    });
    router.push('/cart');
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!food) {
    return (
      <Layout title="Not Found">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Food item not found</h1>
          <Button
            onClick={() => router.push('/menu')}
            className="mt-4 btn-primary"
          >
            Back to Menu
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={food.name}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="relative h-96">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{food.name}</h1>
            <div className="mt-2 flex items-center">
              <Rating value={food.rating} readOnly />
              <span className="ml-2 text-gray-600">
                {food.rating} ({food.reviewCount} reviews)
              </span>
            </div>
            <p className="mt-4 text-gray-600">{food.description}</p>
            <p className="mt-4 text-3xl font-bold text-orange-600">
              ${food.price.toFixed(2)}
            </p>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Ingredients</h2>
              <ul className="mt-2 list-disc list-inside text-gray-600">
                {food.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-orange-600"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-orange-600"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1"
                >
                  Add to Cart - ${(food.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
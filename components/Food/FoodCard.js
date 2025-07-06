import Image from 'next/image';
import Button from '../UI/Button';

export default function FoodCard({ food, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48">
        <Image
          src={food.image}
          alt={food.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{food.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-orange-600 font-bold">${food.price.toFixed(2)}</span>
          <Button 
            onClick={() => onAddToCart(food)}
            className="btn-primary px-3 py-1 text-sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
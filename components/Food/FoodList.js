import FoodCard from './FoodCard';

export default function FoodList({ foods, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map(food => (
        <FoodCard 
          key={food.id} 
          food={food} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
}
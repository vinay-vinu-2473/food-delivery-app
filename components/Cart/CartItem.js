import Image from 'next/image';
import { useState } from 'react';

export default function CartItem({ item, onUpdateQuantity, onRemove, compact = false }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, Math.min(99, newQuantity));
    setQuantity(qty);
    onUpdateQuantity(item.id, qty);
  };

  if (compact) {
    return (
      <li className="py-4 flex">
        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            width={64}
            height={64}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-4 flex-1 flex flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>{item.name}</h3>
              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between text-sm">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 text-gray-600 hover:text-orange-600"
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:text-orange-600"
              >
                +
              </button>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="text-lg font-medium">${item.price.toFixed(2)}</p>
        </div>
        <p className="text-gray-500 text-sm">{item.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:text-orange-600"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:text-orange-600"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
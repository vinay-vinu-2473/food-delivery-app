import { useState } from 'react';

const deliveryOptions = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: 'Delivered within 45-60 minutes',
    price: 2.99,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Delivered within 25-40 minutes',
    price: 4.99,
  },
  {
    id: 'scheduled',
    name: 'Scheduled Delivery',
    description: 'Choose your preferred delivery time',
    price: 1.99,
  },
];

export default function DeliveryOptions({ selectedOption, onSelect }) {
  const [showSchedule, setShowSchedule] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('');

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Delivery Options</h3>
      <div className="space-y-2">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              onSelect(option.id);
              setShowSchedule(option.id === 'scheduled');
            }}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedOption === option.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-orange-300'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <input
                  type="radio"
                  name="delivery-option"
                  checked={selectedOption === option.id}
                  onChange={() => {}}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
              </div>
              <div className="ml-3">
                <div className="flex justify-between">
                  <p className="font-medium">{option.name}</p>
                  <p className="font-medium">${option.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500">{option.description}</p>
                {option.id === 'scheduled' && selectedOption === 'scheduled' && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Preferred Delivery Time
                    </label>
                    <input
                      type="datetime-local"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
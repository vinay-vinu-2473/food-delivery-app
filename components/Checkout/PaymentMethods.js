import { useState } from 'react';
import Image from 'next/image';

const paymentOptions = [
  {
    id: 'credit',
    name: 'Credit Card',
    icon: '/images/payments/credit-card.png',
    description: 'Pay with Visa, Mastercard, or other credit card',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '/images/payments/paypal.png',
    description: 'Pay with your PayPal account',
  },
  {
    id: 'cash',
    name: 'Cash on Delivery',
    icon: '/images/payments/cash.png',
    description: 'Pay with cash when your order arrives',
  },
];

export default function PaymentMethods({ selectedMethod, onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Payment Method</h3>
      <div className="space-y-2">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedMethod === option.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-orange-300'
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8">
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium">{option.name}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <div className="ml-auto">
                <input
                  type="radio"
                  name="payment-method"
                  checked={selectedMethod === option.id}
                  onChange={() => {}}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
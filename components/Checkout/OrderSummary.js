import { useCart } from '../../context/CartContext';

export default function OrderSummary({ cart, totalPrice }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      <ul className="divide-y divide-gray-200">
        {cart.map(item => (
          <li key={item.id} className="py-4 flex justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>$2.99</p>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2">
          <p>Total</p>
          <p>${(totalPrice + 2.99).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
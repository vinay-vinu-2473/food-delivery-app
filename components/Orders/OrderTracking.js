import { format } from 'date-fns';

const statusSteps = [
  { id: 'received', name: 'Order Received' },
  { id: 'preparing', name: 'Preparing' },
  { id: 'ontheway', name: 'On the Way' },
  { id: 'delivered', name: 'Delivered' },
];

export default function OrderTracking({ order }) {
  const currentStatusIndex = statusSteps.findIndex(step => step.id === order.status);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Order Status</h2>
        <div className="relative">
          <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
          {statusSteps.map((step, index) => {
            const isComplete = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            const isUpcoming = index > currentStatusIndex;

            return (
              <div key={step.id} className="relative flex items-start pb-8">
                <div className="absolute top-0 left-4 -ml-1.5">
                  <div className={`h-3 w-3 rounded-full ${isComplete ? 'bg-green-500' : isCurrent ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                </div>
                <div className="ml-8">
                  <p className={`font-medium ${isComplete || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.name}
                  </p>
                  {isCurrent && (
                    <p className="text-sm text-gray-500 mt-1">
                      Estimated delivery: {format(new Date(order.estimatedDelivery), 'MMMM d, yyyy h:mm a')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-2">Order Items</h3>
          <ul className="divide-y divide-gray-200">
            {order.items.map(item => (
              <li key={item.id} className="py-3 flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-medium">
            <p>Total</p>
            <p>${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Delivery Information</h3>
          <div className="bg-gray-50 p-4 rounded">
            <p>{order.deliveryAddress}</p>
            <p className="mt-2 text-sm text-gray-500">
              Contact: {order.contactNumber || 'Not provided'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { format } from 'date-fns';

export default function OrderCard({ order }) {
  const statusColors = {
    received: 'bg-blue-100 text-blue-800',
    preparing: 'bg-yellow-100 text-yellow-800',
    ontheway: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <Link href={`/orders/${order.id}`} legacyBehavior>
      <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Order #{order.id}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a')}
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
            {order.status}
          </span>
        </div>
        <div className="mt-4">
          <p className="font-medium">${order.total.toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </Link>
  );
}
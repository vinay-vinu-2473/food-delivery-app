import { connectDB } from '../../../../utils/db';
import Order from '../../../../models/Order';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { items, total, deliveryAddress, paymentMethod } = req.body;

    // In a real app, you would process payment here with Stripe/PayPal/etc.

    const order = new Order({
      userId: session.user.id,
      items,
      total,
      deliveryAddress,
      paymentMethod,
      status: 'received',
    });

    await order.save();

    // Send real-time update via Socket.IO if needed
    // socket.emit('new-order', order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Error processing order' });
  }
}
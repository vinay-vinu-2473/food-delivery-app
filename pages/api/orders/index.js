import { connectDB } from '../../../utils/db';
import Order from '../../../models/Order';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const orders = await Order.find({ userId: session.user.id }).sort('-createdAt');
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
      }
      break;

    case 'POST':
      try {
        const orderData = {
          ...req.body,
          userId: session.user.id,
          status: 'received',
        };
        const order = new Order(orderData);
        await order.save();
        res.status(201).json(order);
      } catch (error) {
        res.status(400).json({ message: 'Error creating order', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
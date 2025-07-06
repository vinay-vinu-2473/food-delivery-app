import { connectDB } from '../../../../utils/db';
import Order from '../../../../models/Order';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const order = await Order.findOne({ _id: id, userId: session.user.id });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching order', error });
    }
  } else if (req.method === 'PUT') {
    // Only allow admins to update orders
    if (session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: 'Error updating order', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
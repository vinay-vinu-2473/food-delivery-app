import { connectDB } from '../../../../utils/db';
import Food from '../../../../models/Food';
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
      const food = await Food.findById(id);
      if (!food) {
        return res.status(404).json({ message: 'Food not found' });
      }
      res.status(200).json(food);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching food', error });
    }
  } else if (req.method === 'PUT') {
    // Only allow admins to update food
    if (session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      const updatedFood = await Food.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedFood);
    } catch (error) {
      res.status(400).json({ message: 'Error updating food', error });
    }
  } else if (req.method === 'DELETE') {
    // Only allow admins to delete food
    if (session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      await Food.findByIdAndDelete(id);
      res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting food', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
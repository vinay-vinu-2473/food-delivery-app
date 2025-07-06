import { connectDB } from '../../../../utils/db';
import User from '../../../../models/User';
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
      const user = await User.findById(id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  } else if (req.method === 'PUT') {
    try {
      // Only allow users to update their own profile or admins to update any profile
      if (session.user.id !== id && session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      ).select('-password');
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error });
    }
  } else if (req.method === 'DELETE') {
    // Only allow admins to delete users
    if (session.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting user', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
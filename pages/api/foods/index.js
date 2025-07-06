import { connectDB } from '../../../utils/db';
import Food from '../../../models/Food';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const foods = await Food.find({});
        res.status(200).json(foods);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching foods', error });
      }
      break;

    case 'POST':
      try {
        const food = new Food(req.body);
        await food.save();
        res.status(201).json(food);
      } catch (error) {
        res.status(400).json({ message: 'Error creating food', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
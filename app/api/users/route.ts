import User from '@/models/userModel';
import { connectToDB } from '@utils/database';

export const GET = async () => {
  try {
    await connectToDB();

    const users = await User.find({}).populate('_id');

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all users', { status: 500 });
  }
};

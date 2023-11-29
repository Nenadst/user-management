import User from '@models/userModel';
import { connectToDB } from '@utils/database';

export const POST = async (request: Request) => {
  const { firstName, lastName, email, role } = await request.json();
  try {
    await connectToDB();
    const newUser = new User({ firstName, lastName, email, role });

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new user', { status: 500 });
  }
};

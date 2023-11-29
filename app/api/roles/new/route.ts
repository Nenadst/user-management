import Role from '@models/roleModel';
import { connectToDB } from '@utils/database';

export const POST = async (request: Request) => {
  const { name, description } = await request.json();
  try {
    await connectToDB();
    const newRole = new Role({ name, description });

    await newRole.save();
    return new Response(JSON.stringify(newRole), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new role', { status: 500 });
  }
};

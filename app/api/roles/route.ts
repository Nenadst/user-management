import Role from '@/models/roleModel';
import { connectToDB } from '@utils/database';

export const GET = async () => {
  try {
    await connectToDB();

    const roles = await Role.find({}).populate('_id');

    return new Response(JSON.stringify(roles), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all roles', { status: 500 });
  }
};

import User from '@models/userModel';
import { connectToDB } from '@utils/database';

interface Params {
  id: string;
}

export const PATCH = async (
  request: Request,
  { params }: { params: Params },
) => {
  const { firstName, lastName, email, role } = await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response('Prompt not found', { status: 404 });
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.email = email;
    existingUser.role = role;

    await existingUser.save();

    return new Response('Successfully updated the User', { status: 200 });
  } catch (error) {
    return new Response('Error Updating User', { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params },
) => {
  try {
    await connectToDB();

    await User.findByIdAndDelete({ _id: params.id });

    return new Response('User deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting user', { status: 500 });
  }
};

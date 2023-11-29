import Role from '@models/roleModel';
import { connectToDB } from '@utils/database';

interface Params {
  id: string;
}

export const PATCH = async (
  request: Request,
  { params }: { params: Params },
) => {
  const { name, description } = await request.json();

  try {
    await connectToDB();

    const existingRole = await Role.findById(params.id);

    if (!existingRole) {
      return new Response('Prompt not found', { status: 404 });
    }

    existingRole.name = name;
    existingRole.description = description;

    await existingRole.save();

    return new Response('Successfully updated the Roles', { status: 200 });
  } catch (error) {
    return new Response('Error Updating Role', { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params },
) => {
  try {
    await connectToDB();

    await Role.findByIdAndDelete({ _id: params.id });

    return new Response('Role deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting role', { status: 500 });
  }
};

import { Role } from '@app/roles/roles.types';
import { get, patch, post, remove } from '@config/requests';
import { ROLES_API } from '@utils/api';

export const getRoles = (): Promise<Role[]> => {
  return get(ROLES_API);
};

export const createRole = (data: Role): Promise<Role> => {
  return post(`${ROLES_API}/new`, data);
};

export const removeRole = (roleId: string): Promise<Role> => {
  return remove(`${ROLES_API}/${roleId}`);
};

export const updateRole = (roleId: string, data: Role): Promise<Role> => {
  return patch(`${ROLES_API}/${roleId}`, data);
};

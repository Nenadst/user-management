import { User } from '@app/users/users.types';
import { get, patch, post, remove } from '@config/requests';
import { USER_API } from '@utils/api';

export const getUsers = (): Promise<User[]> => {
  return get(USER_API);
};

export const createUser = (data: User): Promise<User> => {
  return post(`${USER_API}/new`, data);
};

export const removeUser = (userId: string): Promise<User> => {
  return remove(`${USER_API}/${userId}`);
};

export const updateUser = (userId: string, data: User): Promise<User> => {
  return patch(`${USER_API}/${userId}`, data);
};

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { Cache } from '@config/cache';
import { User } from '../users.types';
import { getUsers } from '@api-global/users/usersApi';

export const useUsersData = (): UseQueryResult<User[], Error> => {
  return useQuery<User[], Error>([Cache.USERS], () => getUsers());
};

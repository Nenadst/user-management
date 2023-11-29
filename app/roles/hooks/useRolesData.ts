import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { Cache } from '@config/cache';
import { getRoles } from '@api-global/roles/rolesApi';
import { Role } from '@app/roles/roles.types';

export const useRolesData = (): UseQueryResult<Role[], Error> => {
  return useQuery<Role[], Error>([Cache.ROLES], () => getRoles());
};

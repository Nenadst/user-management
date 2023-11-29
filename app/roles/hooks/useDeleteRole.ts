import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeRole } from '@api-global/roles/rolesApi';
import { Cache } from '@config/cache';
import { SUCCESFULLY_DELETED_ROLE } from '@utils/constants';
import { Role } from '../roles.types';

const useDeleteRole = (roleId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => removeRole(roleId), {
    onMutate: async (newRole) => {
      await queryClient.cancelQueries([Cache.ROLES]);
      const previousRoles = queryClient.getQueryData([Cache.ROLES]) as Role[];
      queryClient.setQueryData([Cache.ROLES], (old: Role[] | undefined) => {
        return old?.filter((role: Role) => String(role._id) !== String(roleId));
      });
      return { previousRoles };
    },
    onError: (error: Error, _newRole, context) => {
      queryClient.setQueryData([Cache.ROLES], context?.previousRoles);
      toast.error(error.message);
    },
    onSettled: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      queryClient.invalidateQueries([Cache.ROLES]);
      toast.success(SUCCESFULLY_DELETED_ROLE);
    },
  });

  return { mutate };
};

export { useDeleteRole };

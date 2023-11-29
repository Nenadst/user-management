import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateRole } from '@/api-global/roles/rolesApi';
import { Cache } from '@/config/cache';
import { SUCCESFULLY_UPDATED_ROLE } from '@/utils/constants';
import { Role, UpdateRole } from '../roles.types';

const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync } = useMutation(
    (data: UpdateRole) => updateRole(data.id, data.data),
    {
      onMutate: async (newRole) => {
        await queryClient.cancelQueries([Cache.ROLES]);
        const previousRoles = queryClient.getQueryData([Cache.ROLES]) as Role[];
        queryClient.setQueryData([Cache.ROLES], (old: Role[] | undefined) => {
          return old?.map((role: Role) => {
            return String(role._id) === String(newRole.id)
              ? { ...role, ...newRole.data }
              : role;
          });
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
        toast.success(SUCCESFULLY_UPDATED_ROLE);
      },
    },
  );

  return { mutate, mutateAsync };
};

export { useUpdateRole };

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createRole } from '@api-global/roles/rolesApi';
import { SUCCESFULLY_CREATED_ROLE } from '@utils/constants';
import { Cache } from '@config/cache';
import { Role } from '../roles.types';

const useCreationRole = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createRole, {
    onMutate: async (newRole) => {
      await queryClient.cancelQueries([Cache.ROLES]);
      const previousRoles = queryClient.getQueryData([Cache.ROLES]) as Role[];
      queryClient.setQueryData([Cache.ROLES], (old: Role[] | undefined) => {
        return [...(old || []), { ...newRole, _id: (old?.length || 0) + 1 }];
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
      toast.success(SUCCESFULLY_CREATED_ROLE);
    },
  });

  return { mutate };
};

export { useCreationRole };

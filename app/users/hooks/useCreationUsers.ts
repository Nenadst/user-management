import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { SUCCESFULLY_CREATED_USER } from '@utils/constants';
import { Cache } from '@config/cache';
import { createUser } from '@api-global/users/usersApi';
import { User } from '../users.types';

const useCreationUser = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createUser, {
    onMutate: async (newUser) => {
      await queryClient.cancelQueries([Cache.USERS]);
      const previousUsers = queryClient.getQueryData([Cache.USERS]) as User[];
      queryClient.setQueryData([Cache.USERS], (old: User[] | undefined) => {
        return [
          ...(old || []),
          { ...newUser, _id: (old?.length || 0) + 1, createdAt: new Date() },
        ];
      });
      return { previousUsers };
    },
    onError: (error: Error, _newUser, context) => {
      queryClient.setQueryData([Cache.USERS], context?.previousUsers);
      toast.error(error.message);
    },
    onSettled: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      queryClient.invalidateQueries([Cache.USERS]);
      toast.success(SUCCESFULLY_CREATED_USER);
    },
  });

  return { mutate };
};

export { useCreationUser };

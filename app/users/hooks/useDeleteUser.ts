import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeUser } from '@api-global/users/usersApi';
import { Cache } from '@config/cache';
import { SUCCESFULLY_DELETED_USER } from '@utils/constants';
import { User } from '../users.types';

const useDeleteUser = (userId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => removeUser(userId), {
    onMutate: async (newUser) => {
      await queryClient.cancelQueries([Cache.USERS]);
      const previousUsers = queryClient.getQueryData([Cache.USERS]) as User[];
      queryClient.setQueryData([Cache.USERS], (old: User[] | undefined) => {
        return old?.filter((user: User) => String(user._id) !== String(userId));
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
      toast.success(SUCCESFULLY_DELETED_USER);
    },
  });

  return { mutate };
};

export { useDeleteUser };

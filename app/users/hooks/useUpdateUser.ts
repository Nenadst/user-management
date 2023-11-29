import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateUser } from '@/api-global/users/usersApi';
import { Cache } from '@/config/cache';
import { SUCCESFULLY_UPDATED_USER } from '@/utils/constants';
import { UpdateUser, User } from '../users.types';

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (data: UpdateUser) => updateUser(data.id, data.data),
    {
      onMutate: async (newUser) => {
        await queryClient.cancelQueries([Cache.USERS]);
        const previousUsers = queryClient.getQueryData([Cache.USERS]) as User[];
        queryClient.setQueryData([Cache.USERS], (old: User[] | undefined) => {
          return old?.map((user: User) =>
            String(user._id) === String(newUser.id)
              ? { ...user, ...newUser.data }
              : user,
          );
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
        toast.success(SUCCESFULLY_UPDATED_USER);
      },
    },
  );

  return { mutate };
};

export { useUpdateUser };

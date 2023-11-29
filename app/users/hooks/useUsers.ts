import { useState, useEffect } from 'react';
import { UpdateUser, User } from '../users.types';
import { useUsersData } from './useUsersData';
import { useCreationUser } from './useCreationUsers';
import { useRolesData } from '@app/roles/hooks/useRolesData';
import { useDeleteUser } from './useDeleteUser';
import { useUpdateUser } from './useUpdateUser';

export const useUsers = () => {
  const { data } = useUsersData();
  const { data: roles } = useRolesData();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<User>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { mutate: mutateCreateUser } = useCreationUser();
  const { mutate: mutateDeleteUser } = useDeleteUser(selectedUserId ?? '');
  const { mutate: mutateUpdateUser } = useUpdateUser();

  useEffect(() => {
    const sortedUsers = [...(data || [])].sort((a: User, b: User) => {
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : Number.MIN_SAFE_INTEGER;
      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : Number.MIN_SAFE_INTEGER;

      return dateB - dateA;
    });
    setUsers(sortedUsers);
  }, [data]);

  const isUserProp = true;

  const handleCreateUser = (newUser: User) => {
    mutateCreateUser(newUser);
    setIsCreateModalOpen(false);
  };

  const handleDeleteUser = async (roleId: string) => {
    setSelectedUserId(roleId.toString());
    mutateDeleteUser();
  };

  const handleUpdateUser = (data: UpdateUser) => {
    mutateUpdateUser(data);
    setIsEditModalOpen(false);
  };

  const handleUpdateUserId = (dataId: number) => {
    setSelectedUserId(dataId.toString());
  };

  const handleOpenEditModal = (role: User) => {
    setIsEditModalOpen(true);
    setSelectedRole(role);
  };

  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleCloseConfirmationModal = () => setIsConfirmationModalOpen(false);

  return {
    users,
    roles,
    isUserProp,
    selectedRole,
    selectedUserId,
    setSelectedUserId,
    isEditModalOpen,
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleUpdateUserId,
    handleOpenEditModal,
    handleCloseEditModal,
    handleCloseCreateModal,
    handleCloseConfirmationModal,
  };
};

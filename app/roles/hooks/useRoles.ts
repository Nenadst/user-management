import { useState, useEffect } from 'react';
import { useRolesData } from './useRolesData';
import { Role, UpdateRole } from '../roles.types';
import { useCreationRole } from './useCreationRoles';
import { useDeleteRole } from './useDeleteRole';
import { useUpdateRole } from './useUpdateRole';

export const useRoles = () => {
  const { data } = useRolesData();
  const [roles, setRoles] = useState<Role[]>(data || []);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortedRoles, setSortedRoles] = useState<Role[]>([]);

  const { mutate: mutateCreateRole } = useCreationRole();
  const { mutate: mutateDeleteRole } = useDeleteRole(selectedRoleId ?? '');
  const { mutate: mutateUpdateRole } = useUpdateRole();

  useEffect(() => {
    const sorted = [...roles].sort((a, b) =>
      (a.name ?? '').localeCompare(b.name ?? ''),
    );
    setSortedRoles(sorted);
  }, [roles]);

  useEffect(() => {
    setRoles(data || []);
  }, [data]);

  const handleCreateRole = (newRole: Role) => {
    const isDuplicateName = roles.some((role) => role.name === newRole.name);

    if (isDuplicateName) {
      console.error('Role with the same name already exists.');
      return;
    }

    mutateCreateRole(newRole);
    setIsCreateModalOpen(false);
  };

  const handleDeleteRole = async (roleId: string) => {
    setSelectedRoleId(roleId.toString());
    mutateDeleteRole();
  };

  const handleUpdateRole = (data: UpdateRole) => {
    mutateUpdateRole(data);
    setIsEditModalOpen(false);
  };

  const handleUpdateRoleId = (roleId: number) => {
    setSelectedRoleId(roleId.toString());
  };

  const handleOpenEditModal = (role: Role) => {
    setIsEditModalOpen(true);
    setSelectedRole(role);
  };

  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleCloseConfirmationModal = () => setIsConfirmationModalOpen(false);

  return {
    selectedRole,
    selectedRoleId,
    setSelectedRoleId,
    isEditModalOpen,
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    sortedRoles,
    handleCreateRole,
    handleDeleteRole,
    handleUpdateRole,
    handleUpdateRoleId,
    handleOpenEditModal,
    handleCloseEditModal,
    handleCloseCreateModal,
    handleCloseConfirmationModal,
  };
};

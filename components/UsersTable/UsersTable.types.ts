import { Role } from '@/app/roles/roles.types';

export interface RolesTableProps {
  roles: Role[];
  handleDeleteRole: (role: string) => void;
  handleOpenModal: (role: Role) => void;
  handleUpdateRoleId: (roleId: number) => void;
  isConfirmationModalOpen: boolean;
  setIsConfirmationModalOpen: (value: boolean) => void;
  handleCloseConfirmationModal: () => void;
  selectedRoleId: string;
  setSelectedRoleId: (value: string) => void;
  isDeletedProp?: boolean;
}

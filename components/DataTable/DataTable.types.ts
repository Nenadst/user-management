import { Role } from '@/app/roles/roles.types';

export interface Data {
  _id?: number;
  name?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface RolesTableProps {
  data: Data[];
  handleDeleteData: (userId: string) => void;
  handleOpenModal: (role: Role) => void;
  handleUpdateDataId: (roleId: number) => void;
  isConfirmationModalOpen: boolean;
  setIsConfirmationModalOpen: (value: boolean) => void;
  handleCloseConfirmationModal: () => void;
  selectedDataId: string;
  setSelectedDataId: (value: string) => void;
  isUserProp?: boolean;
}

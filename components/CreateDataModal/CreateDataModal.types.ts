import { Role } from '@/app/roles/roles.types';

interface ValidationSchema {
  type: string;
}
export interface CreateRoleDataProps {
  handleCreateData: (role: Role) => void;
  handleCloseModal: () => void;
  isUserProp?: boolean;
  roles?: Role[];
  validationSchema: ValidationSchema;
}

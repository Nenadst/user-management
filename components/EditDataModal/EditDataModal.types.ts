import { Role } from '@app/roles/roles.types';
import { UpdateUser } from '@app/users/users.types';

interface ValidationSchema {
  type: string;
}

export interface EditRoleModalProps {
  handleCloseModal: () => void;
  selectedData: Data;
  selectedDataId: string;
  handleMutation?: (data: UpdateUser) => void;
  isUserProp?: boolean;
  roles?: Role[];
  validationSchema: ValidationSchema;
}

interface DataProps {
  id?: string;
  data: Data;
}

export interface Data {
  name?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

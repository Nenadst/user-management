export interface Role {
  _id?: number;
  name?: string;
  description?: string;
}

export interface UpdateRole {
  id: string;
  data: Role;
}

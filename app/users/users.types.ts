export interface User {
  _id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
}

export interface UpdateUser {
  id: string;
  data: User;
}

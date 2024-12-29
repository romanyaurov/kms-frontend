export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  post?: string;
  skills?: string;
}

export type UserResponse = {
  user: User;
};

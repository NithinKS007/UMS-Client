export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password?:string;
  isBlocked: boolean;
  role: UserRole;
  dateOfBirth?: Date;
  address?: string;
  imageUrl?:string;
  designation?:string,
  companyName?:string,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  isBlocked: boolean;
  role: UserRole;
  dateOfBirth?: Date;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AdminState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  search: string,
  sort: string,
  filter: string,
  direction:string
}

export interface SearchState {
  results: User[];
  isLoading: boolean;
  error: string | null;
}

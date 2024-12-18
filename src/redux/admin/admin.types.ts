import { User } from "../auth/auth.types";

export interface AdminState {
  users: User[] | [];
  isLoading: boolean;
  error: string | null;
  search: string;
  sort: string;
  filter: string;
  direction: string;
  userDetails: User |{};
}

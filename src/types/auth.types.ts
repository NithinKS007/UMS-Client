export interface UserAuthFormData {
  fname?: string;
  lname?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface Errors {
  fname?: string;
  lname?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export type SignState = "sign in" | "sign up";
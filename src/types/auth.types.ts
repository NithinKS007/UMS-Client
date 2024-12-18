export interface UserAuthFormData {
  fname?: string;
  lname?: string;
  email: string;
  phone?: string;
  password?: string;
  address?:string
  designation?:string
  companyName?:string
  dateOfBirth?:string,
  imageUrl?:string,
  role?:string
  
}

export interface Errors {
  fname?: string;
  lname?: string;
  email?: string;
  phone?: string;
  password?: string;
  address?:string
  designation?:string
  companyName?:string
  imageUrl?:string,
  dateOfBirth?:string,
  role?:string
}

export type SignState = "sign in" | "sign up";
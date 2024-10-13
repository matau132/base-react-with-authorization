export enum UserRole {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  ALL = "*",
}

export interface UserInfo {
  type?: string;
  id?: string;
  attributes?: {
    user?: number;
    role?: UserRole;
  };
}

export interface Form {
  name: string;
  email: string;
  [key: string]: any;
  password: string;
  confirmPassword: string;
  publicProfile: boolean;
  position: {
    frontendDeveloper: string;
    backendDeveloper: string;
  };
}

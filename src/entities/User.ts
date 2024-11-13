export default interface User {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  job?: string;
  location?: string;
  about?: string;
  phone?: string;
  website?: string;
  created_projects?: number[];
  followed_projects?: number[];
  participated_projects?: number[];
  is_superuser?: boolean;
}

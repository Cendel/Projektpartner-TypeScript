export default interface User {
  id: string;
  email: string;
  name: string;
  job?: string; // Nullable
  location?: string; // Nullable
  about?: string; // Nullable
  phone?: string; // Nullable
  website?: string; // Nullable
  is_superuser: string;
  followed_projects: string;
  participated_projects: string;
  created_projects: string;
}
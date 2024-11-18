export default interface User {
  id: string;
  email: string;
  name: string;
  job: string;
  location: string;
  about: string;
  phone: string;
  website: string;
  is_superuser: string;
  followed_projects: number[];
  participated_projects: number[];
  created_projects: number[];
}

export default interface UserUpdateRequest {
  name: string;
  job?: string | null;
  location?: string | null;
  about?: string | null;
  phone?: string;
  website?: string;
}

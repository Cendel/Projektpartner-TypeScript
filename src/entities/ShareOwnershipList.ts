export default interface ShareOwnershipList {
  id: number;
  user: number;
  user_name: string;
  project: number;
  project_title: string;
  shares: number;
  share_value: string; // Assuming this is a decimal, using string for precision
}

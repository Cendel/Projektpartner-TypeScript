export default interface ProjectsListForTables {
  id: number;
  projectTitle: string;
  estimatedImplementationDate: string; // ISO 8601 format date string, e.g., "2024-11-16T00:00:00Z"
  createdBy: number;
  createdByName: string;
}

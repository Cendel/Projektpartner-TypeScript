export default interface ProjectCreateRequest {
  projectTitle: string;
  projectPlace: string;
  estimatedImplementationDate: string;
  slogan: string;
  about: string;
  goal: string;
  support: string;
  shortDesc: string;
  longDesc: string;
  projectImage: File;
  createdBy: number;
  projectValue: string;
  totalShares: number;
  shareValue: string;
  maxSharesPerPerson: number;
}

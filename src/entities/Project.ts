export default interface Project {
  id: number;
  projectStatus: boolean;
  adminAdvice: boolean;
  projectTitle: string;
  projectPlace: string;
  estimatedImplementationDate: string;
  slogan: string;
  about: string;
  goal: string;
  support: string;
  shortDesc: string;
  longDesc: string;
  projectImage: string;
  createdBy: number;
  createdByName?: string;
  createdDate: string;
  projectValue: string;
  totalShares: number;
  shareValue: string;
  maxSharesPerPerson: number;
  sharesTaken: number;
  followerList: number[];
}

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
  createdByName: string;
  createdDate: string;
  projectValue: number;
  totalShares: number;
  shareValue: string;
  maxSharesPerPerson: number;
  sharesTaken: number;
  followerList: number[];
}

interface ProjectCardProps {
  projectPlace: string;
  estimatedImplementationDate: string;
  slogan: string;
  shortDesc: string;
  projectImage: string;
  createdByName: string;
  createdDate: string;
  sharesTaken: number;
  shareValue: string;
  projectValue: number;
  totalShares: number;
}
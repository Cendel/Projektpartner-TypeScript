import { Button, ProgressBar } from "react-bootstrap";
import { TiLocationOutline } from "react-icons/ti";
import "./projects.scss";
import Project from "../../../entities/Project";
import {
  calculateDaysUntilImplementation,
  calculateTotalDays,
} from "../../../helpers/functions/date-calculations";

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

export const mapProjectToCardProps = (project: Project): ProjectCardProps => ({
  projectPlace: project.projectPlace,
  estimatedImplementationDate: project.estimatedImplementationDate,
  slogan: project.slogan,
  shortDesc: project.shortDesc,
  projectImage: project.projectImage,
  createdByName: project.createdByName,
  createdDate: project.createdDate,
  sharesTaken: project.sharesTaken,
  shareValue: project.shareValue,
  projectValue: project.projectValue,
  totalShares: project.totalShares,
});

const ProjectCard = ({ ...ProjectCardProps }: ProjectCardProps) => {
  const {
    projectPlace,
    estimatedImplementationDate,
    slogan,
    shortDesc,
    projectImage,
    createdByName,
    createdDate,
    sharesTaken,
    shareValue,
    projectValue,
    totalShares,
  } = ProjectCardProps;

  const daysUntilImplementation = calculateDaysUntilImplementation(
    estimatedImplementationDate
  );
  const totalDays = calculateTotalDays(
    estimatedImplementationDate,
    createdDate
  );

  return (
    <div className="project-card">
      <div className="image">
        <img src={projectImage} alt="" className="img-fluid" />
      </div>
      <div className="details">
        <h5>{slogan}</h5>

        <div className="desc">{shortDesc}</div>
        <div className="button-wrapper">
          <Button variant="primary">
            erstellt von {createdByName.substring(0, 20)}
          </Button>
        </div>
        <div className="progress">
          <ProgressBar
            striped={false}
            variant="success"
            now={totalDays - daysUntilImplementation}
            max={totalDays}
            label={""}
            className="progress-bar-card"
          />
        </div>
        <div className="progress-info">
          <div className="location">
            <div>
              <TiLocationOutline />
            </div>
            <h5>{projectPlace.substring(0, 25)}</h5>
          </div>
          <h5 className="under-progress">
            <span>noch</span>{" "}
            {daysUntilImplementation > 0 ? daysUntilImplementation : 0} Tage
          </h5>
        </div>

        <div className="progress">
          <ProgressBar
            className="progress-bar-card"
            animated={false}
            striped={true}
            now={sharesTaken}
            max={totalShares}
            label={""}
            variant={"success"}
          />
        </div>
        <div className="progress-info">
          <h5 className="under-progress" style={{ textAlign: "left" }}>
            {(sharesTaken * Number(shareValue)).toLocaleString()} €
          </h5>

          <h5 className="under-progress">{projectValue.toLocaleString()} €</h5>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

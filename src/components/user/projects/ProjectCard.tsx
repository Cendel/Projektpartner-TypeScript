import { Button, ProgressBar } from "react-bootstrap";
import { TiLocationOutline } from "react-icons/ti";
import "./projects.scss";

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

const ProjectCard = (props: ProjectCardProps) => {
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
  } = props;

  const daysUntilImplementation = Math.round(
    (new Date(estimatedImplementationDate).getTime() - new Date().getTime()) /
      86400000
  );

  const totalDays = Math.round(
    (new Date(estimatedImplementationDate).getTime() -
      new Date(createdDate).getTime()) /
      86400000
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
            now={new Date(totalDays - daysUntilImplementation).getTime()}
            max={new Date(totalDays).getTime()}
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

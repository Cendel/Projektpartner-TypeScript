import { Button, Container, ProgressBar } from "react-bootstrap";
import Project from "../../../entities/Project";

interface Props {
  project: Project;
  isParticipatedProjectsIncludes: boolean;
}

const SupportSection = ({ project, isParticipatedProjectsIncludes }: Props) => {
  const handleSupportClick = () => {
    const investContainer = document.querySelector(
      ".invest-container"
    ) as HTMLElement;
    investContainer.style.display = "block";
    window.scrollBy(0, 250);
  };

  return (
    <Container>
      <div className="support">
        <div className="left">
          <ProgressBar
            className="progress"
            animated={false}
            striped={true}
            now={project.sharesTaken}
            max={project.totalShares}
            label={""}
            variant={"success"}
          />
          <div className="numeric-info">
            <div>
              <h5>
                {(
                  project.sharesTaken * Number(project.shareValue)
                ).toLocaleString()}
                €
              </h5>
              <span>Finanzierung bereitgestellt</span>
            </div>
            <div>
              <h5>{project.totalShares - project.sharesTaken}</h5>
              <span>Aktien noch verfügbar</span>
            </div>
            <div>
              <h5>{project.projectValue.toLocaleString()} €</h5>
              <span>Finanzierungsziel</span>
            </div>
          </div>
        </div>
        <div className="right">
          {isParticipatedProjectsIncludes ? (
            <Button className="participated" onClick={handleSupportClick}>
              Unterstützt
            </Button>
          ) : (
            <Button onClick={handleSupportClick}>Unterstützen</Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SupportSection;

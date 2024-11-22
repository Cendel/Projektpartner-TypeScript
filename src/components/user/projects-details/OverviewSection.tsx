import { Button, Container, ProgressBar } from "react-bootstrap";
import { TiLocationOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { convertCurrentDateToUserFormat } from "../../../helpers/functions/date-time";
import { useEffect, useState } from "react";
import User from "../../../entities/User";
import Project from "../../../entities/Project";
import {
  calculateDaysUntilImplementation,
  calculateTotalDays,
} from "../../../helpers/functions/date-calculations";
import { updateProjectFollowerList } from "../../../api/project-service";

interface Props {
  user: User;
  project: Project;
}

const OverviewSection = ({ user, project }: Props) => {
  const followed_projects = Object.values(user.followed_projects).map(
    (value) => value
  );

  const isFollowedProjectsIncludes = followed_projects.includes(project.id);
  const [isFollowing, setIsFollowing] = useState(isFollowedProjectsIncludes);

  useEffect(() => {
    setIsFollowing(isFollowedProjectsIncludes);
  }, [isFollowedProjectsIncludes]);

  const daysUntilImplementation = calculateDaysUntilImplementation(
    project.estimatedImplementationDate
  );
  const totalDays = calculateTotalDays(
    project.estimatedImplementationDate,
    project.createdDate
  );

  const handleFollowClick = async () => {
    try {
      updateProjectFollowerList(project.id);
      setIsFollowing(!isFollowing);
    } catch (err) {
    } finally {
    }
  };

  return (
    <Container className="project-details">
      <div className="title">
        <h5>{project.projectTitle}</h5>
      </div>
      <div className="details-box">
        <div className="first-part">
          <div className="info-left">{project.longDesc}</div>
          <div className="info-right">
            <div className="createdByName">
              <span> erstellt von</span>
              <h5>
                <Link to={`/profile/${project.createdBy}`}>
                  {project.createdByName.substring(0, 20)}
                </Link>
              </h5>
            </div>
            <div className="location">
              <div>
                <TiLocationOutline />
              </div>
              <h5>{project.projectPlace.substring(0, 20)}</h5>
            </div>
          </div>
        </div>
        <div className="second-part">
          <div className="left">
            <ProgressBar
              className="progress"
              animated={false}
              now={totalDays - daysUntilImplementation - 0}
              max={totalDays}
              label={""}
              variant={"success"}
            />
            <div className="numeric-info">
              <div>
                <h5>{convertCurrentDateToUserFormat(project.createdDate)}</h5>
                <span>Startdatum</span>
              </div>
              <div>
                <h5>
                  {convertCurrentDateToUserFormat(
                    project.estimatedImplementationDate
                  )}
                </h5>
                <span>Fertigstellungsdatum</span>
              </div>
            </div>
          </div>
          <div className="right">
            {isFollowing ? (
              <Button className="followed" onClick={handleFollowClick}>
                Verfolgt
              </Button>
            ) : (
              <Button onClick={handleFollowClick}>Folgen</Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OverviewSection;

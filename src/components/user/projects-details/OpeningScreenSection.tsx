import Project from "../../../entities/Project";
import imageRounded from "../../../assets/img/rounded-bottom.svg";

interface Props {
  project: Project;
}

const OpeningScreenSection = ({ project }: Props) => {
  return (
    <>
      <div>
        <img
          src={project.projectImage}
          alt={project.projectTitle}
          className="project-screen-image"
        />
      </div>
      <div className="project-details-container">
        <div>
          <img src={imageRounded} alt="" className="imageRounded" />
        </div>
      </div>
      <div className="main-title">
        <h1>{project.projectTitle}</h1>
        <h4>{project.shortDesc}</h4>
      </div>
    </>
  );
};

export default OpeningScreenSection;

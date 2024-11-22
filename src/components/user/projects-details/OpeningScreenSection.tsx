import Project from "../../../entities/Project";
import imageRounded from "../../../assets/img/rounded-bottom.svg";
import { useEffect, useState } from "react";

interface Props {
  project: Project;
}

const OpeningScreenSection = ({ project }: Props) => {
  const [scrollY, setScrollY] = useState(0);

  //handles opacity over scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageOpacity = {
    opacity: `0.${scrollY < 450 ? 999 - scrollY : 549}`,
  };

  return (
    <>
      <div>
        <img
          src={project.projectImage}
          alt={project.projectTitle}
          className="project-screen-image"
          style={imageOpacity}
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

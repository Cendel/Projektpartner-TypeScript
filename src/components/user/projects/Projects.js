import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Spacer from "../../common/spacer/Spacer";
import ProjectCard from "./ProjectCard";
import "./projects.scss";
import { Link } from "react-router-dom";
import { getProjectsByStatus } from "../../../api/project-service";
import Loading from "../../common/loading/Loading";
import SectionHeader from "../common/section-header/SectionHeader";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadData = async () => {
    try {
      const result = await getProjectsByStatus(true);
      setProjects(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleShowMore = () => {
    setVisibleProjects((prevVisibleProjects) => prevVisibleProjects + 6);
  };

  const sortedProjects = projects.sort((a, b) => b.id - a.id);
  const visibleProjectsList = sortedProjects.slice(0, visibleProjects);

  return (
    <Container>
      <Spacer height={50} />
      <div className="project-group">
        <SectionHeader title="Projekte" />
        {visibleProjectsList.length < 1 && (
          <div>Auf dieser Seite sind keine Projekte verfügbar.</div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <>
            <Row className="g-5 groupRow">
              {visibleProjectsList.map((project) => (
                <Col
                  key={project.id}
                  md={6}
                  lg={4}
                  as={Link}
                  to={`/projects/${project.id}`}
                  className="groupCol"
                >
                  <ProjectCard {...project} />
                </Col>
              ))}
            </Row>
            {projects.length > visibleProjects && (
              <div className="more-button-div g-5">
                <Button className="more-button" onClick={handleShowMore}>
                  mehr anzeigen
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <Spacer />
    </Container>
  );
};

export default Projects;

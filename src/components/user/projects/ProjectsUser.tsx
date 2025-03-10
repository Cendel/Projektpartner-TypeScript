import { useEffect, useState, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Spacer from "../../common/spacer/Spacer";
import ProjectCard, { mapProjectToCardProps } from "./ProjectCard";
import "./projects.scss";
import { Link } from "react-router-dom";
import { getProjectsByIds } from "../../../api/project-service";
import Loading from "../../common/loading/Loading";
import SectionHeader from "../common/section-header/SectionHeader";
import { useAppSelector } from "../../../store/hooks";
import Project from "../../../entities/Project";

const ProjectsUser = () => {
  const createdProjects = useAppSelector(
    (state) => state.auth.user!.created_projects // Non-null Assertion
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadData = useCallback(async () => {
    try {
      const result = await getProjectsByIds(createdProjects);
      setProjects(result.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [createdProjects]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleShowMore = () => {
    setVisibleProjects((prevVisibleProjects) => prevVisibleProjects + 6);
  };

  const sortedProjects = projects.sort((a, b) => b.id - a.id);
  const visibleProjectsList = sortedProjects.slice(0, visibleProjects);

  return (
    <Container>
      <Spacer height={50} />
      <div className="project-group">
        <SectionHeader title="Meine Projekte" />
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
                  <ProjectCard {...mapProjectToCardProps(project)} />
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

export default ProjectsUser;

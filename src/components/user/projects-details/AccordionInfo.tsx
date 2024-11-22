import { Container, Accordion } from "react-bootstrap";
import Project from "../../../entities/Project";

interface Props {
  project: Project;
}

const AccordionInfo = ({ project }: Props) => {
  return (
    <Container>
      <Accordion className="accordion-info" alwaysOpen>
        <Accordion.Item eventKey="0" className="item">
          <Accordion.Header className="ada">
            <h5>Worum geht es in dem Projekt?</h5>
          </Accordion.Header>
          <Accordion.Body>{project.about}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h5>Was sind die Ziele und wer ist die Zielgruppe?</h5>
          </Accordion.Header>
          <Accordion.Body>{project.goal}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h5>Wer steht hinter dem Projekt?</h5>
          </Accordion.Header>
          <Accordion.Body>{project.support}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default AccordionInfo;

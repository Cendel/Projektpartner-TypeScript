import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/admin/common/Sidebar";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const AdminTemplate = ({ children }: props) => {
  return (
    <Container fluid>
      <Row>
        <Col lg={3} xxl={2} className="p-0">
          <Sidebar />
        </Col>
        <Col lg={9} xxl={10} className="p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTemplate;

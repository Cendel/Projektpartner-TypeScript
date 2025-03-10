import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { listMessages } from "../../../api/contact-service";
import { toast } from "../../../helpers/functions/swal";
import SectionHeader from "../../user/common/section-header/SectionHeader";
import { convertCurrentDateToUserFormat } from "../../../helpers/functions/date-time";
import MessageOverview from "../../../entities/MessageOverview";
import Loading from "../../common/loading/Loading";

const paginationConfig = {
  paginationPerPage: 10,
  paginationRowsPerPageOptions: [10, 20, 30],
};

interface Column {
  name: string;
  selector: (row: MessageOverview) => string;
  sortable: boolean;
}

const columns: Column[] = [
  {
    name: "Name",
    selector: (row) => row.senderName,
    sortable: true,
  },
  {
    name: "Betreff",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Datum",
    selector: (row) => convertCurrentDateToUserFormat(row.created_date),
    sortable: true,
  },
];

const ContactMessages = () => {
  const [messages, setMessages] = useState<MessageOverview[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await listMessages();
        setMessages(response.data);
      } catch (err) {
        toast("Fehler beim Laden der Nachrichten", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleRowClicked = (row: MessageOverview) => {
    navigate(`${row.id}`);
  };

  return (
    <Container>
      <SectionHeader title="Nachrichten" />
      <Row>
        <Col>
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={columns}
              data={messages}
              progressPending={loading}
              pagination
              paginationPerPage={paginationConfig.paginationPerPage}
              paginationRowsPerPageOptions={
                paginationConfig.paginationRowsPerPageOptions
              }
              onRowClicked={handleRowClicked}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ContactMessages;

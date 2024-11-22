import "./projectDetails.scss";
import { Container } from "react-bootstrap";
import Project from "../../../entities/Project";

interface Props {
  isParticipatedProjectsIncludes: boolean;
  project: Project;
  handleInvestSubmitClick(): Promise<void>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  feedback: string;
}

const InvestSection = ({
  isParticipatedProjectsIncludes,
  project,
  handleInvestSubmitClick,
  inputValue,
  setInputValue,
  feedback,
}: Props) => {
  return (
    <Container className="invest-container" style={{ display: "none" }}>
      <div className="invest">
        {isParticipatedProjectsIncludes ? (
          <>
            <p>
              In diesem Projekt besitzen Sie bereits Aktien. Sie können Ihr
              Profil besuchen, um Ihre Aktieninformationen einzusehen.
            </p>
            <p>
              Für Aktualisierungen oder Stornierungen Ihrer Aktien können Sie
              Kontakt mit uns aufnehmen.
            </p>
          </>
        ) : (
          <>
            <p>Aktienwert:</p>
            <p>
              <span>{project.shareValue} €</span>
            </p>
            <p>Die maximale Anzahl an Anteilen, die erworben werden können:</p>
            <p>
              <span>{project.maxSharesPerPerson}</span>
            </p>

            <p>Anzahl verfügbarer Aktien:</p>
            <p>
              <span>{project.totalShares - project.sharesTaken}</span>
            </p>
            <p>Geben Sie die Anzahl der Aktien ein, die Sie kaufen möchten</p>
            <div>
              <div className="input">
                <form
                  onSubmit={(event) => {
                    handleInvestSubmitClick();
                    event.preventDefault();
                  }}
                >
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                  />
                  <button type="submit">Anfrage senden</button>
                </form>
                {feedback && <p>{feedback}</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default InvestSection;

import { useEffect, useState, useCallback } from "react";
import "./downloadSection.scss";
import {
  AiOutlineFileText,
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineFile,
  AiOutlineFileZip,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { useAppSelector } from "../../../store/hooks";
import { question, toast } from "../../../helpers/functions/swal";
import {
  createAttachment,
  deleteAttachment,
  listAttachments,
} from "../../../api/project-service";
import Attachment from "../../../entities/Attachment";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";
import {
  imageExtensions,
  textExtensions,
  zipExtensions,
} from "../../../helpers/attachmentExtensions";
import { Container } from "react-bootstrap";

interface Props {
  createdBy: number;
  projectId: number;
}

const DownloadSection = ({ createdBy, projectId }: Props) => {
  const user = useAppSelector((state) => state.auth.user!); // Non-null Assertion
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isAdminOrOwner = Number(user.id) === createdBy || user.is_superuser;

  const loadData = useCallback(async () => {
    try {
      const result = await listAttachments(projectId);
      setAttachments(result.data);
    } catch (err) {
      const { message, type } = handleAxiosError(err);
      toast(message, type);
    } finally {
    }
  }, [projectId]);

  const removeAttachment = async (fileId: number, file_name: string) => {
    question(
      `Möchten Sie fortfahren?`,
      `Die Datei ${file_name} wird gelöscht.`
    ).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteAttachment(fileId);
          setAttachments(
            attachments.filter((attachment) => attachment.id !== fileId)
          );
        } catch (err) {
          toast("Das Löschen konnte nicht durchgeführt werden", "warning");
        } finally {
        }
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("project", projectId.toString());
      formData.append("file", selectedFile);
      try {
        await createAttachment(formData);
        loadData();
        setSelectedFile(null);
      } catch (err) {
        toast("Dateiupload fehlgeschlagen.", "error");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container>
      <div>
        <div className="download-media">
          <div className="head">
            <span>
              <IoCloudDownloadSharp />
            </span>
            <h5>PROJEKTMEDIEN</h5>
          </div>

          <div className="ul-div">
            <ul>
              {attachments.map((file) => (
                <li key={file.id}>
                  {file.file_extension === ".pdf" ? (
                    <AiOutlineFilePdf />
                  ) : imageExtensions.includes(file.file_extension) ? (
                    <AiOutlineFileImage />
                  ) : textExtensions.includes(file.file_extension) ? (
                    <AiOutlineFileText />
                  ) : zipExtensions.includes(file.file_extension) ? (
                    <AiOutlineFileZip />
                  ) : (
                    <AiOutlineFile />
                  )}
                  <a href={file.file} target="_blank" rel="noreferrer">
                    {file.file_name.substring(0, 50)}
                  </a>
                  {isAdminOrOwner && (
                    <button
                      className="delete-button"
                      onClick={() => removeAttachment(file.id, file.file_name)}
                    >
                      Löschen
                    </button>
                  )}
                </li>
              ))}
              {isAdminOrOwner && (
                <li>
                  <AiOutlineFileAdd />
                  <label className="upload-button add-button">
                    <input type="file" onChange={handleFileChange} />
                    Datei auswählen
                  </label>
                  <span>{selectedFile && selectedFile.name}</span>

                  <button className="upload-button" onClick={handleFileUpload}>
                    Datei hinzufügen
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DownloadSection;

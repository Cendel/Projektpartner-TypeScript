import React, { useEffect, useState, useCallback } from "react";
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

const DownloadSection = ({ createdBy, projectId }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [attachments, setAttachments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const isAdminOrOwner = user.id === createdBy || user.is_superuser;
  console.log();
  const textExtensions = [
    ".doc",
    ".docx",
    ".odt",
    ".txt",
    ".csv",
    ".md",
    ".html",
    ".log",
    ".rtf",
  ];
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".raw",
    ".webp",
    ".ico",
  ];
  const zipExtensions = [
    ".zip",
    ".zipx",
    ".7z",
    ".rar",
    ".tar.gz",
    ".tgz",
    ".tar.bz2",
    ".tar.xz",
  ];

  const loadData = useCallback(async () => {
    try {
      const result = await listAttachments(projectId);
      setAttachments(result.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, [projectId]);

  const removeAttachment = async (fileId, file_name) => {
    question(
      `Die Datei ${file_name} wird gelöscht.`,
      `Möchten Sie fortfahren?`
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("project", projectId);
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
            {attachments.map((file, index) => (
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
  );
};

export default DownloadSection;

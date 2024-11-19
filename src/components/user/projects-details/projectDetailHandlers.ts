import { NavigateFunction } from "react-router-dom";
import { deleteProject } from "../../../api/project-service";
import { question, toast } from "../../../helpers/functions/swal";

export const removeProject = async (
  navigate: NavigateFunction,
  projectId: number
) => {
  question(
    "Sind Sie sicher, dass Sie löschen möchten?",
    "Das können Sie nicht rückgängig machen!"
  ).then((firstResult) => {
    if (firstResult.isConfirmed) {
      question(
        "Alle Inhalte und Mediendateien, die zu diesem Projekt gehören, werden gelöscht.",
        "Möchten Sie fortfahren und das Projekt endgültig löschen?"
      ).then((secondResult) => {
        if (secondResult.isConfirmed) {
          try {
            deleteProject(projectId);
            toast(
              "Das Projekt wurde erfolgreich gelöscht.",
              "success",
              10000,
              true
            );
            navigate("/");
          } catch (err) {
            toast("Das Löschen konnte nicht durchgeführt werden", "warning");
          } finally {
          }
        }
      });
    }
  });
};

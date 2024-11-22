import { NavigateFunction } from "react-router-dom";
import { deleteProject, getProject } from "../../../api/project-service";
import { question, toast } from "../../../helpers/functions/swal";
import { sendMessage } from "../../../api/contact-service";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";
import Project from "../../../entities/Project";
import User from "../../../entities/User";

export const loadProjectData = async (
  projectId: number,
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  try {
    const result = await getProject(projectId);
    setProject(result.data);
  } catch (err) {
    toast(handleAxiosError(err).message, "error");
    navigate("/page-not-found");
  } finally {
    setLoading(false);
  }
};

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

export const handleInvestSubmit = async (
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setFeedback: React.Dispatch<React.SetStateAction<string>>,
  user: User,
  project?: Project
) => {
  if (project)
    if (
      Number(inputValue) <= 0 ||
      Number(inputValue) > project.totalShares - project.sharesTaken ||
      Number(inputValue) > project.maxSharesPerPerson
    ) {
      setFeedback("Bitte geben Sie eine gültige Nummer ein.");
    } else {
      const values = {
        sender: user.id,
        title: "KAUFANFRAGE",
        text: `
        Der Benutzer ${user.name} mit der ID-Nummer ${user.id} fordert ${inputValue} Anteile an dem Projekt  ${project.projectTitle} mit der ID ${project.id} an.

        Projektinformationen:
        - Projekttitel: ${project.projectTitle}
        - Projekt-ID: ${project.id}
      `,
      };
      setInputValue("");
      try {
        await sendMessage(values);
        const investContainer = document.querySelector(
          ".invest-container"
        ) as HTMLElement;
        investContainer.style.display = "none";
        toast("Ihre Anfrage wurde erfolgreich gesendet.", "success");
      } catch (err) {
        alert(handleAxiosError(err));
      }
      setFeedback("");
    }
};

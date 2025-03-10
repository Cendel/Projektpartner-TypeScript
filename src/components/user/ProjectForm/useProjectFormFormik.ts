import { useNavigate } from "react-router-dom";
import { createProject, updateProject } from "../../../api/project-service";
import { formatDateToYYYYMMDD } from "../../../helpers/functions/date-time";
import { toast } from "../../../helpers/functions/swal";
import { useFormik } from "formik";
import { projectFormValidationSchema } from "../../../helpers/validationSchemas";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import Project from "../../../entities/Project";
import ProjectCreateUpdateRequest from "../../../entities/ProjectCreateUpdateRequest";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";

export const mapProjectToCreateUpdateRequest = (
  project: Project | ProjectCreateUpdateRequest,
  edit: boolean,
  userId: String
): ProjectCreateUpdateRequest => {
  return {
    projectTitle: project.projectTitle || "",
    projectPlace: project.projectPlace || "",
    estimatedImplementationDate: edit
      ? formatDateToYYYYMMDD(project.estimatedImplementationDate)
      : "",
    slogan: project.slogan || "",
    about: project.about || "",
    goal: project.goal || "",
    support: project.support || "",
    shortDesc: project.shortDesc || "",
    longDesc: project.longDesc || "",
    createdBy: (edit && project.createdBy) || Number(userId),
    projectValue: project.projectValue || 0,
    totalShares: project.totalShares || 0,
    shareValue: project.shareValue || "",
    maxSharesPerPerson: project.maxSharesPerPerson || 0,
  };
};

interface UseProjectFormFormikProps {
  project: Project | ProjectCreateUpdateRequest;
  projectId: number;
  edit: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useProjectFormFormik = ({
  project,
  projectId,
  edit,
  setLoading,
}: UseProjectFormFormikProps) => {
  const user = useAppSelector((state) => state.auth.user!); // Non-null Assertion
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const initialValues: ProjectCreateUpdateRequest = edit
    ? mapProjectToCreateUpdateRequest(project, edit, user.id)
    : project;

  const onSubmit = async (values: ProjectCreateUpdateRequest) => {
    values.shareValue = (values.projectValue / values.totalShares).toFixed(2);
    setLoading(true);
    if (edit) {
      try {
        const formData = new FormData();
        for (const key in values) {
          const value = values[key as keyof ProjectCreateUpdateRequest];
          formData.append(key, String(value));
        }
        if (image) {
          formData.append("projectImage", image);
        }
        await updateProject(projectId, formData);
        toast("Ihr Projekt wurde erfolgreich aktualisiert.", "success");
        navigate(`/projects/${projectId}`);
      } catch (err) {
        const errorMessage = handleAxiosError(err);
        toast(errorMessage.message, "error");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const formData = new FormData();
        for (const key in values) {
          const value = values[key as keyof ProjectCreateUpdateRequest];
          formData.append(key, String(value));
        }
        if (image) {
          formData.append("projectImage", image);
        }

        await createProject(formData);
        formik.resetForm();
        toast(
          "Ihr Projekt wurde erfolgreich erstellt. Bitte warten Sie auf die Genehmigung durch den Administrator, um Ihr Projekt zu veröffentlichen. In der Zwischenzeit können Sie auf der Projekt-Detailseite Änderungen an Ihrem Projekt vornehmen und Dateien hinzufügen, die Sie zu Ihrem Projekt teilen möchten.",
          "success",
          100000,
          true
        );
        navigate(`/`);
      } catch (err) {
        const errorMessage = handleAxiosError(err);
        toast(errorMessage.message, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: projectFormValidationSchema,
    onSubmit,
  });

  const isInvalid = (field: keyof ProjectCreateUpdateRequest): boolean => {
    return Boolean(formik.touched[field] && formik.errors[field]);
  };

  const isValid = (field: keyof ProjectCreateUpdateRequest): boolean => {
    return Boolean(formik.touched[field] && !formik.errors[field]);
  };

  return { formik, isValid, isInvalid, handleImage };
};

export default useProjectFormFormik;

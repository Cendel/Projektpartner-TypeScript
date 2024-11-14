import { useNavigate, useParams } from "react-router-dom";
import { createProject, updateProject } from "../../../api/project-service";
import { formatDateToYYYYMMDD } from "../../../helpers/functions/date-time";
import { toast } from "../../../helpers/functions/swal";
import { useFormik } from "formik";
import { projectFormValidationSchema } from "../../../helpers/validationSchemas";
import { useState } from "react";

const useProjectFormFormik = (props, setLoading, user) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const initialValues = {
    projectTitle: props.projectTitle,
    projectPlace: props.projectPlace,
    estimatedImplementationDate:
      props.mode === "edit"
        ? formatDateToYYYYMMDD(props.estimatedImplementationDate)
        : "",
    slogan: props.slogan,
    about: props.about,
    goal: props.goal,
    support: props.support,
    shortDesc: props.shortDesc,
    longDesc: props.longDesc,
    createdBy: props.mode === "edit" ? props.createdBy : user.id,
    projectValue: props.projectValue,
    totalShares: props.totalShares,
    shareValue: props.shareValue,
    maxSharesPerPerson: props.maxSharesPerPerson,
  };

  const onSubmit = async (values) => {
    values.shareValue = (values.projectValue / values.totalShares).toFixed(2);
    setLoading(true);
    if (props.mode === "edit") {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        if (image) {
          formData.append("projectImage", image);
        }
        await updateProject(projectId, formData);
        toast("Ihr Projekt wurde erfolgreich aktualisiert.", "success");
        navigate(`/projects/${projectId}`);
      } catch (err) {
        alert(err.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
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
        alert(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: projectFormValidationSchema,
    onSubmit,
  });

  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  const isValid = (field) => {
    return formik.touched[field] && !formik.errors[field];
  };

  return { formik, isValid, isInvalid, handleImage };
};

export default useProjectFormFormik;

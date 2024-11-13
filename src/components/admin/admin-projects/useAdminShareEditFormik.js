import { useFormik } from "formik";
import { createShare } from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import { adminShareEditValidationSchema } from "../../../helpers/validationSchemas";

const useAdminShareEditFormik = ({
  projectId,
  participants,
  setLoading,
  setRefreshComponent,
}) => {
  const initialValues = {
    user: "",
    shares: "",
    project: projectId,
  };

  const onSubmit = async (values) => {
    const participantsIds = participants.map((obj) => obj.user);
    if (participantsIds.includes(values.user)) {
      toast(
        "Dieses Projekt hat bereits Anteile des Benutzers. Wenn Sie die Anteile des Benutzers aktualisieren möchten, können Sie die aktuellen Anteile löschen und eine Aktualisierung vornehmen.",
        "warning",
        100000,
        true
      );
    } else {
      setLoading(true);
      try {
        await createShare(values);
        toast("Die Aktie wurde erfolgreich erstellt.", "success");
        setRefreshComponent((prevValue) => !prevValue);
      } catch (err) {
        toast(
          `Fehler beim Erstellen der Aktie: ${err.response.data.message}`,
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: adminShareEditValidationSchema,
    onSubmit,
  });
  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  const isValid = (field) => {
    return formik.touched[field] && !formik.errors[field];
  };

  return { formik, isValid, isInvalid };
};

export default useAdminShareEditFormik;

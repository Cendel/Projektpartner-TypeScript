import { useFormik } from "formik";
import { createShare } from "../../../api/project-service";
import { toast } from "../../../helpers/functions/swal";
import { adminShareEditValidationSchema } from "../../../helpers/validationSchemas";
import { ShareOwnership } from "../../../entities/ShareOwnership";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";

interface UseAdminShareEditFormikProps {
  projectId: string;
  participants: ShareOwnership[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const useAdminShareEditFormik = ({
  projectId,
  participants,
  setLoading,
  setRefreshComponent,
}: UseAdminShareEditFormikProps) => {
  const initialValues = {
    user: "",
    shares: "",
    project: projectId,
  };

  const onSubmit = async (values: ShareOwnership) => {
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
        const errorMessage = handleAxiosError(err);
        toast(`Fehler beim Erstellen der Aktie: ${errorMessage}`, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik<ShareOwnership>({
    initialValues,
    validationSchema: adminShareEditValidationSchema,
    onSubmit,
  });
  const isInvalid = (field: keyof ShareOwnership) => {
    return formik.touched[field] && formik.errors[field];
  };

  const isValid = (field: keyof ShareOwnership) => {
    return formik.touched[field] && !formik.errors[field];
  };

  return { formik, isValid, isInvalid };
};

export default useAdminShareEditFormik;

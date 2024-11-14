import { useFormik } from "formik";
import { updateUser } from "../../../api/user-service";
import { toast } from "../../../helpers/functions/swal";
import { profileEditValidationSchema } from "../../../helpers/validationSchemas";

const useProfileEditFormik = (setLoading, user) => {
  const initialValues = {
    name: user.name,
    job: user.job,
    location: user.location,
    about: user.about,
    phone: user.phone,
    website: user.website,
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await updateUser(values);
      toast("Ihr Profil wurde erfolgreich aktualisiert.", "success");
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: profileEditValidationSchema,
    onSubmit,
    enableReinitialize: true,
  });
  return formik;
};

export default useProfileEditFormik;

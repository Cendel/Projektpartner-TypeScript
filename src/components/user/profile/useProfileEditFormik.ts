import { useFormik } from "formik";
import { updateUser } from "../../../api/user-service";
import { toast } from "../../../helpers/functions/swal";
import { profileEditValidationSchema } from "../../../helpers/validationSchemas";
import User from "../../../entities/User";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";
import UserUpdateRequest from "../../../entities/UserUpdateRequest";

const useProfileEditFormik = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  user: User
) => {
  const initialValues = {
    name: user.name,
    job: user.job,
    location: user.location,
    about: user.about,
    phone: user.phone,
    website: user.website,
  };

  const onSubmit = async (values: UserUpdateRequest) => {
    setLoading(true);
    try {
      await updateUser(values);
      toast("Ihr Profil wurde erfolgreich aktualisiert.", "success");
    } catch (err) {
      const { message, type } = handleAxiosError(err);
      toast(message, type);
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

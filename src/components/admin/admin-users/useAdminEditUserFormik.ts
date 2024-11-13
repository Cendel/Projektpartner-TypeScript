import { useFormik } from "formik";
import { useState } from "react";
import { updateUserAdmin } from "../../../api/user-service";
import { adminEditUserValidationSchema } from "../../../helpers/validationSchemas";
import { toast } from "../../../helpers/functions/swal";
import User from "../../../entities/User";
import { ApiError } from "../../../types/ApiError";

const useAdminEditUserFormik = (props: User) => {
  const [updating, setUpdating] = useState(false);

  const initialValues = {
    id: props.id,
    name: props.name,
    email: props.email,
    job: props.job,
    location: props.location,
    phone: props.phone,
    website: props.website,
    about: props.about,
  };

  const onSubmit = async (values: User) => {
    setUpdating(true);
    try {
      await updateUserAdmin(props.id, values);
      toast("Das Profil wurde erfolgreich aktualisiert.", "success");
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.response?.data?.message) {
        toast(error.response.data.message, "error");
      } else {
        toast("An unexpected error occurred.", "error");
      }
    } finally {
      setUpdating(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: adminEditUserValidationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return { formik, updating };
};

export default useAdminEditUserFormik;

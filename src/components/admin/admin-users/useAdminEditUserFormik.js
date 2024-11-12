import { useFormik } from "formik";
import { useState } from "react";
import { updateUserAdmin } from "../../../api/user-service";
import { adminEditUserValidationSchema } from "../../../helpers/validationSchemas";
import { toast } from "../../../helpers/functions/swal";

const useAdminEditUserFormik = (props) => {
  const [updating, setUpdating] = useState(false);

  const initialValues = {
    name: props.name,
    email: props.email,
    job: props.job,
    location: props.location,
    phone: props.phone,
    website: props.website,
    about: props.about,
  };

  const onSubmit = async (values) => {
    setUpdating(true);
    try {
      await updateUserAdmin(props.id, values);
      toast("Das Profil wurde erfolgreich aktualisiert.", "success");
    } catch (err) {
      toast(err.response.data.message, "error");
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

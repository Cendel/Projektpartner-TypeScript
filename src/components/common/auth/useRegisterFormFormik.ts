import User from "../../../entities/User";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";
import { registerFormValidationSchema } from "../../../helpers/validationSchemas";
const { useFormik } = require("formik");
const { register } = require("../../../api/user-service");
const { toast } = require("../../../helpers/functions/swal");

const useRegisterFormFormik = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: User) => {
    setLoading(true);
    try {
      await register(values);
      formik.resetForm();
      toast("Sie sind registriert.", "success");
    } catch (err) {
      const { message, type } = handleAxiosError(err);
      toast(message, type);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registerFormValidationSchema,
    onSubmit,
  });
  return formik;
};

export default useRegisterFormFormik;

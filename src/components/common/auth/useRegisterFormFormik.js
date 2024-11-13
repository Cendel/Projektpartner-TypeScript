import { registerFormValidationSchema } from "../../../helpers/validationSchemas";
const { useFormik } = require("formik");
const { register } = require("../../../api/user-service");
const { toast } = require("../../../helpers/functions/swal");

const useRegisterFormFormik = (setKey, setLoading) => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await register(values);
      formik.resetForm();
      toast("Sie sind registriert.", "success");
      setKey("login");
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message;

        if (errorMessage === "Name taken") {
          toast("Der Benutzername ist bereits vergeben.", "warning");
        } else if (errorMessage === "Email taken") {
          toast("Die E-Mail-Adresse ist bereits vergeben.", "warning");
        } else {
          toast("Ein Fehler ist aufgetreten.", "error");
        }
      }
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

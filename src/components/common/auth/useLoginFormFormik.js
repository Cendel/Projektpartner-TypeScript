import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../../api/user-service";
import { encryptedLocalStorage } from "../../../helpers/functions/encrypt-storage";
import { useAppDispatch } from "../../../store/hooks";
import { loginFailed, loginSuccess } from "../../../store/slices/auth-slice";
import { toast } from "../../../helpers/functions/swal";
import { useFormik } from "formik";
import { loginFormValidationSchema } from "../../../helpers/validationSchemas";

const useLoginFormFormik = (setLoading) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const respAuth = await login(values);
      encryptedLocalStorage.setItem("token", respAuth.data.token);

      const respUser = await getUser();
      dispatch(loginSuccess(respUser.data));
      navigate("/");

      formik.resetForm();
      toast("Sie haben sich erfolgreich angemeldet.", "success");
    } catch (err) {
      if (err.response.status === 401) {
        toast("EMail oder Passwort ist falsch.", "error");
      } else {
        toast(
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
          "error"
        );
      }
      dispatch(loginFailed());
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginFormValidationSchema,
    onSubmit,
  });

  return formik;
};

export default useLoginFormFormik;

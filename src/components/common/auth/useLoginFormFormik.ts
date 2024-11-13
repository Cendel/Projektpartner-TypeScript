import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../../api/user-service";
import { encryptedLocalStorage } from "../../../helpers/functions/encrypt-storage";
import { useAppDispatch } from "../../../store/hooks";
import { loginFailed, loginSuccess } from "../../../store/slices/auth-slice";
import { toast } from "../../../helpers/functions/swal";
import { useFormik } from "formik";
import { loginFormValidationSchema } from "../../../helpers/validationSchemas";
import User from "../../../entities/User";
import { handleAxiosError } from "../../../helpers/functions/handleAxiosError";

const useLoginFormFormik = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: User) => {
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
      const error = handleAxiosError(err);
      const errorMessage =
        error === "unauthorized"
          ? "EMail oder Passwort ist falsch."
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
      toast(errorMessage, "error");
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

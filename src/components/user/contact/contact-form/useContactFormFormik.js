import { useFormik } from "formik";
import { toast } from "../../../../helpers/functions/swal";
import { sendMessage } from "../../../../api/contact-service";
import { contactFormValidationSchema } from "../../../../helpers/validationSchemas";

const useContactFormFormik = (setLoading, senderId) => {
  const initialValues = {
    sender: senderId,
    title: "",
    text: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
      await sendMessage(values);
      toast("Ihre Nachricht wurde erfolgreich gesendet.", "success");
      resetForm();
    } catch (err) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: contactFormValidationSchema,
    onSubmit,
  });
  return formik;
};

export default useContactFormFormik;
